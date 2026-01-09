uv init .

uv add fastapi uvicorn sqlmodel python-jose passlib[bcrypt] python-multipart aiofiles python-dotenv

uv pip freeze > requirements.txt

uvicorn main:app --reload

uv pip install -r requirements.txt

uv venv

RUTAS WEB IMPORTANTES 
http://127.0.0.1:8000/docs

npx create-expo-app@latest --template blank frontend