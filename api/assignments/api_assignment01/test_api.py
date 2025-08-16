
import requests as req

# Making this code using requests lib

url = "http://localhost:8000/msg"
data = {"msg":"Hello this is a python code"}

def run():
    res = req.post(url, json=data)

    print("Status Code: ", res.status_code)
    print("Response: ", res.json())

i = 1
while(i != 100):
    run()
    i = i+1


