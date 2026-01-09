from fastapi import APIRouter, HTTPException
from models.tickets import Tickets

tickets_router = APIRouter()

# Base de datos en memoria
memory_db = {"tickets": []}

# GET todos los tickets
@tickets_router.get("/")
async def get_tickets():
    return memory_db["tickets"]

# GET ticket por id
@tickets_router.get("/{ticket_id}")
async def get_ticket(ticket_id: int):
    for ticket in memory_db["tickets"]:
        if ticket["id"] == ticket_id:
            return ticket
    raise HTTPException(status_code=404, detail="Ticket not found")

# POST crear ticket
@tickets_router.post("/")
async def create_ticket(ticket: Tickets):
    # comprobar si existe
    for t in memory_db["tickets"]:
        if t["id"] == ticket.id:
            raise HTTPException(status_code=400, detail="Ticket already exists")

    memory_db["tickets"].append(ticket)
    return ticket

# PUT actualizar ticket
@tickets_router.put("/{ticket_id}")
async def update_ticket(ticket_id: int, ticket: Tickets):
    for index, t in enumerate(memory_db["tickets"]):
        if t["id"] == ticket_id:
            memory_db["tickets"][index] = ticket
            return ticket

    raise HTTPException(status_code=404, detail="Ticket not found")

# DELETE eliminar ticket
@tickets_router.delete("/{ticket_id}")
async def delete_ticket(ticket_id: int):
    for index, ticket in enumerate(memory_db["tickets"]):
        if ticket["id"] == ticket_id:
            memory_db["tickets"].pop(index)
            return {"message": "Ticket deleted"}

    raise HTTPException(status_code=404, detail="Ticket not found")
