from typing import List

from pydantic import BaseModel


class Staff(BaseModel):
    staff_id: int
    staff_fname: str
    staff_lname: str
    country_name: str
    department_name: str
    email: str


class StaffWithSkills(Staff):
    skills: List[str]


class StaffProfile(StaffWithSkills):
    applied_listings: List[int]