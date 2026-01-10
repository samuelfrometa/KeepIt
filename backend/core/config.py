# Libreria de sistema
import os

# Libreria para cargar variables de sistema
from dotenv import load_dotenv

# Funcion para cargar variables
load_dotenv()

# Clase de configuracion
class Config:

    # Variable para almacenar las fuentes fiables
    ORIGINS = [
        "http://localhost:5173"
    ]
