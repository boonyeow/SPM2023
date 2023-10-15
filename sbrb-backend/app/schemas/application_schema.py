from datetime import datetime
from typing import Annotated

from app.schemas.staff_schema import StaffWithSkills
from fastapi import Body
from pydantic import BaseModel


class ApplicationWithStaffSkills(BaseModel):
    application_id: int
    listing_id: int
    staff: StaffWithSkills
    submission_date: Annotated[datetime, Body()]
