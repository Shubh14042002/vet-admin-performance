from locust import HttpUser, task, between
import random

class PatientUser(HttpUser):
    wait_time = between(1, 3)  

    @task(10)  
    def add_patient(self):
        patient_data = {
            "name": f"Patient_{random.randint(1, 1000)}",
            "age": random.randint(1, 15),
            "species": random.choice(['Dog', 'Cat', 'Rabbit', 'Bird']),
            "owner": f"{random.choice(['Alice', 'Bob', 'Michi', 'Samu', 'Shubh', 'Sayma'])}"
        }
        self.client.post("/patients", json=patient_data)

