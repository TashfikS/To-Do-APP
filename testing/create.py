import requests

endpoint = "http://localhost:8000/backend/create/"

data = {
    "task_name": "Task 1",
    "status": False
}
get_response = requests.post(endpoint, json=data) 

print(get_response.status_code)
print(get_response.json())