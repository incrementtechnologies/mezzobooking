<?php

namespace App\Http\Middleware;
use Increment\Account\Models\Account;
use App\NotificationSetting;
use Increment\Security\Models\Device;

use Closure;

class otpValidator
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
        if(!isset($data['device']) || !isset($data['code'])){
            return response()->json(array(
                'token' => null,
                'error' => 'Invalid parameters'
            ));
        }
        $account = Account::where('email', '=', $data['email'])->first();
        if($account !== null){
            $hasOtp = NotificationSetting::where('code', '=', $data['code'])->where('account_id', '=', $account['id'])->first();
            if($hasOtp !== null){
                $sameDevice = Device::where('unique_code', '=', $data['device']['unique_code'])->where('account_id', '=', $hasOtp['account_id'])->first();
                if($sameDevice !== null){
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
                    'error' => 'Invalid credentialss'
                ));
            }
        }else{
            return response()->json(array(
                'token' => null,
                'error' => 'Invalid credentialsss'
            ));
        }
    }
}
