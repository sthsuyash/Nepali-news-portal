from fastapi import FastAPI, File, HTTPException, Request, Depends, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials, OAuth2PasswordBearer
from pydantic import BaseModel, EmailStr, validator
from sqlalchemy import ForeignKey, join, null, select
from databases import Database
import sqlalchemy
import logging
from datetime import datetime, timedelta
import jwt  # Use PyJWT for token creation and verification
import datetime 
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware




# Define the HTTP Bearer Token security scheme
bearer_scheme = HTTPBearer()

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

# Posts table definition
posts = sqlalchemy.Table(
    "posts",
    metadata,
    sqlalchemy.Column("id", sqlalchemy.Integer, primary_key=True, autoincrement=True),
    sqlalchemy.Column("title", sqlalchemy.String(length=100), nullable=False),
    sqlalchemy.Column("post", sqlalchemy.Text, nullable=False),
    sqlalchemy.Column("isPublished", sqlalchemy.Boolean, default=False),
    sqlalchemy.Column("sentiment", sqlalchemy.String(length=20), nullable=True),
    sqlalchemy.Column("user_id", sqlalchemy.Integer, ForeignKey("users.id")),
    sqlalchemy.Column("created_date", sqlalchemy.DateTime, default=datetime.datetime.utcnow),  # Automatically set on creation
    sqlalchemy.Column("updated_date", sqlalchemy.DateTime, nullable=True)  # Set to NULL initially, updated on edit
)

# Create an engine to use with metadata
engine = sqlalchemy.create_engine(DATABASE_URL)
metadata.create_all(engine)  # Create tables in the database if they don't exist

# FastAPI app instance
app = FastAPI()

# Add CORSMiddleware before the routes
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Allowed frontend origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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

# Hardcoded admin credentials
ADMIN_USERNAME = "admin"
ADMIN_PASSWORD = "adminpassword"

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

class PostCreate(BaseModel):
    title: str
    post: str
    isPublished: bool   

class PostUpdate(BaseModel):
    title: str
    post: str
    isPublished: bool     

# In-memory storage for session tokens
active_sessions = {}

# Token generation function
def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.datetime.now() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

# Dashboard access validation function
def get_current_user(request: Request):
    authorization = request.headers.get("Authorization")
    if not authorization:
        raise HTTPException(status_code=401, detail="Authorization header not found")
    
    # Extract token from Authorization header
    token = authorization.split(" ")[-1]
    
    if token not in active_sessions:
        raise HTTPException(status_code=401, detail="Invalid authentication credentials")
    
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username = payload.get("sub")
        role = payload.get("role")
        user_id = payload.get("user_id")  # Extract user_id from the payload
        if username is None or role is None or user_id is None:
            raise HTTPException(status_code=401, detail="Invalid token")
        return {"username": username, "role": role, "user_id": user_id}  # Return user_id here
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
    # Check for hardcoded admin credentials
    if user.username == ADMIN_USERNAME and user.password == ADMIN_PASSWORD:
        access_token = create_access_token(data={"sub": user.username, "role": "admin", "user_id": -1})  # Admin user_id as -1 or any specific value
        active_sessions[access_token] = user.username
        return {"access_token": access_token, "token_type": "bearer", "message": "Welcome Admin!"}

    # Check in database for normal users
    query = users.select().where(users.c.username == user.username)
    existing_user = await database.fetch_one(query)

    if not existing_user or existing_user["password"] != user.password:
        raise HTTPException(status_code=400, detail="Incorrect username or password")

    # Create access token with user_id
    access_token = create_access_token(data={"sub": user.username, "role": "user", "user_id": existing_user["id"]})
    active_sessions[access_token] = user.username
    return {"access_token": access_token, "token_type": "bearer"}

@app.get("/dashboard", dependencies=[Depends(bearer_scheme)])
async def read_dashboard(request: Request):
    current_user = get_current_user(request) #Extract token from header
    if current_user['role'] != "user": 
        raise HTTPException(status_code=403, detail="Access denied")
    
    # Fetch user data from the database
    query = users.select().where(users.c.username == current_user['username'])
    user_data = await database.fetch_one(query)

    if user_data is None:
        raise HTTPException(status_code=404, detail="User not found")
    
     # Fetch posts for this user
    post_query = posts.select().where(posts.c.user_id == user_data["id"])
    user_posts = await database.fetch_all(post_query)
      # Format the posts for display
    posts_response = [
        {"title": post["title"], "sentiment": post["sentiment"]}
        for post in user_posts
    ]

    return {
        "message": f"Welcome to your dashboard, {current_user['username']}!",
        "user_data": {
            "username": user_data["username"],
            "email": user_data["email"],
            
        },
        "posts": posts_response
    }


@app.get("/admin-dashboard", dependencies=[Depends(bearer_scheme)])
async def read_admin_dashboard(request: Request):
    current_user = get_current_user(request)
    
    # Check if the current user is an admin
    if current_user['role'] != "admin": 
        raise HTTPException(status_code=403, detail="Access denied")

    # Query to join posts and users tables and fetch the latest 5 posts
    query = (
        select(
            posts.c.id,
            posts.c.title,
            posts.c.post,
            posts.c.sentiment,
            posts.c.user_id,
            posts.c.created_date,
            posts.c.updated_date,
            users.c.username  # Get username from the users table
        )
        .select_from(
            join(posts, users, posts.c.user_id == users.c.id)
        )
        .order_by(posts.c.id.desc())
        .limit(5)
    )
    
    latest_posts = await database.fetch_all(query)

    # Format the posts for display, including username
    posts_response = [
        {
            "title": post["title"],
            "post": post["post"],
            "sentiment": post["sentiment"],
            "user_id": post["user_id"],
            "username": post["username"],  # Username from users table
            "created_date": post["created_date"],
            "updated_date": post["updated_date"]
        }
        for post in latest_posts
    ]

    return {
        "message": f"Welcome to the Admin Dashboard, {current_user['username']}!",
        "latest_posts": posts_response
    }


@app.post("/logout", dependencies=[Depends(bearer_scheme)])
async def logout(request: Request):
    current_user = get_current_user(request)  # Token validation is now handled here
    if active_sessions.get(request.headers.get("Authorization")):
        del active_sessions[request.headers.get("Authorization")]
        return {"message": "Successfully logged out!"}
    else:
        raise HTTPException(status_code=400, detail="Token not found or already logged out.")

@app.post("/dashboard/post",dependencies=[Depends(bearer_scheme)])
async def create_post(request: Request, post_data: PostCreate):
    current_user = get_current_user(request)  # Verify token and get user
    if current_user['role'] != "user":
        raise HTTPException(status_code=403, detail="Access denied")
    
    # Fetch user info
    query = users.select().where(users.c.username == current_user["username"])
    user = await database.fetch_one(query)
    
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    
    
    # Insert new post into the database
    insert_query = posts.insert().values(
        title=post_data.title,
        post=post_data.post,
        isPublished=post_data.isPublished,
        sentiment=null(),
        user_id=user["id"],
        created_date=datetime.datetime.now()  # Set created date
    )
    await database.execute(insert_query)

    return {"message": "Post created successfully!"}

@app.put("/dashboard/post/{post_id}", dependencies=[Depends(bearer_scheme)])
async def update_post(post_id: int, request: Request, post_data: PostUpdate):
    current_user = get_current_user(request)  # Verify token and get user

    if current_user['role'] != "user":
        raise HTTPException(status_code=403, detail="Access denied")

    # Fetch the post to ensure the user is the owner
    query = posts.select().where(posts.c.id == post_id)
    existing_post = await database.fetch_one(query)

    if not existing_post:
        raise HTTPException(status_code=404, detail="Post not found")

    if existing_post["user_id"] != current_user["user_id"]:
        raise HTTPException(status_code=403, detail="You can only edit your own posts")

    # Update the post in the database
    update_query = posts.update().where(posts.c.id == post_id).values(
        title=post_data.title,
        post=post_data.post,
        isPublished=post_data.isPublished,
        sentiment=None,
        updated_date=datetime.datetime.now()  # This sets the updated date
    )
    await database.execute(update_query)

    return {"message": "Post updated successfully!"}



@app.delete("/dashboard/post/{post_id}",dependencies=[Depends(bearer_scheme)])
async def delete_post(post_id: int, request: Request):
    current_user = get_current_user(request)


    if current_user['role'] != "user":
        raise HTTPException(status_code=403, detail="Access denied")

    # Fetch the post to ensure the user is the owner
    query = posts.select().where(posts.c.id == post_id)
    existing_post = await database.fetch_one(query)

    if not existing_post:
        raise HTTPException(status_code=404, detail="Post not found")

    if existing_post["user_id"] != current_user["user_id"]:
        raise HTTPException(status_code=403, detail="You can only delete your own posts")

    # Delete the post from the database
    delete_query = posts.delete().where(posts.c.id == post_id)
    await database.execute(delete_query)

    return {"message": "Post deleted successfully!"}
@app.get("/")
async def read_root():
    try:
        if not database.is_connected:
            await database.connect()
        return {"message": "Hello, FastAPI with PostgreSQL and Docker! Connected to DB successfully!"}
    except Exception as e:
        logging.error(f"Error checking database connection: {e}")
        raise HTTPException(status_code=500, detail="Database connection error")
    
@app.get("/home")
async def get_home():
    query = posts.select()
    all_posts = await database.fetch_all(query)

    # If there are no posts, return a message
    if not all_posts:
        raise HTTPException(status_code=404, detail="No posts found")

    # Format posts to return a more user-friendly response
    formatted_posts = [
        {"title": post["title"], "sentiment": post["sentiment"]}
        for post in all_posts
    ]

    return {"posts": formatted_posts}
