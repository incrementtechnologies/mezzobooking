<?php

namespace App\Http\Middleware;
use Increment\Account\Models\Account;
use Increment\Security\Models\Device;

use Closure;

class DeviceValidator
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $data = $request->all();
        if(!isset($data['device'])){
            return response()->json(array(
                'token' => null,
                'error' => 'Invalid credentials'
            ));
        }
        $account = Account::where('email', '=', $data['email'])->first();
        if($account !== null){
            $device = Device::where('unique_code', '=', $data['device']['unique_code'])->where('account_id', '=', $account['id'])->first();
            if($device !== null){
                return $next($request);
            }else{
                return response()->json(array(
                    'token' => null,
                    'error' => 'Invalid credentials'
                ));
            }
        }else{
            return response()->json(array(
                'token' => null,
                'error' => 'Invalid credentials'
            ));
        }
    }
}
