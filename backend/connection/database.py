import os
from dotenv import load_dotenv
from peewee import MySQLDatabase

load_dotenv()  

db = MySQLDatabase(
    os.getenv("DB_NAME"),
    host=os.getenv("DB_HOST", "localhost"),
    port=int(os.getenv("DB_PORT", 3306)),
    user=os.getenv("DB_USER"),
    password=os.getenv("DB_PASSWORD"),
)