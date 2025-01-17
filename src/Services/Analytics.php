<?php

namespace App\Services;

use App\Models\User;
use App\Models\{Node, Order};
use App\Utils\Tools;

class Analytics
{
    public function getTotalUser()
    {
        return User::count();
    }

    public function getTrafficUsage()
    {
        $total = User::sum('u') + User::sum('d');
        return Tools::flowAutoShow($total);
    }

    public function getTodayTrafficUsage()
    {
        $total = User::sum('u') + User::sum('d') - User::sum('last_day_t');
        return Tools::flowAutoShow($total);
    }

    public function getRawTodayTrafficUsage()
    {
        return User::sum('u') + User::sum('d') - User::sum('last_day_t');
    }

    public function getLastTrafficUsage()
    {
        $total = User::sum('last_day_t');
        return Tools::flowAutoShow($total);
    }


    public function getRawLastTrafficUsage()
    {
        return User::sum('last_day_t');
    }

    public function getUnusedTrafficUsage()
    {
        $total = User::sum('transfer_enable') - User::sum('u') - User::sum('d');
        return Tools::flowAutoShow($total);
    }

    public function getRawUnusedTrafficUsage()
    {
        return User::sum('transfer_enable') - User::sum('u') - User::sum('d');
    }


    public function getTotalTraffic()
    {
        $total = User::sum('transfer_enable');
        return Tools::flowAutoShow($total);
    }

    public function getRawTotalTraffic()
    {
        return User::sum('transfer_enable');
    }

    public function getOnlineUser($time)
    {
        $time = time() - $time;
        return User::where('t', '>', $time)->count();
    }

    public function getUnusedUser()
    {
        return User::where('t', '=', 0)->count();
    }

    public function getTotalNode()
    {
        return Node::count();
    }

    public function getTotalNodes()
    {
        return Node::where('node_heartbeat', '>', 0)->where(
            static function ($query) {
                $query->Where('sort', '=', 0)
                    ->orWhere('sort', '=', 10)
                    ->orWhere('sort', '=', 11)
                    ->orWhere('sort', '=', 12)
                    ->orWhere('sort', '=', 13)
                    ->orWhere('sort', '=', 14)
                    ->orWhere('sort', '=', 15);
            }
        )->count();
    }

    public function getAliveNodes()
    {
        return Node::where(
            static function ($query) {
                $query->Where('sort', '=', 0)
                    ->orWhere('sort', '=', 10)
                    ->orWhere('sort', '=', 11)
                    ->orWhere('sort', '=', 12)
                    ->orWhere('sort', '=', 13)
                    ->orWhere('sort', '=', 14)
                    ->orWhere('sort', '=', 15);
            }
        )->where('node_heartbeat', '>', time() - 90)->count();
    }
    // admin
    public function getIncome($start_time, $end_time)
    {
        $sum = Order::where('order_payment','!=', 'creditpay')->where('order_status', 2)->where('paid_time', '>=', $start_time)->where('paid_time', '<=', $end_time)->sum('order_total');
        if (is_null($sum)) {
          $sum = 0;
        }
        return $sum;
    }
    // admin
    public function getNewUsers($start_time, $end_time)
    {
        $users = User::where('signup_date', '>=', $start_time)
        ->where('signup_date', '<', $end_time)
        ->count();
        if (is_null($users)) {
            $users = 0;
        }
        return $users;
    }

    public function increase_percentage($num_1, $num_2)
    {
        if ($num_1 === 0 || $num_1 <= $num_2) {
            $percent = 0;
        } else if ($num_2 === 0) {
            $percent = $num_1 * 100;
        } else {
            $percent = ($num_1 - $num_2) / $num_2 * 100;
        }
        return $percent;
    }
}
