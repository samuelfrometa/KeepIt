from fastapi import APIRouter
from models import tickets as Tickets

app = APIRouter()

@app.post('/tickets')
async def post_tickets(tickets: Tickets):
    return {'tickets': tickets, 'name': 'Hola', 'category': 'Adios', 'amount': '3'}