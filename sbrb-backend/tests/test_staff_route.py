from fastapi.testclient import TestClient

from main import app

client = TestClient(app)


class TestShowStaffDetailsRoute:
    ROUTE = "/staff"

    def test_show_staff_details_happy(self):
        staff_id = 150345
        res = client.get(f"{self.ROUTE}/{staff_id}")

        data = res.json()
        assert res.status_code == 200
        assert data["staff_id"] == staff_id
        assert data["staff_fname"] == "William"
        assert data["staff_lname"] == "Heng"
        assert data["country_name"] == "Singapore"
        assert data["department_name"] == "Engineering"
        assert data["email"] == "William.Heng@allinone.com.sg"
        assert sorted(data["skills"]) == [
            "Collaboration",
            "Security Administration",
        ]
        assert [listing["listing_id"] for listing in data["applied_listings"]] == [
            1,
            2,
            3,
        ]

    def test_show_staff_details_invalid_staff_id(self):
        staff_id = 150346
        res = client.get(f"{self.ROUTE}/{staff_id}")

        data = res.json()
        assert res.status_code == 404
        assert data["detail"] == "Staff does not exist"

    def test_show_staff_details_invalid_data_type(self):
        staff_id = "asd"
        res = client.get(f"{self.ROUTE}/{staff_id}")

        data = res.json()
        assert res.status_code == 422
        assert data["detail"][0]["loc"] == ["path", "staff_id"]
        assert (
            data["detail"][0]["msg"]
            == "Input should be a valid integer, unable to parse string as an integer"
        )
