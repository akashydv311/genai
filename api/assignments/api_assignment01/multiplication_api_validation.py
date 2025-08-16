
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()


# multiply Pydantic models
class ChildBaseModel(BaseModel):
    a:int
    b:int


# actual running function
def multi_num(a:int, b:int):
    return a * b
    

@app.post('/multiply')
def multiply_num(model:ChildBaseModel):
    return multi_num(model.a, model.b)




