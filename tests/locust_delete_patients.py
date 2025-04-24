from locust import HttpUser, task, between
import random

class PatientDeletionUser(HttpUser):
    wait_time = between(1, 3) 

    def on_start(self):
        self.patient_ids = []
        response = self.client.get("/patients")  
        if response.status_code == 200:
            patients = response.json()
            self.patient_ids = [patient["id"] for patient in patients]  

    @task
    def delete_patient(self):
        if not self.patient_ids:
            return 

        patient_id = random.choice(self.patient_ids)
        response = self.client.delete(f"/patients/{patient_id}")

        if response.status_code == 204: 
            self.patient_ids.remove(patient_id) 