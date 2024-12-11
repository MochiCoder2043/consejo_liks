from typing import List

import uvicorn
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel


class Suggestion(BaseModel):
    title: str
    body: str
    name: str


class Suggestions(BaseModel):
    suggestions: List[Suggestion]


class Project(BaseModel):
    title: str
    name: str
    desc: str


class Projects(BaseModel):
    projects: List[Project]


app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "*"
    ],  # Allow all origins (you can restrict to specific domains if needed)
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)

# Initialize the memory database with proper structures
memory_db = {
    "suggestions": [
        {
            "name": "Eric",
            "title": "Test Suggestion 1",
            "body": "This is a test body for suggestion 1",
        },
        {
            "name": "Eric",
            "title": "Test Suggestion 2",
            "body": "This is a test body for suggestion 2",
        },
    ],
    "projects": [
        {
            "title": "Test Suggestion 1",
            "name": "jose",
            "desc": "This is a test body for suggestion 1",
        },
        {
            "title": "Test Suggestion 2",
            "name": "jose",
            "desc": "This is a test body for suggestion 2",
        },
    ],
}


@app.get("/")
def get():
    return {"message": "Hello World"}


@app.get("/suggestions", response_model=Suggestions)
def get_suggestions():
    return Suggestions(suggestions=memory_db["suggestions"])


@app.post("/suggestions")
def post_suggestion(suggestion: Suggestion):
    memory_db["suggestions"].append(suggestion.dict())  # Convert model to dictionary
    return suggestion


@app.delete("/suggestions")
def del_suggestion(suggestion: Suggestion):
    try:
        memory_db["suggestions"].remove(suggestion.dict())
    except ValueError:
        raise HTTPException(status_code=404, detail="Suggestion not found")


@app.get("/suggestion/{id}")
def get_suggestion(id: int):
    try:
        return memory_db["suggestions"][id]
    except IndexError:
        raise HTTPException(status_code=404, detail="Suggestion not found")


@app.get("/contact")
def contact():
    return {"email": "consejo@liks.com", "phone": "123-456-7890"}


@app.get("/projects", response_model=Projects)
def get_projects():
    return Projects(projects=memory_db["projects"])


@app.post("/projects")
def add_project(project: Project):
    memory_db["projects"].append(project.dict())  # Convert model to dictionary
    return project


@app.get("/login")
def login():
    return {"message": "Please provide your login credentials"}
