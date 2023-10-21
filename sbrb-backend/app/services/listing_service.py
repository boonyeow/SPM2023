from datetime import datetime

from sqlalchemy.orm import Session

from app.models import Listing
from app.schemas.listing_schema import ListingCreate, ListingWithSkills


def get_staff_name(first_name, last_name):
    return f"{first_name}, {last_name}"


class ListingService:
    def __init__(self, db: Session):
        self.db = db

    def check_if_listing_is_active(self, listing_id):
        listing = self.db.get(Listing, listing_id)
        if listing.expiry_date >= datetime.utcnow():
            return True
        return False

    def create_listing(self, body: ListingCreate):
        new_listing = Listing(
            role_name=body.role_name,
            listing_title=body.listing_title,
            listing_desc=body.listing_desc,
            department_name=body.dept,
            country_name=body.country,
            reporting_manager_id=body.reporting_manager_id,
            created_by_id=body.created_by_id,
            expiry_date=body.expiry_date,
        )

        self.db.add(new_listing)
        self.db.commit()
        self.db.refresh(new_listing)
        return new_listing

    def get_listings_with_skills(self, active=None):
        listings_query = self.db.query(Listing)
        if isinstance(active, bool):
            if active:
                listings_query = listings_query.filter(
                    Listing.expiry_date >= datetime.utcnow()
                )
            else:
                listings_query = listings_query.filter(
                    Listing.expiry_date < datetime.utcnow()
                )
        listings = listings_query.all()
        result = []

        for listing in listings:
            skills = [skill.skill_name for skill in listing.role.skills]

            # Retrieve the reporting manager's and creator's names
            reporting_manager = listing.reporting_manager
            creator = listing.created_by

            listing_with_skills = ListingWithSkills(
                listing_id=listing.listing_id,
                role_name=listing.role_name,
                listing_title=listing.listing_title,
                listing_desc=listing.listing_desc,
                dept=listing.department_name,
                country=listing.country_name,
                reporting_manager_id=listing.reporting_manager_id,
                reporting_manager_name=get_staff_name(
                    reporting_manager.staff_fname, reporting_manager.staff_lname
                ),
                created_by_id=listing.created_by_id,
                created_by_name=get_staff_name(
                    creator.staff_fname, creator.staff_lname
                ),
                created_date=listing.created_date,
                expiry_date=listing.expiry_date,
                skills=skills,
            )
            result.append(listing_with_skills)

        return result

    def get_listing_by_id(self, id):
        listing = self.db.get(Listing, id)
        skills = [skill.skill_name for skill in listing.role.skills]
        reporting_manager = listing.reporting_manager
        created_by = listing.created_by
        return ListingWithSkills(
            listing_id=listing.listing_id,
            role_name=listing.role_name,
            listing_title=listing.listing_title,
            listing_desc=listing.listing_desc,
            dept=listing.department_name,
            country=listing.country_name,
            reporting_manager_id=listing.reporting_manager_id,
            reporting_manager_name=get_staff_name(
                reporting_manager.staff_fname, reporting_manager.staff_lname
            ),
            created_by_id=listing.created_by_id,
            created_by_name=get_staff_name(
                created_by.staff_fname, created_by.staff_lname
            ),
            created_date=listing.created_date,
            expiry_date=listing.expiry_date,
            skills=skills,
        )
