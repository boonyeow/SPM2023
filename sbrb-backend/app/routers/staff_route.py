from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.schemas.staff_schema import StaffProfile
from app.services.helper_service import HelperService
from app.services.staff_service import StaffService

router = APIRouter()


@router.get("/staff/{staff_id}", status_code=200, response_model=StaffProfile)
def get_staff_profile_by_id(staff_id: int, db: Session = Depends(get_db)):
    helper_service = HelperService(db)
    if not helper_service.check_if_staff_exists(staff_id):
        raise HTTPException(status_code=404, detail="Staff does not exist")

    staff_service = StaffService(db)
    staff_profile = staff_service.get_staff_profile_by_id(staff_id)
    return staff_profile
