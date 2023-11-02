from typing import List

from app.database import get_db
from app.schemas.application_schema import ApplicationWithStaffSkills
from app.schemas.listing_schema import Listing, ListingCreate, ListingWithSkills
from app.services.application_service import ApplicationService
from app.services.helper_service import HelperService
from app.services.listing_service import ListingService
from fastapi import APIRouter, Depends, HTTPException, Query
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
    helper_service = HelperService(db)
    listing_exist = helper_service.check_if_listing_exists(listing_id)
    if not listing_exist:
        raise HTTPException(status_code=403, detail="Listing not found")

    listing_service = ListingService(db)
    listing = listing_service.get_listing_by_id(listing_id)
    if user_id:
        listing.applied = helper_service.check_if_user_already_applied(
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
    if body.listing_title == "":
        raise HTTPException(status_code=403, detail="Listing title cannot be empty")

    if body.listing_desc == "":
        raise HTTPException(
            status_code=403, detail="Listing description cannot be empty"
        )

    helper_service = HelperService(db)
    country_name_exist = helper_service.check_if_country_exists(body.country_name)
    if not country_name_exist:
        raise HTTPException(status_code=403, detail="Country does not exist")

    department_name_exist = helper_service.check_if_department_exists(
        body.department_name
    )
    if not department_name_exist:
        raise HTTPException(status_code=403, detail="Department does not exist")

    role_name_exist = helper_service.check_if_role_exists(body.role_name)
    if not role_name_exist:
        raise HTTPException(status_code=403, detail="Role does not exist")

    created_by_exists = helper_service.check_if_staff_exists(body.created_by_id)
    if not created_by_exists:
        raise HTTPException(status_code=403, detail="Created By does not exist")

    reporting_manager_exists = helper_service.check_if_staff_exists(
        body.reporting_manager_id
    )
    if not reporting_manager_exists:
        raise HTTPException(status_code=403, detail="Reporting Manager does not exist")

    listing_service = ListingService(db)
    return listing_service.create_listing(body)


@router.put("/listings/{id}", status_code=200, response_model=Listing)
def edit_listing(id: int, body: ListingCreate, db: Session = Depends(get_db)):
    if body.listing_title == "":
        raise HTTPException(status_code=403, detail="Listing title cannot be empty")

    if body.listing_desc == "":
        raise HTTPException(
            status_code=403, detail="Listing description cannot be empty"
        )

    helper_service = HelperService(db)
    country_name_exist = helper_service.check_if_country_exists(body.country_name)
    if not country_name_exist:
        raise HTTPException(status_code=403, detail="Country does not exist")

    department_name_exist = helper_service.check_if_department_exists(
        body.department_name
    )
    if not department_name_exist:
        raise HTTPException(status_code=403, detail="Department does not exist")

    role_name_exist = helper_service.check_if_role_exists(body.role_name)
    if not role_name_exist:
        raise HTTPException(status_code=403, detail="Role does not exist")

    created_by_exists = helper_service.check_if_staff_exists(body.created_by_id)
    if not created_by_exists:
        raise HTTPException(status_code=403, detail="Created By does not exist")

    reporting_manager_exists = helper_service.check_if_staff_exists(
        body.reporting_manager_id
    )
    if not reporting_manager_exists:
        raise HTTPException(status_code=403, detail="Reporting Manager does not exist")

    listing_service = ListingService(db)
    listing_exist = helper_service.check_if_listing_exists(id)
    if not listing_exist:
        raise HTTPException(status_code=403, detail="Listing does not exist")

    listing_active = helper_service.check_if_listing_is_active(id)
    if not listing_active:
        raise HTTPException(status_code=403, detail="Listing is not active")
    return listing_service.update_listing(id, body)
