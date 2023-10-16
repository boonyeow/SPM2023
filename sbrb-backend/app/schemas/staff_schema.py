from typing import List

from pydantic import BaseModel


class Staff(BaseModel):
    staff_id: int
    staff_fname: str
    staff_lname: str
    dept: str
    country: str
    email: str
    # rname: str


class StaffWithSkills(Staff):
    skills: List[str]
