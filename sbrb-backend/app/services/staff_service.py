from sqlalchemy.orm import Session

from app.models import Staff
from app.schemas.staff_schema import StaffApplicationOverview, StaffProfile


class StaffService:
    def __init__(self, db: Session):
        self.db = db

    def get_staff_profile_by_id(self, staff_id):
        staff = self.db.get(Staff, staff_id)
        skills = [skill.skill_name for skill in staff.skills]
        applied_listings = []
        for application in staff.applications:
            listing = application.listing
            applied_listings.append(
                StaffApplicationOverview(
                    listing_id=listing.listing_id,
                    application_id=application.application_id,
                    submission_date=application.submission_date,
                    role_name=listing.role_name,
                    country_name=listing.country_name,
                    department_name=listing.department_name,
                )
            )

        return StaffProfile(
            staff_id=staff.staff_id,
            staff_fname=staff.staff_fname,
            staff_lname=staff.staff_lname,
            country_name=staff.country_name,
            department_name=staff.department_name,
            email=staff.email,
            skills=skills,
            applied_listings=applied_listings,
        )
