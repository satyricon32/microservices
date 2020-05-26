from fastapi import FastAPI, Header, Request, HTTPException, Response
from app.api.bills import bills
from app.api.db import metadata, database, engine
from fastapi.middleware.cors import CORSMiddleware
import logging

import grpc

from app import auth_pb2, auth_pb2_grpc



metadata.create_all(engine)

app = FastAPI(openapi_url="/api/openapi.json", docs_url="/api/docs")
origins = [
    "*",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.middleware("http")
async def check_token(request: Request, call_next):
    print(request.method) 
    url = str(request.url)
    if "docs" in url or "openapi" in url or "OPTIONS" in str(request.method): 
        return await call_next(request) # разрешаем запросы по адрессу docs и openapi, а также по методу OPTIONS
    with grpc.insecure_channel('localhost:50051') as channel:
        stub = auth_pb2_grpc.TokenizerStub(channel)
        token = str(request.headers['authorization']).split(" ")[1]
        response = stub.checkToken(auth_pb2.Request(token=token))
    if response.userId == "-1":
        return Response(content="Unauthorized", status_code=401)
    response = await call_next(request)
    return response


@app.on_event("startup")
async def startup():
    await database.connect()

@app.on_event("shutdown")
async def shutdown():
    await database.disconnect()


app.include_router(bills, prefix='/api/bills', tags=['bills'])