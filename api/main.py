from fastapi import FastAPI, HTTPException, Depends, status
from pydantic import BaseModel, EmailStr, validator
from sqlalchemy import select
from databases import Database
import sqlalchemy
import logging
import os
from datetime import datetime, timedelta
import jwt  # Use PyJWT for token creation and verification

# Configure logging
logging.basicConfig(level=logging.INFO)

# DATABASE_URL for PostgreSQL running in Docker
DATABASE_URL = "postgresql://postgres:password@localhost:5432/news"

# Database and metadata setup
database = Database(DATABASE_URL)
metadata = sqlalchemy.MetaData()

# Users table definition
users = sqlalchemy.Table(
    "users",
    metadata,
    sqlalchemy.Column("id", sqlalchemy.Integer, primary_key=True, autoincrement=True),
    sqlalchemy.Column("username", sqlalchemy.String(length=50), nullable=False, unique=True),
    sqlalchemy.Column("email", sqlalchemy.String(length=100), nullable=False, unique=True),
    sqlalchemy.Column("phone_number", sqlalchemy.String(length=10), nullable=False),
    sqlalchemy.Column("password", sqlalchemy.String(length=100), nullable=False)
)

# Create an engine to use with metadata
engine = sqlalchemy.create_engine(DATABASE_URL)
metadata.create_all(engine)  # Create tables in the database if they don't exist

# FastAPI app instance
app = FastAPI()

# Function to check database connection status
async def check_database_connection():
    try:
        await database.connect()
        logging.info("Successfully connected to the database.")
        return True
    except Exception as e:
        logging.error(f"Error connecting to the database: {e}")
        return False

@app.on_event("startup")
async def startup():
    connected = await check_database_connection()
    if not connected:
        raise HTTPException(status_code=500, detail="Failed to connect to the database")

@app.on_event("shutdown")
async def shutdown():
    await database.disconnect()
    logging.info("Disconnected from the database.")

# JWT settings
SECRET_KEY = "your_secret_key"  # Change this to a random secret key
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# Pydantic model for request validation
class UserRegister(BaseModel):
    username: str
    email: EmailStr
    phone_number: str
    password: str

    @validator('phone_number')
    def validate_phone_number(cls, v):
        if not v.isdigit() or len(v) != 10:
            raise ValueError('Phone number must be exactly 10 digits and contain only numbers')
        return v

class UserLogin(BaseModel):
    username: str
    password: str

# In-memory storage for session tokens (for demonstration purposes)
active_sessions = {}

# Token generation function
def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

# Dashboard access validation function
def get_current_user(token: str):
    if token not in active_sessions:
        raise HTTPException(status_code=401, detail="Invalid authentication credentials")
    
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username = payload.get("sub")
        if username is None:
            raise HTTPException(status_code=401, detail="Invalid authentication credentials")
        return username
    except jwt.PyJWTError:
        raise HTTPException(status_code=401, detail="Invalid authentication credentials")

@app.post("/register")
async def register(user: UserRegister):
    query = users.select().where(users.c.username == user.username)
    existing_user = await database.fetch_one(query)
    
    if existing_user:
        raise HTTPException(status_code=400, detail="Username already taken")
    
    query = users.insert().values(
        username=user.username,
        email=user.email,
        phone_number=user.phone_number,
        password=user.password  # Storing password as plain text (not recommended in real apps)
    )
    await database.execute(query)
    
    return {"message": "User registered successfully!"}

@app.post("/login")
async def login(user: UserLogin):
    query = users.select().where(users.c.username == user.username)
    existing_user = await database.fetch_one(query)
    
    if not existing_user or existing_user["password"] != user.password:  # Password verification
        raise HTTPException(status_code=400, detail="Incorrect username or password")
    
    # Create access token
    access_token = create_access_token(data={"sub": user.username})
    active_sessions[access_token] = user.username  # Store the active session

    return {"access_token": access_token, "token_type": "bearer"}

@app.get("/dashboard")
async def read_dashboard(token: str):
    current_user = get_current_user(token)  # Verify token and get user
    # Fetch user data from the database
    query = users.select().where(users.c.username == current_user)
    user_data = await database.fetch_one(query)

    if user_data is None:
        raise HTTPException(status_code=404, detail="User not found")

    return {
        "message": f"Welcome to your dashboard, {current_user}!",
        "user_data": {
            "username": user_data["username"],
            "email": user_data["email"],
            "phone_number": user_data["phone_number"],
            # You can include other fields as needed
        }
    }

@app.post("/logout")
async def logout(token: str):
    if token in active_sessions:
        del active_sessions[token]  # Remove the token from active sessions
        return {"message": "Successfully logged out!"}
    else:
        raise HTTPException(status_code=400, detail="Token not found or already logged out.")


@app.get("/")
async def read_root():
    try:
        if not database.is_connected:
            await database.connect()
        return {"message": "Hello, FastAPI with PostgreSQL and Docker! Connected to DB successfully!"}
    except Exception as e:
        logging.error(f"Error checking database connection: {e}")
        raise HTTPException(status_code=500, detail="Database connection error")
