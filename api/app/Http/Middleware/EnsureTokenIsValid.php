<?php

namespace App\Http\Middleware;
use Illuminate\Http\Request;
use Increment\Account\Models\Account;
use Carbon\Carbon;

use Closure;

class EnsureTokenIsValid
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        // dd($request->server);
        // dd($_SERVER['SERVER_NAME']);
        if(!env('ALLOW_REQUEST')){
            return response()->json(
                array(
                    "error" => "System admin error!",
                    "timestamp" => Carbon::now(), 
                    "data" => null
                )
            );
        }else if(env('ALLOW_REQUEST') === true){
            $data = $request->all();
            if(isset($data['token'])){
                $account = Account::where('token', 'like', '%'.$data['token'].'%')->first();
                if(isset($data['token']) && $account !== null){
                    $isBlocked = Account::where('id', '=', $account['id'])->first();
                    if($isBlocked !== null){
                        if($isBlocked['status'] == 'BLOCKED'){
                            return response()->json(
                                array(
                                    "error" => "Invalid Accessed!",
                                    "timestamp" => Carbon::now(), 
                                    "data" => null
                                )
                            );
                        }else{
                            return $next($request);
                        }
                    }else{
                        return $next($request);
                    }
                }else{
                    return response()->json(
                        array(
                            "error" => "Invalid Accessed!",
                            "timestamp" => Carbon::now(), 
                            "data" => null
                        )
                    );
                }
            }else{
                return response()->json(
                    array(
                        "error" => "Invalid Accessed!",
                        "timestamp" => Carbon::now(), 
                        "data" => null
                    )
                );
            }
        }
    }
}
