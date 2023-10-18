from app.database import get_db
from app.schemas.application_schema import ApplyListing
from app.services.application_service import ApplicationService
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

router = APIRouter()


@router.post("/apply", status_code=200)
def apply_for_listing(apply_listing: ApplyListing, db: Session = Depends(get_db)):
    application_service = ApplicationService(db)
    if application_service.check_if_user_already_applied(
        apply_listing.user_id, apply_listing.listing_id
    ):
        return HTTPException(status_code=400, detail="User already applied")

    application_service.apply_for_listing(
        apply_listing.user_id, apply_listing.listing_id
    )
    return {"message": "Application submitted"}
