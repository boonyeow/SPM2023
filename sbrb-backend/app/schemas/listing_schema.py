from datetime import datetime
from typing import Annotated, List

from fastapi import Body
from pydantic import BaseModel


class Listing(BaseModel):
    listing_id: int
    role_name: str
    listing_title: str
    listing_desc: str
    dept: str
    country: str
    reporting_manager_id: int
    created_by_id: int
    created_date: Annotated[datetime, Body()]
    expiry_date: Annotated[datetime, Body()]


class ListingWithSkills(Listing):
    reporting_manager_name: str
    created_by_name: str
    skills: List[str]
    applied: bool | None = None
