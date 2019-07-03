<?php

namespace Coldsnake\Auth\Google;

use Flarum\User\LoginProvider;
use Psr\Http\Message\ResponseInterface;
use Flarum\User\UserRepository;
use Flarum\Api\Client;
use Flarum\Http\Rememberer;
use Flarum\Api\Controller\CreateUserController;
use Flarum\User\RegistrationToken;
use Flarum\User\User;
use Flarum\Forum\Auth\Registration;
use Zend\Diactoros\Response\HtmlResponse;
use GuzzleHttp\Client as HttpClient;
use Flarum\Foundation\Application;
use League\Flysystem\Adapter\Local;
use League\Flysystem\Filesystem;

class GoogleResponseFactory
{
    /**
     * @var \Flarum\User\UserRepository
     */
    protected $users;

    /**
     * @var Client
     */
    protected $api;

    /**
     * @var Rememberer
     */
    protected $rememberer;

    /**
     * @var Path
     */
    protected $path;

    /**
     * @var PublicPath
     */
    protected $public_path;

    public function __construct(Client $api, Rememberer $rememberer, UserRepository $users, Application $app)
    {
        $this->api = $api;
        $this->users = $users;
        $this->rememberer = $rememberer;
        $this->path = $app->storagePath();
        $this->public_path = $app->publicPath();
    }


    public function make(string $provider, string $identifier, callable $configureRegistration): ResponseInterface
    {
        $provided = null;
        if ($user = LoginProvider::logIn($provider, $identifier)) {
            if (empty($user->avatar_url)) {
                $configureRegistration($registration = new Registration);
                $provided = $registration->getProvided();

                $target = 'photo.jpg';
                $length = strlen($target);
                if (!empty($provided['avatar_url']) && (substr($provided['avatar_url'], -$length) === $target)){
                    $httpClient = new HttpClient();
                    $res = $httpClient->request('GET', $provided['avatar_url']);
                    if ($res->getStatusCode() != 404 && $res->getStatusCode() != 500){

                        $contents = file_get_contents($provided['avatar_url']);
                        $user_dir = $this->path.DIRECTORY_SEPARATOR.'user'.DIRECTORY_SEPARATOR.$user->id;
                        $filename = 'profile_'.$user->id.'.jpg';
                        $fs = new Filesystem(new Local($user_dir));
                        $fs->put($filename,$contents);

                        $profile_path = realpath($user_dir.DIRECTORY_SEPARATOR.$filename);
                        $public_dir = realpath($this->public_path.DIRECTORY_SEPARATOR.'assets'.DIRECTORY_SEPARATOR.'avatars'.DIRECTORY_SEPARATOR.'user'.DIRECTORY_SEPARATOR.$user->id);
                        $public_url = $public_dir.DIRECTORY_SEPARATOR.$filename;

                        app('log')->info('Profile pic path = '.$profile_path);
                        app('log')->info('Public Profile pic url = '.$public_url);

                        // $user->avatar_url = $profile_path;
                        $user->avatar_url = $provided['avatar_url'];
                        $user->save();
                    }
                }
            }
            return $this->makeLoggedInResponse($user);
        }

        if (!$provided){
            $configureRegistration($registration = new Registration);
            $provided = $registration->getProvided();
        }

        if (! empty($provided['email']) && $user = User::where(array_only($provided, 'email'))->first()) {
            $user->loginProviders()->create(compact('provider', 'identifier'));

            return $this->makeLoggedInResponse($user);
        }

        $username = substr($provided['email'], 0, strpos($provided['email'], '@'));
        $username = preg_replace("/[^A-Za-z0-9 ]/", '', $username);
        $usernameExists = $this->users->findByIdentification($username);
        if ($usernameExists != null) {
            $username = $username.rand(10, 99);
        }
        $password = $this->generateStrongPassword();
        $userdata = [
            'username' => $username,
            'email' => $provided['email'],
            'password' => $password,
            'isEmailConfirmed' => 1,
            'avatarUrl' => $provided['avatar_url'],
        ];

        $controller = CreateUserController::class;

        // use admin actor
        $actor = $this->users->findOrFail(1);
        $body = ['data' => ['attributes' => $userdata]];
        $response = $this->api->send($controller, $actor, [], $body);

        $body = json_decode($response->getBody());

        if (isset($body->data)) {
            $userId = $body->data->id;
            // log in as new user...
            $user = User::find($userId);
            $user->loginProviders()->create(compact('provider', 'identifier'));
            return $this->makeLoggedInResponse($user);
        } else {
            throw new \Exception('Could not login user.');
        }
    }

    private function makeResponse(array $payload): HtmlResponse
    {
        $content = sprintf(
            '<script>window.close(); window.opener.app.authenticationComplete(%s);</script>',
            json_encode($payload)
        );

        return new HtmlResponse($content);
    }

    private function makeLoggedInResponse(User $user)
    {
        $response = $this->makeResponse(['loggedIn' => true]);

        return $this->rememberer->rememberUser($response, $user->id);
    }

    // Generates a strong password of N length containing at least one lower case letter,
    // one uppercase letter, one digit, and one special character. The remaining characters
    // in the password are chosen at random from those four sets.
    //
    // The available characters in each set are user friendly - there are no ambiguous
    // characters such as i, l, 1, o, 0, etc. This, coupled with the $add_dashes option,
    // makes it much easier for users to manually type or speak their passwords.
    //
    // Note: the $add_dashes option will increase the length of the password by
    // floor(sqrt(N)) characters.

    private function generateStrongPassword($length = 9, $add_dashes = false, $available_sets = 'luds')
    {
        $sets = array();
        if (strpos($available_sets, 'l') !== false) {
            $sets[] = 'abcdefghjkmnpqrstuvwxyz';
        }
        if (strpos($available_sets, 'u') !== false) {
            $sets[] = 'ABCDEFGHJKMNPQRSTUVWXYZ';
        }
        if (strpos($available_sets, 'd') !== false) {
            $sets[] = '23456789';
        }
        if (strpos($available_sets, 's') !== false) {
            $sets[] = '!@#$%&*?';
        }

        $all = '';
        $password = '';
        foreach ($sets as $set) {
            $password .= $set[array_rand(str_split($set))];
            $all .= $set;
        }

        $all = str_split($all);
        for ($i = 0; $i < $length - count($sets); $i++) {
            $password .= $all[array_rand($all)];
        }

        $password = str_shuffle($password);

        if (!$add_dashes) {
            return $password;
        }

        $dash_len = floor(sqrt($length));
        $dash_str = '';
        while (strlen($password) > $dash_len) {
            $dash_str .= substr($password, 0, $dash_len) . '-';
            $password = substr($password, $dash_len);
        }
        $dash_str .= $password;
        return $dash_str;
    }
}
