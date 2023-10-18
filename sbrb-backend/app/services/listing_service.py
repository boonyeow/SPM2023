from datetime import datetime

from sqlalchemy.orm import Session

from app.models import Listing
from app.schemas.listing_schema import ListingWithSkills


def get_staff_name(first_name, last_name):
    return f"{first_name}, {last_name}"


class ListingService:
    def __init__(self, db: Session):
        self.db = db

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
                dept=listing.dept,
                country=listing.country,
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
            dept=listing.dept,
            country=listing.country,
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
