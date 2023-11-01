from datetime import datetime

from app.models import Country, Department, Role, Staff
from sqlalchemy.orm import Session


class HelperService:
    def __init__(self, db: Session):
        self.db = db

    def check_if_country_exists(self, country_name):
        country = self.db.get(Country, country_name)
        if country:
            return True
        return False

    def check_if_department_exists(self, department_name):
        department = self.db.get(Department, department_name)
        if department:
            return True
        return False

    def check_if_staff_exists(self, staff_id):
        staff = self.db.get(Staff, staff_id)
        if staff:
            return True
        return False

    def check_if_role_exists(self, role_name):
        role = self.db.get(Role, role_name)
        if role:
            return True
        return False
