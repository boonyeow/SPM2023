from typing import List

from app.database import get_db
from app.schemas.application_schema import ApplicationWithStaffSkills
from app.schemas.listing_schema import Listing, ListingCreate, ListingWithSkills
from app.services.application_service import ApplicationService
from app.services.listing_service import ListingService
from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

router = APIRouter()


@router.get("/listings", status_code=200, response_model=List[ListingWithSkills])
def get_listings(
    active: bool = Query(None, description="Filter active listings"),
    db: Session = Depends(get_db),
):
    listing_service = ListingService(db)
    listings = listing_service.get_listings_with_skills(active)
    return listings


@router.get(
    "/listings/{listing_id}",
    status_code=200,
    response_model=ListingWithSkills,
)
def get_listing_by_id(
    listing_id: int,
    user_id: int = Query(None, description="User ID"),
    db: Session = Depends(get_db),
):
    listing_service = ListingService(db)
    listing = listing_service.get_listing_by_id(listing_id)
    if user_id:
        application_service = ApplicationService(db)
        listing.applied = application_service.check_if_user_already_applied(
            user_id, listing_id
        )

    return listing


@router.get(
    "/listings/{id}/applicants",
    status_code=200,
    response_model=List[ApplicationWithStaffSkills],
)
def get_applicants_for_listing(id: int, db: Session = Depends(get_db)):
    application_service = ApplicationService(db)
    return application_service.get_applicants_for_listing(id)


@router.post("/listing/create", status_code=200, response_model=Listing)
def create_listing(body: ListingCreate, db: Session = Depends(get_db)):
    listing_service = ListingService(db)
    return listing_service.create_listing(body)
