from fastapi.testclient import TestClient
from main import app

client = TestClient(app)


class TestApplyOpenRoleRoute:
    ROUTE = "/apply"

    def test_apply_for_listing_happy(self):
        payload = {"user_id": 150518, "listing_id": 3}
        res = client.request("POST", self.ROUTE, json=payload)

        data = res.json()
        assert res.status_code == 200
        assert data["submitted_by_id"] == payload["user_id"]
        assert data["listing_id"] == payload["listing_id"]

    def test_apply_for_listing_invalid_listing_id(self):
        payload = {"user_id": 150518, "listing_id": 0}
        res = client.request("POST", self.ROUTE, json=payload)

        data = res.json()
        assert res.status_code == 404
        assert data["detail"] == "Listing does not exist"

    def test_apply_for_listing_invalid_user_id(self):
        payload = {"user_id": 1500000, "listing_id": 1}
        res = client.request("POST", self.ROUTE, json=payload)

        data = res.json()
        assert res.status_code == 404
        assert data["detail"] == "User does not exist"

    def test_apply_for_listing_inactive_listing(self):
        payload = {"user_id": 150518, "listing_id": 1}
        res = client.request("POST", self.ROUTE, json=payload)

        data = res.json()
        assert res.status_code == 403
        assert data["detail"] == "Listing is not active"

    def test_apply_for_listing_already_applied(self):
        payload = {"user_id": 151457, "listing_id": 3}
        res = client.request("POST", self.ROUTE, json=payload)

        data = res.json()
        assert res.status_code == 400
        assert data["detail"] == "User already applied"

    def test_apply_for_listing_invalid_data_types(self):
        payload = {"user_id": "asd", "listing_id": "asd"}
        res = client.request("POST", self.ROUTE, json=payload)

        data = res.json()
        assert res.status_code == 422
        print(data)
        assert data["detail"][0]["loc"] == ["body", "listing_id"]
        assert (
            data["detail"][0]["msg"]
            == "Input should be a valid integer, unable to parse string as an integer"
        )

        assert data["detail"][1]["loc"] == ["body", "user_id"]
        assert (
            data["detail"][1]["msg"]
            == "Input should be a valid integer, unable to parse string as an integer"
        )


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
