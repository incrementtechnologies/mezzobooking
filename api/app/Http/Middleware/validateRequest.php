<?php

namespace App\Http\Middleware;

use Closure;

class validateRequest
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
        if(!env('ALLOW_REQUEST')){
            return response()->json(array(
              'token' => null,
              'error' => 'System admin Security updates!'
            ));
        }else if(env('ALLOW_REQUEST')){
            return $next($request);
        }
        
    }
}
