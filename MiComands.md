uv init .

uv add fastapi uvicorn sqlmodel python-jose passlib[bcrypt] python-multipart aiofiles python-dotenv

uv pip freeze > requirements.txt

uvicorn main:app --reload
