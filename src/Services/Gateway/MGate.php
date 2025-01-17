<?php

namespace App\Services\Gateway;

use App\Services\View;
use App\Services\Auth;
use App\Services\Config;
use App\Models\{
    order,
    Setting
};

class MGate
{

    private $appSecret;
    private $gatewayUri;

    /**
     * 签名初始化
     * @param merKey    签名密钥
     */

    public function __construct()
    {
        $apiUrl = Config::get('mgate_api_url');
        $this->appSecret = Config::get('mgate_app_secret');
        $this->gatewayUri = "{$apiUrl}/v1/gateway/fetch";
    }


    /**
     * @name    准备签名/验签字符串
     */
    public function prepareSign($data)
    {
        ksort($data);
        return http_build_query($data);
    }

    /**
     * @name    生成签名
     * @param sourceData
     * @return    签名数据
     */
    public function sign($data)
    {
        return strtolower(md5($data . $this->appSecret));
    }

    /*
     * @name    验证签名
     * @param   signData 签名数据
     * @param   sourceData 原数据
     * @return
     */
    public function verify($data, $signature)
    {
        unset($data['sign']);
        $mySign = $this->sign($this->prepareSign($data));
        return $mySign === $signature;
    }

    public function post($data)
    {
        $curl = curl_init();
        curl_setopt($curl, CURLOPT_URL, $this->gatewayUri);
        curl_setopt($curl, CURLOPT_HEADER, 0);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, false);
        curl_setopt($curl, CURLOPT_POST, 1);
        curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
        curl_setopt($curl, CURLOPT_HTTPHEADER, ['User-Agent: mGate']);
        $data = curl_exec($curl);
        curl_close($curl);
        return $data;
    }

    public function ZeroPay($type, $price, $buyshop, $order_id = 0)
    {
        if ($order_id == 0 && $price <= 0) {
            return ['errcode' => -1, 'errmsg' => '非法的金额'];
        }
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
                return ['errcode' => -1, 'errmsg' => "该订单已交易完成"];
            }
        }
        $data['app_id'] = Config::get('mgate_app_id');
        $data['out_trade_no'] = $pl->tradeno;
        $data['total_amount'] = (int)($price * 100);
        $data['notify_url'] = Setting::obtain('website_url') . '/payment/notify/mgate';
        $data['return_url'] = Setting::obtain('website_url') . '/user/payment/return';
        $params = $this->prepareSign($data);
        $data['sign'] = $this->sign($params);
        $result = json_decode($this->post($data), true);
        if (!isset($result['data'])) {
            return ['errcode' => -1, 'msg' => '支付网关处理失败'];
        }
        $result['pid'] = $pl->tradeno;

        return ['url' => $result['data']['pay_url'], 'errcode' => 0, 'pid' => $pl->tradeno, 'type' => 'url'];
    }

    public function notify(ServerRequest $request, Response $response, array $args)
    {
//        file_put_contents(BASE_PATH . '/storage/mgate.log', json_encode($request->getParams()) . "\r\n", FILE_APPEND);
        if (!$this->verify($request->getParams(), $request->getParam('sign'))) {
            die('FAIL');
        }
        $this->postPayment($request->getParam('out_trade_no'), 'MGate');
        die('SUCCESS');
    }

    public function getStatus(ServerRequest $request, Response $response, array $args)
    {
        $return = [];
        $p = Order::where('tradeno', $_POST['pid'])->first();
        $return['ret'] = 1;
        $return['result'] = $p->status;
        return json_encode($return);
    }
}
