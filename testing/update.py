import requests

endpoint = "http://localhost:8000/backend/update/35/"

data = {
    "task_name": "Task 1",
    "status": True
}
get_response = requests.post(endpoint, json=data) 

print(get_response.status_code)
print(get_response.json())