
from requests import request
from fastapi import FastAPI
from pydantic import BaseModel


app = FastAPI()

# writing a code to print addition and msg

# add
class child_add(BaseModel):
    a:int
    b:int

def add_numbers(a:int, b:int):
    return a+b


@app.post('/add')
def add(model:child_add):
    return add_numbers(model.a, model.b)


# msg pydantic is using this internally and we need to give a python object 
class child_msg(BaseModel):
    msg:str

def print_msg(msg):
    return msg+" Thank You!"

@app.post('/msg')
def msg(model:child_msg):
    return print_msg({"you sent:": child_msg.msg})



