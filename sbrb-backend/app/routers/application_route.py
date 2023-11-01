from typing import Annotated

from fastapi import APIRouter, Body, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.schemas.application_schema import Application, ApplyListing
from app.services.application_service import ApplicationService
from app.services.helper_service import HelperService

router = APIRouter()


@router.post("/apply", status_code=200, response_model=Application)
def apply_for_listing(apply_listing: ApplyListing, db: Session = Depends(get_db)):
    application_service = ApplicationService(db)
    helper_service = HelperService(db)

    if not helper_service.check_if_listing_is_active(apply_listing.listing_id):
        raise HTTPException(status_code=403, detail="Listing is not active")
    if helper_service.check_if_user_already_applied(
        apply_listing.user_id, apply_listing.listing_id
    ):
        raise HTTPException(status_code=400, detail="User already applied")

    new_application = application_service.apply_for_listing(
        apply_listing.user_id, apply_listing.listing_id
    )
    return new_application


@router.delete("/application/{application_id}", status_code=200)
def cancel_application(
    application_id: int,
    staff_id: Annotated[int, Body(embed=True)],
    db: Session = Depends(get_db),
):
    application_service = ApplicationService(db)
    helper_service = HelperService(db)

    if not helper_service.check_if_staff_exists(staff_id):
        raise HTTPException(status_code=404, detail="Staff does not exist")
    if not helper_service.check_if_application_exists(application_id):
        raise HTTPException(status_code=404, detail="Application does not exist")
    if not helper_service.check_for_correct_staff_in_application(
        application_id, staff_id
    ):
        raise HTTPException(
            status_code=403, detail="Staff not authorized to delete application"
        )

    application_service.delete_application(application_id)
    return {"message": "Application deleted"}
