from datetime import datetime

from sqlalchemy.orm import Session

from app.models import Application, Country, Department, Listing, Role, Staff


class HelperService:
    def __init__(self, db: Session):
        self.db = db

    # Helper for Country
    def check_if_country_exists(self, country_name):
        country = self.db.get(Country, country_name)
        if country:
            return True
        return False

    # Helper for Department
    def check_if_department_exists(self, department_name):
        department = self.db.get(Department, department_name)
        if department:
            return True
        return False

    # Helper for Staff
    def check_if_staff_exists(self, staff_id):
        staff = self.db.get(Staff, staff_id)
        if staff:
            return True
        return False

    # Helper for Role
    def check_if_role_exists(self, role_name):
        role = self.db.get(Role, role_name)
        if role:
            return True
        return False

    # Helper for Listings
    def check_if_listing_is_active(self, listing_id):
        listing = self.db.get(Listing, listing_id)
        if listing.expiry_date >= datetime.utcnow():
            return True
        return False

    def check_if_listing_exists(self, id):
        listing = self.db.query(Listing).filter(Listing.listing_id == id).first()
        if listing:
            return True
        return False

    # Helper for Applications
    def check_if_user_already_applied(self, user_id: int, listing_id: int):
        application = (
            self.db.query(Application)
            .filter(
                Application.listing_id == listing_id,
                Application.submitted_by_id == user_id,
            )
            .all()
        )
        if application:
            return True
        return False

    def check_if_application_exists(self, application_id: int):
        application = self.db.get(Application, application_id)
        if application:
            return True
        return False

    def check_for_correct_staff_in_application(
        self, application_id: int, staff_id: int
    ):
        application = self.db.get(Application, application_id)
        if application.submitted_by_id == staff_id:
            return True
        return False
