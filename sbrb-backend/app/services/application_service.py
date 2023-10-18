from datetime import datetime

from app.models import Application
from app.schemas.application_schema import ApplicationWithStaffSkills
from app.schemas.staff_schema import StaffWithSkills
from sqlalchemy.orm import Session


class ApplicationService:
    def __init__(self, db: Session):
        self.db = db

    def check_if_user_already_applied(self, user_id: int, listing_id: int):
        application = self.db.query(Application).filter(
            Application.listing_id == listing_id,
            Application.submitted_by_id == user_id,
        )
        if application:
            return True
        return False

    def get_applicants_for_listing(self, id: int):
        applications = (
            self.db.query(Application).filter(Application.listing_id == id).all()
        )
        result = []

        for application in applications:
            staff = application.submitted_by
            skills = [skill.skill_name for skill in application.submitted_by.skills]

            staff_with_skills = StaffWithSkills(
                staff_id=staff.staff_id,
                staff_fname=staff.staff_fname,
                staff_lname=staff.staff_lname,
                dept=staff.dept,
                country=staff.country,
                email=staff.email,
                skills=skills,
            )
            application_with_staff = ApplicationWithStaffSkills(
                application_id=application.application_id,
                listing_id=application.listing_id,
                staff=staff_with_skills,
                submission_date=application.submission_date,
            )

            result.append(application_with_staff)

        return result

    def apply_for_listing(self, user_id: int, listing_id: int):
        new_application = Application(
            listing_id=listing_id,
            submitted_by_id=user_id,
            submission_date=datetime.utcnow(),
        )
        self.db.add(new_application)
        self.db.commit()
        self.db.refresh(new_application)
