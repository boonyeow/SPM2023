from sqlalchemy import create_engine
from sqlalchemy.engine import URL
from sqlalchemy.orm import declarative_base, sessionmaker

url = URL.create(
    database="postgres",
    drivername="postgresql+psycopg2",
    host="scrum2023.cplyu5olo9jt.ap-southeast-1.rds.amazonaws.com",
    username="mickeymouse",
    password="H124f%4blob",
    port="5432",
)

engine = create_engine(url)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()
