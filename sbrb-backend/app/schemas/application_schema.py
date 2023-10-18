from datetime import datetime
from typing import Annotated

from fastapi import Body
from pydantic import BaseModel

from app.models import ApplicationStatusEnum
from app.schemas.staff_schema import StaffWithSkills


class Application(BaseModel):
    application_id: int
    listing_id: int
    submitted_by_id: int
    submission_date: Annotated[datetime, Body()]
    status: ApplicationStatusEnum


class ApplicationWithStaffSkills(BaseModel):
    application_id: int
    listing_id: int
    staff: StaffWithSkills
    submission_date: Annotated[datetime, Body()]


class ApplyListing(BaseModel):
    listing_id: int
    user_id: int
