from typing import List

from app.database import get_db
from app.schemas.listing_schema import ListingWithSkills
from app.services.listing_service import ListingService
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

router = APIRouter()


@router.get("/listings", status_code=200, response_model=List[ListingWithSkills])
def get_all_listings(db: Session = Depends(get_db)):
    listing_service = ListingService(db)
    listings = listing_service.get_all_listings_with_skills()
    return listings
