<?php
/**
 * Created by PhpStorm.
 * User: tonyzou
 * Date: 2018/9/24
 * Time: 下午9:24
 */

namespace App\Services\Gateway;

use Exception;
use Omnipay\Omnipay;
use App\Services\View;
use App\Services\Auth;
use App\Models\Order;
use App\Models\Setting;

class AopF2F
{
    private function createGateway()
    {
        $configs = Setting::getClass('f2f');
        $gateway = Omnipay::create('Alipay_AopF2F');
        $gateway->setSignType('RSA2'); //RSA/RSA2
        $gateway->setAppId($configs['f2f_pay_app_id']);
        $gateway->setPrivateKey($configs['f2f_pay_private_key']); // 可以是路径，也可以是密钥内容
        $gateway->setAlipayPublicKey($configs['f2f_pay_public_key']); // 可以是路径，也可以是密钥内容
        if ($configs['f2f_pay_notify_url'] == '') {
            $notifyUrl = self::getCallbackUrl();
        } else {
            $notifyUrl = $configs['f2f_pay_notify_url'];
        }
        $gateway->setNotifyUrl($notifyUrl);
        return $gateway;
    }

    public function ZeroPay($type, $price, $buyshop, $order_id=0)
    {
        $amount = $price;
        $user = Auth::getUser();

        if ($order_id == 0) {
            $pl = new Order();
            $pl->userid = $user->id;
            $pl->total = $price;
            if ($buyshop['id'] != 0) $pl->shop = json_encode($buyshop);
            $pl->datetime = time();
            $pl->tradeno = self::generateGuid();
            $pl->save();
        } else {
            $pl = Order::find($order_id);
            if ($pl->status === 1){
                return ['ret' => 0, 'msg' => "该订单已交易完成"];
            }
        }

        $configs = Setting::getClass('f2f');
        $gateway = Omnipay::create('Alipay_AopF2F');
        $gateway->setSignType('RSA2'); //RSA/RSA2
        $gateway->setAppId($configs['f2f_pay_app_id']);
        $gateway->setPrivateKey($configs['f2f_pay_private_key']); // 可以是路径，也可以是密钥内容
        $gateway->setAlipayPublicKey($configs['f2f_pay_public_key']); // 可以是路径，也可以是密钥内容
        if ($configs['f2f_pay_notify_url'] == '') {
            $notifyUrl = self::getCallbackUrl();
        } else {
            $notifyUrl = $configs['f2f_pay_notify_url'];
        }
        $gateway->setNotifyUrl($notifyUrl);

        $request = $gateway->purchase();
        $request->setBizContent([
            'subject' => $pl->tradeno,
            'out_trade_no' => $pl->tradeno,
            'total_amount' => $pl->total
        ]);

        /** @var \Omnipay\Alipay\Responses\AopTradePreCreateResponse $response */
        $aliResponse = $request->send();

        // 获取收款二维码内容
        $qrCodeContent = $aliResponse->getQrCode();

        $return['ret'] = 1;
        $return['url'] = $qrCodeContent;
        $return['amount'] = $pl->total;
        $return['tradeno'] = $pl->tradeno;

        return $return;
    }

    public function notify(ServerRequest $request, Response $response, array $args)
    {
        $gateway = $this->createGateway();
        $aliRequest = $gateway->completePurchase();
        $aliRequest->setParams($_POST);

        try {
            /** @var \Omnipay\Alipay\Responses\AopCompletePurchaseResponse $response */
            $aliResponse = $aliRequest->send();
            $pid = $aliResponse->data('out_trade_no');
            if ($aliResponse->isPaid()) {
                $this->postPayment($pid, '支付宝当面付 ' . $pid);
                die('success'); //The response should be 'success' only
            }
        } catch (Exception $e) {
            die('fail');
        }
    }


    public function getStatus(ServerRequest $request, Response $response, array $args)
    {
        $p = Order::where('tradeno', $_POST['pid'])->first();
        $return['ret'] = 1;
        $return['result'] = $p->status;
        return json_encode($return);
    }
}
