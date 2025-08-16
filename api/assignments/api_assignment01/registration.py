
from fastapi import FastAPI
from pydantic import BaseModel, EmailStr

app = FastAPI()

registred_users = []

@app.get('/')
def index():
    return registred_users

# register
class RegisterUsr(BaseModel):
    username:str
    email:EmailStr
    password:str

def register_user(username:str, email:str, password:str):
    if len(username)<50 and len(password)>=10:
        usr={"name":username, "email":email, "password":password}
        registred_users.append(usr)
        return {
            "result":"Successfully Registor",
            "user":{
            "username": username,
            "email":email,
            "password": password,
            }
        }
    else:
        return{
            "error":"Password should have minimum length of 8 char and username should name more then 20 char",
            "solution":"Please try to registor again with above condition"
        }

@app.post('/register')
def register_usr(model:RegisterUsr):
    return register_user(model.username, model.email, model.password)



