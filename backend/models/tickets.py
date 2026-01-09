from pydantic import BaseModel, Field
from datetime import date

class Tickets(BaseModel):
    id: int
    name: str = Field(..., description="Ticket name")
    category: str = Field(..., example="Electrónica")
    image: str | None = Field(None, description="Image of the ticket")
    amount: float = Field(..., gt=0)
    date_purchase: date
    date_upload: date
    warranty_start: date
    warranty_end: date
