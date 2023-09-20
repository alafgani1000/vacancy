<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureAdminUser
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $auth = $request->user();
        if ($auth != null) {
            if ($auth->user_category_id == 3) {
                return $next($request);
            } else {
                return redirec('/');
            }
        } else {
            return redirect('/');
        }
    }
}
