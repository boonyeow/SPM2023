from fastapi import Depends, FastAPI
from sqlalchemy.orm import Session
from .models import Role
from .database import SessionLocal
import uvicorn

app = FastAPI()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/")
def index():
    return {"message": "Hello World"}

@app.get("/roles")
def get_roles(db: Session = Depends(get_db)):
    db = SessionLocal()
    roles = db.query(Role).all()
    db.close()
    return roles

if __name__=="__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)