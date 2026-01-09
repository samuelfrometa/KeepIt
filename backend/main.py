from fastapi import FastAPI
from routes import tickets

app = FastAPI()

app.include_router(tickets, prefix='/tickets')

app.include_router()
@app.get('/')
async def read_root(tickets):
    return {"message":"Hola Mundo"}