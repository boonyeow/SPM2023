from app.database import get_db
from app.schemas.application_schema import Application, ApplyListing
from app.services.application_service import ApplicationService
from app.services.listing_service import ListingService
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

router = APIRouter()


@router.post("/apply", status_code=200, response_model=Application)
def apply_for_listing(apply_listing: ApplyListing, db: Session = Depends(get_db)):
    application_service = ApplicationService(db)
    listing_active = ListingService(db).check_if_listing_is_active(
        apply_listing.listing_id
    )
    if not listing_active:
        raise HTTPException(status_code=403, detail="Listing is not active")
    if application_service.check_if_user_already_applied(
        apply_listing.user_id, apply_listing.listing_id
    ):
        raise HTTPException(status_code=400, detail="User already applied")

    new_application = application_service.apply_for_listing(
        apply_listing.user_id, apply_listing.listing_id
    )
    return new_application
