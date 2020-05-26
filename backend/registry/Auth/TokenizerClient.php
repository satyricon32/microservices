<?php
// GENERATED CODE -- DO NOT EDIT!

namespace Auth;

/**
 * The greeting service definition.
 */
class TokenizerClient extends \Grpc\BaseStub {

    /**
     * @param string $hostname hostname
     * @param array $opts channel options
     * @param \Grpc\Channel $channel (optional) re-use channel object
     */
    public function __construct($hostname, $opts, $channel = null) {
        parent::__construct($hostname, $opts, $channel);
    }

    /**
     * Sends a greeting
     * @param \Auth\Request $argument input argument
     * @param array $metadata metadata
     * @param array $options call options
     */
    public function checkToken(\Auth\Request $argument,
      $metadata = [], $options = []) {
        return $this->_simpleRequest('/auth.Tokenizer/checkToken',
        $argument,
        ['\Auth\Response', 'decode'],
        $metadata, $options);
    }

}
