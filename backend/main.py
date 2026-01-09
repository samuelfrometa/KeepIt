from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles

from database.db import engine, Base
from routes import auth, tasks

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.mount(
    "/static",
    StaticFiles(directory="web/static"),
    name="static",
)

app.include_router(auth.router)
app.include_router(tasks.router)
