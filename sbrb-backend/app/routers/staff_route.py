from typing import List

from app.database import get_db
from app.schemas.application_schema import ApplicationWithStaffSkills
from app.schemas.listing_schema import (Listing, ListingCreate,
                                        ListingWithSkills)
from app.services.application_service import ApplicationService
from app.services.listing_service import ListingService
from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

router = APIRouter()


@router.get('/staff/{staff_id}', status_code=200, response_model=)