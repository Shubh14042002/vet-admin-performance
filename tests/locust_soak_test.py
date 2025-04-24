from locust import HttpUser, task, between
import random

class VetAdminUser(HttpUser):
    wait_time = between(1, 3)

    @task(3)
    def get_patients(self):
        self.client.get("/patients")

    @task(1)
    def add_patient(self):
        new_patient = {
            "name": f"Test Pet {random.randint(1, 100000)}",
            "age": random.randint(1, 15),
            "species": "Cat",
            "owner": f"Owner {random.randint(1, 50000)}"
        }
        self.client.post("/patients", json=new_patient)
