from locust import HttpUser, task, between
import random

class VetAdminSpikeUser(HttpUser):
    wait_time = between(1, 3)

    @task(3)
    def get_patients(self):
        self.client.get("/patients")

    @task(1)
    def add_patient(self):
        self.client.post("/patients", json={
            "name": f"Spike Test Pet {random.randint(1, 10000)}",
            "age": random.randint(1, 15),
            "species": "Dog",
            "owner": f"SpikeOwner{random.randint(1, 10000)}"
        })
