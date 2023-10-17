from typing import List

from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from app.database import get_db
from app.schemas.application_schema import ApplicationWithStaffSkills
from app.schemas.listing_schema import ListingWithSkills
from app.services.application_service import ApplicationService
from app.services.listing_service import ListingService

router = APIRouter()


@router.get("/listings", status_code=200, response_model=List[ListingWithSkills])
def get_listings(
    active: bool = Query(None, description="Filter active listings"),
    db: Session = Depends(get_db),
):
    listing_service = ListingService(db)
    listings = listing_service.get_listings_with_skills(active)
    return listings


@router.get("/listings/{id}", status_code=200, response_model=ListingWithSkills)
def get_listing_by_id(id: int, db: Session = Depends(get_db)):
    listing_service = ListingService(db)
    return listing_service.get_listing_by_id(id)


@router.get(
    "/listings/{id}/applicants",
    status_code=200,
    response_model=List[ApplicationWithStaffSkills],
)
def get_applicants_for_listing(id: int, db: Session = Depends(get_db)):
    application_service = ApplicationService(db)
    return application_service.get_applicants_for_listing(id)
