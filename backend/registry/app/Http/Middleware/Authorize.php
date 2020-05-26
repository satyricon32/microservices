<?php

namespace App\Http\Middleware;

use Closure;
@include_once dirname(__FILE__).'/../../../Auth/TokenizerClient.php';
@include_once dirname(__FILE__).'/../../../Auth/Response.php';
@include_once dirname(__FILE__).'/../../../Auth/Request.php';
@include_once dirname(__FILE__).'/../../../GPBMetadata/Auth.php';
class Authorize
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    protected function checkToken($token)
    {
        $client = new \Auth\TokenizerClient('localhost:50051', [
            'credentials' => \Grpc\ChannelCredentials::createInsecure(),
        ]);
        $request = new  \Auth\Request();
        $request->settoken($token);
        list($reply, $status) = $client->checkToken($request)->wait();
        $message = $reply->getUserId();

        return $message;
    }

    public function handle($request, Closure $next)
    {
        $token = $request->header('Authorization');
        $token = explode(" ", $token)[1];
        // die(print_r($token));
        if (($message = $this->checktoken($token)) != "-1") {
            return $next($request);
        }
        return response($message, 401);
    }
}
