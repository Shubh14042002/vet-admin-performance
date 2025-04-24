import http from "k6/http";
import { check, sleep } from "k6";
import { Counter, Trend } from "k6/metrics";

// Custom metrics
export let successfulRequests = new Counter("successful_requests");
export let responseTime = new Trend("response_time");

export let options = {
    vus: 10,              // Simulate 10 concurrent users
    duration: "2m",       // Run for 2 minutes to ensure complete iterations
    thresholds: {
        successful_requests: ["count > 50"],         // At least 50 successful requests
        http_req_duration: ["p(95)<500"],            // 95% of requests under 500ms
    },
};

// Helper function to generate random patient data
function generatePatient() {
    const names = ["Max", "Luna", "Charlie", "Bella"];
    const species = ["Dog", "Cat", "Rabbit", "Parrot"];
    const owners = ["John", "Sara", "Mike", "Alice"];
    return JSON.stringify({
        name: names[Math.floor(Math.random() * names.length)],
        age: Math.floor(Math.random() * 15) + 1,
        species: species[Math.floor(Math.random() * species.length)],
        owner: owners[Math.floor(Math.random() * owners.length)],
    });
}

export default function () {
    const baseURL = "http://localhost:3001";
    const headers = { headers: { "Content-Type": "application/json" } };

    // 1. GET /patients
    let res = http.get(`${baseURL}/patients`);
    check(res, { "GET /patients status was 200": (r) => r.status === 200 });
    responseTime.add(res.timings.duration);
    if (res.status === 200) successfulRequests.add(1);

    // 2. POST /patients
    let payload = generatePatient();
    let postRes = http.post(`${baseURL}/patients`, payload, headers);
    check(postRes, { "POST /patients status was 201": (r) => r.status === 201 });
    responseTime.add(postRes.timings.duration);
    if (postRes.status === 201) successfulRequests.add(1);

    // Extract ID from POST response
    let patientId;
    try {
        patientId = JSON.parse(postRes.body).id;
    } catch (e) {
        console.error("Error parsing POST response:", e);
        return;
    }

    // 3. DELETE /patients/:id
    let deleteRes = http.del(`${baseURL}/patients/${patientId}`);
    check(deleteRes, { "DELETE /patients status was 200": (r) => r.status === 200 });
    responseTime.add(deleteRes.timings.duration);
    if (deleteRes.status === 200) successfulRequests.add(1);

    sleep(1); // Simulate think time
}
