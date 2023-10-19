import csv
import os
from datetime import datetime, timedelta

import pytest
from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.engine import URL
from sqlalchemy.orm import sessionmaker

from app.models import (
    AccessControl,
    Application,
    Base,
    Country,
    Department,
    Listing,
    Role,
    RoleSkill,
    Skill,
    Staff,
    StaffSkill,
)

# Load environment variables from .env file
load_dotenv()


def populate_test_database(session):
    with open("data/role.csv", "r", encoding="iso-8859-1") as f:
        reader = csv.reader(f)
        next(reader)
        for row in reader:
            session.add(Role(role_name=row[0], role_desc=row[1]))

    with open("data/skill.csv", "r", encoding="iso-8859-1") as f:
        reader = csv.reader(f)
        next(reader)
        for row in reader:
            session.add(Skill(skill_name=row[0], skill_desc=row[1]))

    with open("data/Access_Control.csv", "r", encoding="iso-8859-1") as f:
        reader = csv.reader(f)
        next(reader)
        for row in reader:
            session.add(AccessControl(access_id=row[0], access_control_name=row[1]))

    # add department
    departments = [
        "Chariman",
        "CEO",
        "Consultancy",
        "Engineering",
        "Finance",
        "HR",
        "IT",
        "Sales",
        "Solutioning",
    ]
    for dept in departments:
        session.add(Department(department_name=dept))

    # add country
    countries = ["Hong Kong", "Indonesia", "Malaysia", "Singapore", "Vietnam"]
    for country in countries:
        session.add(Country(country_name=country))

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
            print("heya", row)
            session.add(
                Staff(
                    staff_id=row[0],
                    staff_fname=row[1],
                    staff_lname=row[2],
                    department_name=row[3].strip(),
                    country_name=row[4].strip(),
                    email=row[5],
                    access_id=row[6],
                )
            )

    with open("data/staff_skill.csv", "r", encoding="iso-8859-1") as f:
        reader = csv.reader(f)
        next(reader)
        for row in reader:
            session.add(StaffSkill(staff_id=row[0], skill_name=row[1]))
    session.commit()

    session.add(
        Listing(
            role_name="Account Manager",
            listing_title="Account Manager 1",
            listing_desc="hello world description",
            department_name="Finance",
            country_name="Singapore",
            reporting_manager_id=170166,
            created_by_id=160008,
            created_date=datetime.utcnow() - timedelta(days=14),
            expiry_date=datetime.utcnow() - timedelta(days=7),
        )
    )

    session.add(
        Listing(
            role_name="Account Manager",
            listing_title="Account Manager 2",
            listing_desc="hello world description",
            department_name="Finance",
            country_name="Singapore",
            reporting_manager_id=170166,
            created_by_id=160008,
            created_date=datetime.utcnow(),
            expiry_date=datetime.utcnow() + timedelta(days=7),
        )
    )

    session.add(
        Listing(
            role_name="Account Manager",
            listing_title="Account Manager 3",
            listing_desc="hello world description",
            department_name="Finance",
            country_name="Singapore",
            reporting_manager_id=170166,
            created_by_id=160008,
            created_date=datetime.utcnow(),
            expiry_date=datetime.utcnow() + timedelta(days=2),
        )
    )
    session.commit()

    session.add(Application(submitted_by_id=150245, listing_id=1))
    session.add(Application(submitted_by_id=150245, listing_id=2))
    session.add(Application(submitted_by_id=150245, listing_id=3))
    session.add(Application(submitted_by_id=150345, listing_id=1))
    session.add(Application(submitted_by_id=150345, listing_id=2))
    session.add(Application(submitted_by_id=150345, listing_id=3))
    session.add(Application(submitted_by_id=151457, listing_id=1))
    session.add(Application(submitted_by_id=151457, listing_id=2))
    session.add(Application(submitted_by_id=151457, listing_id=3))

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
