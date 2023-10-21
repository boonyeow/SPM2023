from datetime import datetime
from typing import Annotated, List

from fastapi import Body
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


class StaffApplicationOverview(BaseModel):
    listing_id: int
    application_id: int
    submission_date: Annotated[datetime, Body()]
    role_name: str
    country_name: str
    department_name: str


class StaffProfile(StaffWithSkills):
    applied_listings: List[StaffApplicationOverview]
