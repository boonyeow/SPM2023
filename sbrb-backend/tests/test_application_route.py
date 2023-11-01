from fastapi.testclient import TestClient

from main import app

client = TestClient(app)


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
