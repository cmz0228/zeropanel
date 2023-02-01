<?php

namespace App\Controllers;

use App\Models\{
    User,
    PasswordReset,
    Setting
};
use App\Utils\Hash;
use App\Services\Password;
use Slim\Http\{
    Request,
    Response
};
use Pkly\I18Next\I18n;
/***
 * Class Password
 * @package App\Controllers
 * 密码重置
 */
class PasswordController extends BaseController
{
    /**
     * @param Request   $request
     * @param Response  $response
     * @param array     $args
     */
    public function reset($request, $response, $args)
    {
        $this->view()->display('password/reset.tpl');
        return $response;
    }

    /**
     * @param Request   $request
     * @param Response  $response
     * @param array     $args
     */
    public function handleReset($request, $response, $args)
    {
        $email = strtolower($request->getParam('email'));
        $user  = User::where('email', $email)->first();
        if ($user == null) {
            return $response->withJson([
                'ret' => 0,
                'msg' => I18n::get()->t('email does not exist')
            ]);
        }
        if (Password::sendResetEmail($email)) {
            $msg = I18n::get()->t('email sending success');
        } else {
            $msg = I18n::get()->t('email sending failed');;
        }
        return $response->withJson([
            'ret' => 1,
            'msg' => $msg
        ]);
    }

    /**
     * @param Request   $request
     * @param Response  $response
     * @param array     $args
     */
    public function token($request, $response, $args)
    {
        $token = PasswordReset::where('token', $args['token'])->where('expire_time', '>', time())->orderBy('id', 'desc')->first();
        if ($token == null) return $response->withStatus(302)->withHeader('Location', '/password/reset');
        
        $this->view()->display('password/token.tpl');
        return $response;
    }

    /**
     * @param Request   $request
     * @param Response  $response
     * @param array     $args
     */
    public function handleToken($request, $response, $args)
    {
        $tokenStr = $args['token'];
        $password = $request->getParam('password');
        $repassword = $request->getParam('repassword');

        // check token
        $token = PasswordReset::where('token', $tokenStr)->where('expire_time', '>', time())->orderBy('id', 'desc')->first();
        if ($token == null) {
            return $response->withJson([
                'ret' => 0,
                'msg' => I18n::get()->t('link is dead')
            ]);
        }
        /** @var PasswordReset $token */
        $user = $token->getUser();
        if ($user == null) {
            return $response->withJson([
                'ret' => 0,
                'msg' => I18n::get()->t('link is dead')
            ]);
        }

        // reset password
        $hashPassword    = Hash::passwordHash($password);
        $user->password      = $hashPassword;

        if (!$user->save()) {
            $rs['ret'] = 0;
            $rs['msg'] = I18n::get()->t('failed');
        } else {
            $rs['ret'] = 1;
            $rs['msg'] = I18n::get()->t('success');
            
            if (Setting::obtain('enable_subscribe_change_token_when_change_passwd') == true) {
                $user->clean_link();
            }

            // 禁止链接多次使用
            $token->expire_time = time();
            $token->save();
        }

        return $response->withJson($rs);
    }
}