<?php
require dirname(__FILE__).'/vendor/autoload.php';

// @include_once dirname(__FILE__).'/Helloworld/GreeterClient.php';
// @include_once dirname(__FILE__).'/Helloworld/HelloReply.php';
// @include_once dirname(__FILE__).'/Helloworld/HelloRequest.php';
@include_once dirname(__FILE__).'/Auth/TokenizerClient.php';
@include_once dirname(__FILE__).'/Auth/Response.php';
@include_once dirname(__FILE__).'/Auth/Request.php';
@include_once dirname(__FILE__).'/GPBMetadata/Auth.php';

function greet($name)
{
    $client = new Helloworld\GreeterClient('localhost:50051', [
        'credentials' => Grpc\ChannelCredentials::createInsecure(),
    ]);
    $request = new Helloworld\HelloRequest();
    $request->setName($name);
    list($reply, $status) = $client->SayHello($request)->wait();
    $message = $reply->getMessage();

    return $message;
}
function checkToken($token)
    {
        $client = new \Auth\TokenizerClient('localhost:50051', [
            'credentials' => \Grpc\ChannelCredentials::createInsecure(),
        ]);
        if(!$client->waitForReady(5000))
        {
          die("not ready\n");
        }
        // die($client->waitForReady(500));

        $request = new  \Auth\Request();
        $request->settoken($token);
        list($reply, $status) = $client->checkToken($request)->wait();
        $message = $reply->getUserId();

        return $message;
    }
$name = !empty($argv[1]) ? $argv[1] : 'f36eff3d1ee5240d6580c5de0b550eb10cf985b8293603db6ecbf0256d359c0c';
echo checkToken($name)."\n";
