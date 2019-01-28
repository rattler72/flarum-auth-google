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
use Zend\Diactoros\Response\HtmlResponse;

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

    public function __construct(Client $api, Rememberer $rememberer, UserRepository $users)
    {
        $this->api = $api;
        $this->users = $users;
        $this->rememberer = $rememberer;
    }


    public function make(string $provider, string $identifier, callable $configureRegistration): ResponseInterface
    {
        if ($user = LoginProvider::logIn($provider, $identifier)) {
            return $this->makeLoggedInResponse($user);
        }

        $configureRegistration($registration = new Registration);

        $provided = $registration->getProvided();

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
            'isEmailConfirmed' => 1
        ];

        $controller = CreateUserController::class;
        // $actor = $request->getAttribute('actor');

        // use admin actor
        $actor = $this->users->findOrFail(1);
        $body = ['data' => ['attributes' => $userdata]];

        app('log')->info('Actor = '.var_export($actor, 1));
        app('log')->info('Body = '.var_export($body, 1));

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
