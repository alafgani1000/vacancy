<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureCategoryUser
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $auth = $request->user();
        if ($auth == null) {
            return redirect('/');
        } else {
            if ($auth->userCategory->name == "Job Seeker") {
                return redirect('/');
            }
        }
        return $next($request);
    }
}
