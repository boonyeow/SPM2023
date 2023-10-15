from typing import List

from app.database import get_db
from app.schemas.application_schema import ApplicationWithStaffSkills
from app.schemas.listing_schema import ListingWithSkills
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

    if active is None:
        # No 'active' parameter provided, fetch all listings
        listings = listing_service.get_all_listings_with_skills()
    else:
        if active:
            # 'active=True', fetch active listings
            listings = listing_service.get_active_listings_with_skills()
        else:
            # 'active=False', fetch inactive listings
            listings = listing_service.get_inactive_listings_with_skills()
    return listings


@router.get(
    "/listings/{id}/applicants",
    status_code=200,
    response_model=List[ApplicationWithStaffSkills],
)
def get_applicants_for_listing(id: int, db: Session = Depends(get_db)):
    application_service = ApplicationService(db)
    return application_service.get_applicants_for_listing(id)
