import http from "k6/http";
import { check, sleep } from "k6";

export let options = {
    vus: 10,
    duration: "30s",
};

export default function () {
   // Fetch Patients
   let res = http.get("http://localhost:3001/patients");
   check(res, { "GET /patients status was 200": (r) => r.status === 200 });

   // Add a New Patient
   let payload = JSON.stringify({ name: "Max", age: 4, species: "Dog", owner: "John" });
   let params = { headers: { "Content-Type": "application/json" } };
   let postRes = http.post("http://localhost:3001/patients", payload, params);
   check(postRes, { "POST /patients status was 201": (r) => r.status === 201 });

   // Delete the Newly Added Patient
   let patientId = JSON.parse(postRes.body).id;  // Get new patient ID
   let deleteRes = http.del(`http://localhost:3001/patients/${patientId}`);
   check(deleteRes, { "DELETE /patients status was 200": (r) => r.status === 200 });

   sleep(1); // Wait between requests
}
