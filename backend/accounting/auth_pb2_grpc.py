# Generated by the gRPC Python protocol compiler plugin. DO NOT EDIT!
import grpc

import auth_pb2 as auth__pb2


class TokenizerStub(object):
    """The greeting service definition.
    """

    def __init__(self, channel):
        """Constructor.

        Args:
            channel: A grpc.Channel.
        """
        self.checkToken = channel.unary_unary(
                '/auth.Tokenizer/checkToken',
                request_serializer=auth__pb2.Request.SerializeToString,
                response_deserializer=auth__pb2.Response.FromString,
                )


class TokenizerServicer(object):
    """The greeting service definition.
    """

    def checkToken(self, request, context):
        """Sends a greeting
        """
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')


def add_TokenizerServicer_to_server(servicer, server):
    rpc_method_handlers = {
            'checkToken': grpc.unary_unary_rpc_method_handler(
                    servicer.checkToken,
                    request_deserializer=auth__pb2.Request.FromString,
                    response_serializer=auth__pb2.Response.SerializeToString,
            ),
    }
    generic_handler = grpc.method_handlers_generic_handler(
            'auth.Tokenizer', rpc_method_handlers)
    server.add_generic_rpc_handlers((generic_handler,))


 # This class is part of an EXPERIMENTAL API.
class Tokenizer(object):
    """The greeting service definition.
    """

    @staticmethod
    def checkToken(request,
            target,
            options=(),
            channel_credentials=None,
            call_credentials=None,
            compression=None,
            wait_for_ready=None,
            timeout=None,
            metadata=None):
        return grpc.experimental.unary_unary(request, target, '/auth.Tokenizer/checkToken',
            auth__pb2.Request.SerializeToString,
            auth__pb2.Response.FromString,
            options, channel_credentials,
            call_credentials, compression, wait_for_ready, timeout, metadata)
