import csv
import os

import pytest
from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.engine import URL
from sqlalchemy.orm import sessionmaker

from app.models import AccessControl, Base, Role, RoleSkill, Skill, Staff, StaffSkill

# Load environment variables from .env file
load_dotenv()


def populate_test_database(session):
    with open("data/role.csv", "r") as f:
        reader = csv.reader(f)
        next(reader)
        for row in reader:
            session.add(Role(role_name=row[0], role_desc=row[1]))

    with open("data/skill.csv", "r") as f:
        reader = csv.reader(f)
        next(reader)
        for row in reader:
            session.add(Skill(skill_name=row[0], skill_desc=row[1]))

    with open("data/Access_Control.csv", "r") as f:
        reader = csv.reader(f)
        next(reader)
        for row in reader:
            session.add(AccessControl(access_id=row[0], access_control_name=row[1]))

    session.commit()

    with open("data/role_skill.csv", "r") as f:
        reader = csv.reader(f)
        next(reader)
        for row in reader:
            session.add(RoleSkill(role_name=row[0], skill_name=row[1]))

    with open("data/staff.csv", "r") as f:
        reader = csv.reader(f)
        next(reader)
        for row in reader:
            session.add(
                Staff(
                    staff_id=row[0],
                    staff_fname=row[1],
                    staff_lname=row[2],
                    dept=row[3],
                    country=row[4],
                    email=row[5],
                    access_id=row[6],
                )
            )

    with open("data/staff_skill.csv", "r") as f:
        reader = csv.reader(f)
        next(reader)
        for row in reader:
            session.add(StaffSkill(staff_id=row[0], skill_name=row[1]))
    session.commit()


@pytest.fixture(scope="module")
def db_session():
    from app.database import SessionLocal, engine

    db_url = URL.create(
        database="production_db",
        drivername="postgresql+psycopg2",
        host=os.getenv("DB_HOST"),
        username=os.getenv("DB_USERNAME"),
        password=os.getenv("DB_PASSWORD"),
        port="5432",
    )
    engine = create_engine(db_url, echo=True)
    SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)
    session = SessionLocal()
    try:
        populate_test_database(session)  # Call the function to add sample data
        yield session
    finally:
        session.close()
        engine.dispose()
