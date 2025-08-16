
#  Expose a POST method at /calculator to handle four operations: addition, subtraction, multiplication, and division. Accept two numbers and an operation type (add, subtract, multiply, divide) as JSON input. Return the result of the operation.

from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

# parsing data into JSON formate
class Number(BaseModel):
    x:int
    y:int


# addition
@app.get('/')
def info():
    return {
        "method":"POST",
        "url":['/addition', '/subtraction', '/multiplication', '/division']
    }

@app.post('/addition')
def addition(nums: Number):
    return {nums.x + nums.y}

@app.post('/subtraction')
def subtraction(nums: Number):
    if nums.x>nums.y:
        return nums.x-nums.y
    return nums.y-nums.x

@app.post('/multiplication')
def multiplication(nums:Number):
    return nums.x*nums.y

@app.post('/division')
def division(nums:Number):
    try:
        if nums.x>nums.y:
            return nums.x/nums.y
        return nums.y/nums.x
    except Exception as err:
        return {"Error":f'{err}'}
