from ast import Delete
import requests

endpoint = "http://localhost:8000/backend/delete/36/"

get_response = requests.delete(endpoint) 

print(get_response.status_code)
print(get_response.json())