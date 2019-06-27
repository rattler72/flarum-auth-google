<?php

/*
 * This file is part of Flarum.
 *
 * (c) Toby Zerner <toby.zerner@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

use Coldsnake\Auth\Google\GoogleAuthController;
use Coldsnake\Auth\Google\AdminLoginController;
use Flarum\Extend;

return [
    (new Extend\Frontend('forum'))
        ->js(__DIR__.'/js/dist/forum.js')
        ->css(__DIR__.'/less/forum.less'),

    (new Extend\Frontend('admin'))
        ->js(__DIR__.'/js/dist/admin.js'),

    (new Extend\Routes('forum'))
        ->get('/auth/google', 'auth.google', GoogleAuthController::class),

    (new Extend\Frontend('forum'))
        ->route('/auth/login/admin', 'auth.login.admin'),

    (new Extend\Locales(__DIR__ . '/locale')),
];
