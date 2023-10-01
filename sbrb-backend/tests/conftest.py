import os

import pytest
from app.models import AccessControl, Base, Role, RoleSkill, Skill, Staff, StaffSkill
from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.engine import URL
from sqlalchemy.orm import sessionmaker

# Load environment variables from .env file
load_dotenv()


def populate_test_database(session):
    # Create sample roles
    role1 = Role(role_name="Role1", role_desc="Description for Role1")
    role2 = Role(role_name="Role2", role_desc="Description for Role2")

    # Create sample skills
    skill1 = Skill(skill_name="Skill1", skill_desc="Description for Skill1")
    skill2 = Skill(skill_name="Skill2", skill_desc="Description for Skill2")
    skill3 = Skill(skill_name="Skill3", skill_desc="Description for Skill3")
    skill4 = Skill(skill_name="Skill4", skill_desc="Description for Skill4")
    skill5 = Skill(skill_name="Skill5", skill_desc="Description for Skill5")

    # Create sample role-skill relationships
    role_skill1 = RoleSkill(role_name="Role1", skill_name="Skill1")
    role_skill2 = RoleSkill(role_name="Role1", skill_name="Skill2")
    role_skill3 = RoleSkill(role_name="Role2", skill_name="Skill3")
    role_skill4 = RoleSkill(role_name="Role2", skill_name="Skill4")
    role_skill5 = RoleSkill(role_name="Role2", skill_name="Skill5")

    # Create sample access controls
    access_control1 = AccessControl(access_id=1, access_control_name="Access1")
    access_control2 = AccessControl(access_id=2, access_control_name="Access2")

    # Create sample staff members
    staff1 = Staff(
        staff_id=1,
        staff_fname="John",
        staff_lname="Doe",
        dept="HR",
        country="USA",
        email="john.doe@example.com",
        role_name="Role1",
        access_id=1,
    )
    staff2 = Staff(
        staff_id=2,
        staff_fname="Jane",
        staff_lname="Smith",
        dept="IT",
        country="Canada",
        email="jane.smith@example.com",
        role_name="Role2",
        access_id=2,
    )

    # Create sample staff-skill relationships
    staff_skill1 = StaffSkill(staff_id=1, skill_name="Skill1")
    staff_skill2 = StaffSkill(staff_id=2, skill_name="Skill2")
    staff_skill3 = StaffSkill(staff_id=2, skill_name="Skill3")
    staff_skill4 = StaffSkill(staff_id=2, skill_name="Skill4")
    staff_skill5 = StaffSkill(staff_id=1, skill_name="Skill5")

    session.add_all(
        [
            role1,
            role2,
            skill1,
            skill2,
            skill3,
            skill4,
            skill5,
            access_control1,
            access_control2,
        ]
    )
    session.commit()

    session.add_all(
        [
            role_skill1,
            role_skill2,
            role_skill3,
            role_skill4,
            role_skill5,
            staff1,
            staff2,
            staff_skill1,
            staff_skill2,
            staff_skill3,
            staff_skill4,
            staff_skill5,
        ]
    )
    session.commit()


@pytest.fixture(scope="module")
def db_session():
    from app.database import SessionLocal, engine

    db_url = URL.create(
        database="test_db",
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
