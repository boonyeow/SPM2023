from datetime import datetime

from app.models import Listing, Staff
from app.schemas.listing_schema import ListingWithSkills
from sqlalchemy.orm import Session


class ListingService:
    def __init__(self, db: Session):
        self.db = db

    def get_all_listings_with_skills(self):
        return self.get_listings_with_skills(active=None)

    def get_active_listings_with_skills(self):
        return self.get_listings_with_skills(active=True)

    def get_inactive_listings_with_skills(self):
        return self.get_listings_with_skills(active=False)

    def get_listings_with_skills(self, active=None):
        listings_query = self.db.query(Listing)
        if active is None:
            pass
        elif active:
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
            reporting_manager = self.db.query(Staff).get(listing.reporting_manager_id)
            creator = self.db.query(Staff).get(listing.created_by)

            listing_with_skills = ListingWithSkills(
                listing_id=listing.listing_id,
                role_name=listing.role_name,
                listing_title=listing.listing_title,
                listing_desc=listing.listing_desc,
                dept=listing.dept,
                country=listing.country,
                reporting_manager_id=listing.reporting_manager_id,
                reporting_manager_name=f"{reporting_manager.staff_fname}, {reporting_manager.staff_lname}",
                created_by=listing.created_by,
                created_by_name=f"{creator.staff_fname}, {creator.staff_lname}",
                created_date=listing.created_date,
                expiry_date=listing.expiry_date,
                skills=skills,
            )
            result.append(listing_with_skills)

        return result
