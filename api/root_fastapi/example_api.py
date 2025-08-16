
from fastapi import FastAPI
from pydantic import BaseModel


app = FastAPI()

@app.get('/')
def msg():
    return 'Hello World! I am working in India'


@app.get('/greet')
def greet():
    return 'Hello Guys, Good Morning!'


@app.get('/add')
def add(a:int, b:int):
    return a+b


@app.post('/multi')
def multi(a:int, b:int):
    return a*b


@app.post('div')
def divide(a:int, b:int):
    if a > 0 and b > 0:
        return a / b
    else:
        return 'Number should be positive'


@app.post('/sub') 
def substract(a:int, b:int):
    if a > b:
        return a - b
    return b - a


# pydantic module in python for post request
# Implimenting the pydantic module in python for POST request
class SubstractModel (BaseModel):
    a:int
    b:int

# working funtion
def sub(a:int, b:int):
    if a>b:
        return a-b
    return b-a

# expose this url
@app.post('/substract')
def substract_number(akash:SubstractModel):
    return sub(akash.a, akash.b)





    

