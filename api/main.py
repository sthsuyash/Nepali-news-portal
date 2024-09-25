# main.py
from fastapi import FastAPI
import sqlalchemy
from databases import Database

DATABASE_URL = "postgresql://postgres:postgres@db/postgres"

database = Database(DATABASE_URL)

metadata = sqlalchemy.MetaData()

app = FastAPI()


@app.on_event("startup")
async def startup():
    await database.connect()


@app.on_event("shutdown")
async def shutdown():
    await database.disconnect()


@app.get("/")
async def read_root():
    return {"message": "Hello, FastAPI with PostgreSQL and Docker!"}
