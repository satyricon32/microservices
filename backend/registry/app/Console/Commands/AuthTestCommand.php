<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Symfony\Component\Console\Input\InputOption;

class AuthTestCommand extends Command
{

  protected function checkToken($token)
  {
    $client = new \App\Auth\TokenizerClient('localhost:50051', [
      'credentials' => \Grpc\ChannelCredentials::createInsecure(),
    ]);
    $request = new \App\Auth\Request();
    die(print_r($client));
    $request->settoken($token);
    list($reply, $status) = $client->checkToken($request)->wait();
    $message = $reply->getUserId();

    return $message;
  }
  /**
   * The console command name.
   *
   * @var string
   */
  protected $name = 'authtest';

  /**
   * The console command description.
   *
   * @var string
   */
  protected $description = "Serve the application on the PHP development server";

  /**
   * Execute the console command.
   *
   * @return void
   */
  public function handle()
  {
    echo "Hello world\n";
    $this->checkToken('asd');
  }

  /**
   * Get the console command options.
   *
   * @return array
   */
  protected function getOptions()
  {
    return array(
      array('token', null, InputOption::VALUE_OPTIONAL, 'The host address to serve the application on.', 'token'),
    );
  }
}
