import uvicorn
from fastapi import FastAPI
from routes.tickets import tickets_router
from core.config import Config
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.include_router(tickets_router, prefix="/tickets")

app.add_middleware(
    CORSMiddleware,
    allow_origins = Config.ORIGINS,
    allow_credentials = ["*"],
    allow_methods=["*"],
    allow_headers=["*"]
)