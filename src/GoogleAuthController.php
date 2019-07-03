<?php

/*
 * This file is part of Flarum.
 *
 * (c) Toby Zerner <toby.zerner@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Coldsnake\Auth\Google;

use Exception;
use Flarum\Forum\Auth\Registration;
use Coldsnake\Auth\Google\GoogleResponseFactory as ResponseFactory;
use Flarum\Settings\SettingsRepositoryInterface;
use League\OAuth2\Client\Provider\Google;
use League\OAuth2\Client\Provider\GoogleUser;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Server\RequestHandlerInterface;
use Zend\Diactoros\Response\RedirectResponse;
use Zend\Diactoros\Response\HtmlResponse;
use Google_Client;
use Google_Service_Directory;
use GuzzleHttp\Client as HttpClient;


class GoogleAuthController implements RequestHandlerInterface
{
    /**
     * @var ResponseFactory
     */
    protected $response;

    /**
     * @var SettingsRepositoryInterface
     */
    protected $settings;

    /**
     * @param ResponseFactory $response
     */
    public function __construct(ResponseFactory $response, SettingsRepositoryInterface $settings)
    {
        $this->response = $response;
        $this->settings = $settings;
    }

    /**
     * @param Request $request
     * @return ResponseInterface
     * @throws \League\OAuth2\Client\Provider\Exception\GoogleProviderException
     * @throws Exception
     */
    public function handle(Request $request): ResponseInterface
    {
        $conf = app('flarum.config');
        $redirectUri = $conf['url'] . "/auth/google";

        $provider = new Google([
            'clientId' => trim($this->settings->get('saleksin-auth-google.client_id')),
            'clientSecret' => trim($this->settings->get('saleksin-auth-google.client_secret')),
            'redirectUri' => $redirectUri,
            'approvalPrompt'  => 'force',
            // 'hostedDomain'    => 'nursenextdoor.com',
            'accessType'      => 'offline',
        ]);

        $session = $request->getAttribute('session');
        $queryParams = $request->getQueryParams();
        app('log')->info('Query Params = '.var_export($queryParams, 1));

        $code = array_get($queryParams, 'code');

        if (! $code) {
            $authUrl = $provider->getAuthorizationUrl();
            app('log')->info('OAuth State = '.var_export($provider->getState(), 1));
            $session->put('oauth2state', $provider->getState());

            return new RedirectResponse($authUrl.'&display=popup');
        }

        $state = array_get($queryParams, 'state');

        if (! $state || $state !== $session->get('oauth2state')) {
            $session->remove('oauth2state');

            throw new Exception('Invalid state');
        }

        $token = $provider->getAccessToken('authorization_code', compact('code'));

        /** @var GoogleUser $user */
        $user = $provider->getResourceOwner($token);
        app('log')->info('User = '.$user->getEmail());

        if ((strpos($user->getEmail(), 'nursenextdoor.com') === false) && (strpos($user->getEmail(), 'sixfactor.com') === false)) {
            // throw new Exception('Not authorized.');
            return new HtmlResponse('Not authorized',403);
        }

        // get user info from care central... find out role
        $httpClient = new HttpClient();
        $res = $httpClient->get('https://carecentral.nursenextdoor.com/api/simpleuser/'.$user->getEmail().'/HGUWYDG2374g09mas');
        $body = $res->getBody()->getContents();
        $cc_user = json_decode($body);

        app('log')->info('User API response = '.var_export($cc_user, 1));
        app('log')->info('User Role = '.$cc_user->data->role_id);

        $accepted_role_ids = [1,5,6,7,10];
        if (!in_array($cc_user->data->role_id, $accepted_role_ids)) {
            app('log')->info('role is invalid!');
            return new HtmlResponse('Not authorized',403);
        }

        // putenv('GOOGLE_APPLICATION_CREDENTIALS='.env('GOOGLE_CREDS', '/home/nndport/google.json'));
        //
        // $this->client = new Google_Client();
        // $this->client->useApplicationDefaultCredentials();
        // $this->client->setApplicationName("Nurse Next Door CD Community");
        // $this->client->setScopes(['https://www.googleapis.com/auth/admin.directory.user',
        //                           'https://www.googleapis.com/auth/admin.directory.group',
        //                           'https://www.googleapis.com/auth/admin.directory.orgunit']);
        // $this->client->setSubject('google.admin@nursenextdoor.com');
        // $this->service = new Google_Service_Directory($this->client);


        return $this->response->make(
            'google',
            $user->getId(),
            function (Registration $registration) use ($user) {
                $registration
                    ->provideTrustedEmail($user->getEmail())
                    ->provideAvatar($user->getAvatar())
                    ->suggestUsername($user->getName())
                    ->setPayload($user->toArray());
            }
        );
    }
}
