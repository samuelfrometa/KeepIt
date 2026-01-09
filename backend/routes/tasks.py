from fastapi import APIRouter, Depends, Request, Form, HTTPException
from fastapi.responses import HTMLResponse, RedirectResponse
from fastapi.templating import Jinja2Templates
from sqlalchemy.orm import Session

from core.deps import get_db
from models.task import Task
from models.user import User

router = APIRouter()
templates = Jinja2Templates(directory="web/templates")


@router.get("/", response_class=HTMLResponse)
def index(request: Request, db: Session = Depends(get_db)):
    user_id = request.cookies.get("user_id")

    user = None
    tasks = []

    if user_id:
        user = db.query(User).filter(User.id == int(user_id)).first()
        if user:
            tasks = db.query(Task).filter(Task.owner_id == user.id).all()

    return templates.TemplateResponse(
        "index.html",
        {"request": request, "user": user, "tasks": tasks},
    )


@router.post("/tasks")
def add_task(
    request: Request,
    title: str = Form(...),
    db: Session = Depends(get_db),
):
    user_id = request.cookies.get("user_id")
    if not user_id:
        return RedirectResponse("/login", status_code=303)

    task = Task(title=title, owner_id=int(user_id))
    db.add(task)
    db.commit()

    return RedirectResponse("/", status_code=303)


@router.post("/tasks/{task_id}/toggle")
def toggle_task(task_id: int, request: Request, db: Session = Depends(get_db)):
    user_id = request.cookies.get("user_id")

    task = (
        db.query(Task)
        .filter(Task.id == task_id, Task.owner_id == int(user_id))
        .first()
    )

    if not task:
        raise HTTPException(404)

    task.completed = not task.completed
    db.commit()

    return RedirectResponse("/", status_code=303)


@router.post("/tasks/{task_id}/delete")
def delete_task(task_id: int, request: Request, db: Session = Depends(get_db)):
    user_id = request.cookies.get("user_id")

    task = (
        db.query(Task)
        .filter(Task.id == task_id, Task.owner_id == int(user_id))
        .first()
    )

    if not task:
        raise HTTPException(404)

    db.delete(task)
    db.commit()

    return RedirectResponse("/", status_code=303)

@router.get("/add-task", response_class=HTMLResponse)
def add_task_page(request: Request, db: Session = Depends(get_db)):
    user_id = request.cookies.get("user_id")

    if not user_id:
        return RedirectResponse("/login", status_code=303)

    user = db.query(User).filter(User.id == int(user_id)).first()
    if not user:
        return RedirectResponse("/login", status_code=303)

    return templates.TemplateResponse(
        "add_task.html",
        {"request": request, "user": user},
    )
