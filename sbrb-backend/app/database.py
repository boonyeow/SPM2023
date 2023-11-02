import os

from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.engine import URL
from sqlalchemy.orm import declarative_base, sessionmaker

# Load environment variables from .env file
load_dotenv()

engine = None
SessionLocal = None
Base = declarative_base()


def init_engine():
    global engine, SessionLocal
    database = "production_db"
    db_url = URL.create(
        database=database,
        drivername="postgresql+psycopg2",
        host=os.getenv("DB_HOST"),
        username=os.getenv("DB_USERNAME"),
        password=os.getenv("DB_PASSWORD"),
        port="5432",
    )

    engine = create_engine(db_url, echo=True)
    SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
