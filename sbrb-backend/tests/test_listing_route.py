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


class TestGetAllListing:
    def test_get_all_listings_happy(self):
        res = client.get("/listings")
        assert res.status_code == 200
        data = res.json()
        assert len(data) == 3
        assert "listing_id" in data[0]
        assert "role_name" in data[0]
        assert "listing_title" in data[0]
        assert "listing_desc" in data[0]
        assert "country_name" in data[0]
        assert "department_name" in data[0]
        assert "reporting_manager_id" in data[0]
        assert "created_by_id" in data[0]
        assert "created_date" in data[0]
        assert "expiry_date" in data[0]
        assert "reporting_manager_name" in data[0]
        assert "created_by_name" in data[0]
        assert "skills" in data[0]
        assert "applied" in data[0]


class TestCreateListing:
    def test_create_listing_happy(self):
        payload = {
            "role_name": "Admin Executive",
            "listing_title": "Listing for Admin Executive 1",
            "listing_desc": "This is sample description",
            "country_name": "Singapore",
            "department_name": "Chariman",
            "reporting_manager_id": 130001,
            "created_by_id": 130002,
            "expiry_date": "2023-11-30T07:09:43.919Z",
        }
        res = client.post("/listing/create", json=payload)
        assert res.status_code == 200

        data = res.json()
        assert data["listing_id"] == 4
        assert data["role_name"] == payload["role_name"]
        assert data["listing_title"] == payload["listing_title"]
        assert data["listing_desc"] == payload["listing_desc"]
        assert data["country_name"] == payload["country_name"]
        assert data["department_name"] == payload["department_name"]
        assert data["created_by_id"] == payload["created_by_id"]

        expected_utc_timestamp = convert_to_utc_timestamp(payload["expiry_date"])
        assert data["expiry_date"] == expected_utc_timestamp

    def test_create_listing_empty_title(self):
        payload = {
            "role_name": "Admin Executive",
            "listing_title": "",
            "listing_desc": "This is sample description",
            "country_name": "Singapore",
            "department_name": "Chariman",
            "reporting_manager_id": 130001,
            "created_by_id": 130002,
            "expiry_date": "2023-11-30T07:09:43.919Z",
        }
        res = client.post("/listing/create", json=payload)
        assert res.status_code == 403
        data = res.json()
        assert data["detail"] == "Listing title cannot be empty"

    def test_create_listing_empty_job_desc(self):
        payload = {
            "role_name": "Admin Executive",
            "listing_title": "Listing for Admin Executive 1",
            "listing_desc": "",
            "country_name": "Singapore",
            "department_name": "Chariman",
            "reporting_manager_id": 130001,
            "created_by_id": 130002,
            "expiry_date": "2023-11-30T07:09:43.919Z",
        }
        res = client.post("/listing/create", json=payload)
        assert res.status_code == 403
        data = res.json()
        assert data["detail"] == "Listing description cannot be empty"

    def test_create_listing_invalid_country(self):
        payload = {
            "role_name": "Admin Executive",
            "listing_title": "Listing for Admin Executive 1",
            "listing_desc": "This is sample description",
            "country_name": "Xingapore",
            "department_name": "Chariman",
            "reporting_manager_id": 130001,
            "created_by_id": 130002,
            "expiry_date": "2023-11-30T07:09:43.919Z",
        }
        res = client.post("/listing/create", json=payload)
        assert res.status_code == 403
        data = res.json()
        assert data["detail"] == "Country does not exist"

    def test_create_listing_invalid_dept(self):
        payload = {
            "role_name": "Admin Executive",
            "listing_title": "Listing for Admin Executive 1",
            "listing_desc": "This is sample description",
            "country_name": "Singapore",
            "department_name": "Superman",
            "reporting_manager_id": 130001,
            "created_by_id": 130002,
            "expiry_date": "2023-11-30T07:09:43.919Z",
        }
        res = client.post("/listing/create", json=payload)
        assert res.status_code == 403
        data = res.json()
        assert data["detail"] == "Department does not exist"

    def test_create_listing_invalid_role(self):
        payload = {
            "role_name": "Welfare Officer",
            "listing_title": "Listing for Welfare Officer 1",
            "listing_desc": "This is sample description",
            "country_name": "Singapore",
            "department_name": "Chariman",
            "reporting_manager_id": 130001,
            "created_by_id": 130002,
            "expiry_date": "2023-11-30T07:09:43.919Z",
        }
        res = client.post("/listing/create", json=payload)
        assert res.status_code == 403
        data = res.json()
        assert data["detail"] == "Role does not exist"

    def test_create_listing_invalid_created_by(self):
        payload = {
            "role_name": "Admin Executive",
            "listing_title": "Listing for Admin Executive 1",
            "listing_desc": "This is sample description",
            "country_name": "Singapore",
            "department_name": "Chariman",
            "reporting_manager_id": 130001,
            "created_by_id": 99999999999999999,
            "expiry_date": "2023-11-30T07:09:43.919Z",
        }
        res = client.post("/listing/create", json=payload)
        assert res.status_code == 403
        data = res.json()
        assert data["detail"] == "Created By does not exist"

    def test_create_listing_invalid_reporting_mgr(self):
        payload = {
            "role_name": "Admin Executive",
            "listing_title": "Listing for Admin Executive 1",
            "listing_desc": "This is sample description",
            "country_name": "Singapore",
            "department_name": "Chariman",
            "reporting_manager_id": 99999999999999999,
            "created_by_id": 130002,
            "expiry_date": "2023-11-30T07:09:43.919Z",
        }
        res = client.post("/listing/create", json=payload)
        assert res.status_code == 403
        data = res.json()
        assert data["detail"] == "Reporting Manager does not exist"

    def test_create_listing_invalid_expiry(self):
        payload = {
            "role_name": "Admin Executive",
            "listing_title": "Listing for Admin Executive 1",
            "listing_desc": "This is sample description",
            "country_name": "Singapore",
            "department_name": "Chariman",
            "reporting_manager_id": 130001,
            "created_by_id": 130002,
            "expiry_date": "2023-11-31T07:09:43.919Z",
        }
        res = client.post("/listing/create", json=payload)
        assert res.status_code == 422
        data = res.json()
        assert data["detail"][0]["loc"] == ["body", "expiry_date"]
        assert (
            data["detail"][0]["msg"]
            == "Input should be a valid datetime, day value is outside expected range"
        )

    def test_create_listing_invalid_data_types(self):
        payload = {
            "role_name": 11111,
            "listing_title": 11111,
            "listing_desc": 11111,
            "country_name": 11111,
            "department_name": 11111,
            "reporting_manager_id": "xxx",
            "created_by_id": "xxx",
            "expiry_date": "xxx",
        }
        res = client.post("/listing/create", json=payload)
        assert res.status_code == 422
        data = res.json()
        assert data["detail"][0]["loc"] == ["body", "role_name"]
        assert data["detail"][0]["msg"] == "Input should be a valid string"

        assert data["detail"][1]["loc"] == ["body", "listing_title"]
        assert data["detail"][1]["msg"] == "Input should be a valid string"

        assert data["detail"][2]["loc"] == ["body", "listing_desc"]
        assert data["detail"][2]["msg"] == "Input should be a valid string"

        assert data["detail"][3]["loc"] == ["body", "country_name"]
        assert data["detail"][3]["msg"] == "Input should be a valid string"

        assert data["detail"][4]["loc"] == ["body", "department_name"]
        assert data["detail"][4]["msg"] == "Input should be a valid string"

        assert data["detail"][5]["loc"] == ["body", "reporting_manager_id"]
        assert (
            data["detail"][5]["msg"]
            == "Input should be a valid integer, unable to parse string as an integer"
        )

        assert data["detail"][6]["loc"] == ["body", "created_by_id"]
        assert (
            data["detail"][6]["msg"]
            == "Input should be a valid integer, unable to parse string as an integer"
        )

        assert data["detail"][7]["loc"] == ["body", "expiry_date"]
        assert (
            data["detail"][7]["msg"]
            == "Input should be a valid datetime, input is too short"
        )


class TestUpdateListing:
    def test_update_listing_happy(self):
        payload = {
            "role_name": "Admin Executive",
            "listing_title": "Listing for Admin Executive 1",
            "listing_desc": "This is sample description",
            "country_name": "Singapore",
            "department_name": "Chariman",
            "reporting_manager_id": 130001,
            "created_by_id": 130002,
            "expiry_date": "2023-11-30T07:09:43.919Z",
        }
        res = client.put("/listings/2", json=payload)
        assert res.status_code == 200

        data = res.json()
        assert data["listing_id"] == 2
        assert data["role_name"] == payload["role_name"]
        assert data["listing_title"] == payload["listing_title"]
        assert data["listing_desc"] == payload["listing_desc"]
        assert data["country_name"] == payload["country_name"]
        assert data["department_name"] == payload["department_name"]
        assert data["created_by_id"] == payload["created_by_id"]

        expected_utc_timestamp = convert_to_utc_timestamp(payload["expiry_date"])
        assert data["expiry_date"] == expected_utc_timestamp

    def test_update_listing_empty_title(self):
        payload = {
            "role_name": "Admin Executive",
            "listing_title": "",
            "listing_desc": "This is sample description",
            "country_name": "Singapore",
            "department_name": "Chariman",
            "reporting_manager_id": 130001,
            "created_by_id": 130002,
            "expiry_date": "2023-11-30T07:09:43.919Z",
        }
        res = client.put("/listings/2", json=payload)
        assert res.status_code == 403
        data = res.json()
        assert data["detail"] == "Listing title cannot be empty"

    def test_update_listing_empty_job_desc(self):
        payload = {
            "role_name": "Admin Executive",
            "listing_title": "Listing for Admin Executive 1",
            "listing_desc": "",
            "country_name": "Singapore",
            "department_name": "Chariman",
            "reporting_manager_id": 130001,
            "created_by_id": 130002,
            "expiry_date": "2023-11-30T07:09:43.919Z",
        }
        res = client.put("/listings/2", json=payload)
        assert res.status_code == 403
        data = res.json()
        assert data["detail"] == "Listing description cannot be empty"

    def test_update_listing_invalid_country(self):
        payload = {
            "role_name": "Admin Executive",
            "listing_title": "Listing for Admin Executive 1",
            "listing_desc": "This is sample description",
            "country_name": "Xingapore",
            "department_name": "Chariman",
            "reporting_manager_id": 130001,
            "created_by_id": 130002,
            "expiry_date": "2023-11-30T07:09:43.919Z",
        }
        res = client.put("/listings/2", json=payload)
        assert res.status_code == 403
        data = res.json()
        assert data["detail"] == "Country does not exist"

    def test_update_listing_invalid_dept(self):
        payload = {
            "role_name": "Admin Executive",
            "listing_title": "Listing for Admin Executive 1",
            "listing_desc": "This is sample description",
            "country_name": "Singapore",
            "department_name": "Superman",
            "reporting_manager_id": 130001,
            "created_by_id": 130002,
            "expiry_date": "2023-11-30T07:09:43.919Z",
        }
        res = client.put("/listings/2", json=payload)
        assert res.status_code == 403
        data = res.json()
        assert data["detail"] == "Department does not exist"

    def test_update_listing_invalid_role(self):
        payload = {
            "role_name": "Welfare Officer",
            "listing_title": "Listing for Welfare Officer 1",
            "listing_desc": "This is sample description",
            "country_name": "Singapore",
            "department_name": "Chariman",
            "reporting_manager_id": 130001,
            "created_by_id": 130002,
            "expiry_date": "2023-11-30T07:09:43.919Z",
        }
        res = client.put("/listings/2", json=payload)
        assert res.status_code == 403
        data = res.json()
        assert data["detail"] == "Role does not exist"

    def test_update_listing_invalid_created_by(self):
        payload = {
            "role_name": "Admin Executive",
            "listing_title": "Listing for Admin Executive 1",
            "listing_desc": "This is sample description",
            "country_name": "Singapore",
            "department_name": "Chariman",
            "reporting_manager_id": 130001,
            "created_by_id": 99999999999999999,
            "expiry_date": "2023-11-30T07:09:43.919Z",
        }
        res = client.put("/listings/2", json=payload)
        assert res.status_code == 403
        data = res.json()
        assert data["detail"] == "Created By does not exist"

    def test_update_listing_invalid_reporting_mgr(self):
        payload = {
            "role_name": "Admin Executive",
            "listing_title": "Listing for Admin Executive 1",
            "listing_desc": "This is sample description",
            "country_name": "Singapore",
            "department_name": "Chariman",
            "reporting_manager_id": 99999999999999999,
            "created_by_id": 130002,
            "expiry_date": "2023-11-30T07:09:43.919Z",
        }
        res = client.put("/listings/2", json=payload)
        assert res.status_code == 403
        data = res.json()
        assert data["detail"] == "Reporting Manager does not exist"

    def test_update_listing_invalid_expiry(self):
        payload = {
            "role_name": "Admin Executive",
            "listing_title": "Listing for Admin Executive 1",
            "listing_desc": "This is sample description",
            "country_name": "Singapore",
            "department_name": "Chariman",
            "reporting_manager_id": 130001,
            "created_by_id": 130002,
            "expiry_date": "2023-11-31T07:09:43.919Z",
        }
        res = client.put("/listings/1", json=payload)
        assert res.status_code == 422
        data = res.json()
        assert data["detail"][0]["loc"] == ["body", "expiry_date"]
        assert (
            data["detail"][0]["msg"]
            == "Input should be a valid datetime, day value is outside expected range"
        )

    def test_update_listing_inactive_listing(self):
        payload = {
            "role_name": "Admin Executive",
            "listing_title": "Listing for Admin Executive 1",
            "listing_desc": "This is sample description",
            "country_name": "Singapore",
            "department_name": "Chariman",
            "reporting_manager_id": 130001,
            "created_by_id": 130002,
            "expiry_date": "2023-11-30T07:09:43.919Z",
        }
        res = client.put("/listings/1", json=payload)
        assert res.status_code == 403
        data = res.json()
        assert data["detail"] == "Listing is not active"

    def test_update_listing_invalid_listing(self):
        payload = {
            "role_name": "Admin Executive",
            "listing_title": "Listing for Admin Executive 1",
            "listing_desc": "This is sample description",
            "country_name": "Singapore",
            "department_name": "Chariman",
            "reporting_manager_id": 130001,
            "created_by_id": 130002,
            "expiry_date": "2023-11-30T07:09:43.919Z",
        }
        res = client.put("/listings/100", json=payload)
        assert res.status_code == 403
        data = res.json()
        assert data["detail"] == "Listing does not exist"

    def test_update_listing_invalid_data_types(self):
        payload = {
            "role_name": 11111,
            "listing_title": 11111,
            "listing_desc": 11111,
            "country_name": 11111,
            "department_name": 11111,
            "reporting_manager_id": "xxx",
            "created_by_id": "xxx",
            "expiry_date": "xxx",
        }
        res = client.put("/listings/1", json=payload)
        assert res.status_code == 422
        data = res.json()
        assert data["detail"][0]["loc"] == ["body", "role_name"]
        assert data["detail"][0]["msg"] == "Input should be a valid string"

        assert data["detail"][1]["loc"] == ["body", "listing_title"]
        assert data["detail"][1]["msg"] == "Input should be a valid string"

        assert data["detail"][2]["loc"] == ["body", "listing_desc"]
        assert data["detail"][2]["msg"] == "Input should be a valid string"

        assert data["detail"][3]["loc"] == ["body", "country_name"]
        assert data["detail"][3]["msg"] == "Input should be a valid string"

        assert data["detail"][4]["loc"] == ["body", "department_name"]
        assert data["detail"][4]["msg"] == "Input should be a valid string"

        assert data["detail"][5]["loc"] == ["body", "reporting_manager_id"]
        assert (
            data["detail"][5]["msg"]
            == "Input should be a valid integer, unable to parse string as an integer"
        )

        assert data["detail"][6]["loc"] == ["body", "created_by_id"]
        assert (
            data["detail"][6]["msg"]
            == "Input should be a valid integer, unable to parse string as an integer"
        )

        assert data["detail"][7]["loc"] == ["body", "expiry_date"]
        assert (
            data["detail"][7]["msg"]
            == "Input should be a valid datetime, input is too short"
        )

    def test_update_expired_listing(self):
        payload = {
            "role_name": "Admin Executive",
            "listing_title": "Listing for Admin Executive 1",
            "listing_desc": "This is sample description",
            "country_name": "Singapore",
            "department_name": "Chariman",
            "reporting_manager_id": 130001,
            "created_by_id": 130002,
            "expiry_date": "2023-11-30T07:09:43.919Z",
        }
        res = client.put("/listings/1", json=payload)
        assert res.status_code == 403

        data = res.json()
        assert data["detail"] == "Listing is not active"
