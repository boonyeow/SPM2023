from datetime import datetime

import pytz  # Import the pytz library for working with time zones
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)


def convert_to_utc_timestamp(timestamp_with_z):
    # Parse the timestamp with 'Z' to a datetime object and specify the 'Z' time zone
    timestamp = datetime.fromisoformat(timestamp_with_z.replace("Z", "+00:00"))

    # Convert the timestamp to UTC
    utc_timestamp = timestamp.astimezone(pytz.utc)

    # Format the UTC timestamp as a string with microseconds
    return utc_timestamp.strftime("%Y-%m-%dT%H:%M:%S.%f")


class TestCancelApplicationRoute:
    ROUTE = "/application"

    def test_cancel_listing_application_happy(self):
        payload = {"staff_id": 150245}
        application_id = 1
        res = client.request("DELETE", f"{self.ROUTE}/{application_id}", json=payload)

        data = res.json()
        assert res.status_code == 200
        assert data["message"] == "Application deleted"

    def test_cancel_listing_application_invalid_staff_id(self):
        payload = {"staff_id": 0}
        application_id = 1
        res = client.request("DELETE", f"{self.ROUTE}/{application_id}", json=payload)

        data = res.json()
        assert res.status_code == 404
        assert data["detail"] == "Staff does not exist"

    def test_cancel_listing_application_invalid_application_id(self):
        payload = {"staff_id": 150245}
        application_id = 0
        res = client.request("DELETE", f"{self.ROUTE}/{application_id}", json=payload)

        data = res.json()
        assert res.status_code == 404
        assert data["detail"] == "Application does not exist"

    def test_cancel_listing_application_unauthorised_staff(self):
        payload = {"staff_id": 150245}
        application_id = 4
        res = client.request("DELETE", f"{self.ROUTE}/{application_id}", json=payload)

        data = res.json()
        assert res.status_code == 403
        assert data["detail"] == "Staff not authorized to delete application"
