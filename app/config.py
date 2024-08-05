import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    SECRET_KEY = os.getenv('SECRET_KEY')
    DATABASE = {
        'dbname': os.getenv('DB_NAME'),
        'user': os.getenv('DB_USER'),
        'password': os.getenv('DB_PASSWORD'),
        'host': os.getenv('DB_HOST'),
        'port': os.getenv('DB_PORT')
    }
    API_ACCESS_TOKEN = os.getenv('API_ACCESS_TOKEN')
    API_TOKEN_ID = os.getenv('API_TOKEN_ID')
    EMAILAGE_ACCOUNT_SID = os.getenv('EMAILAGE_ACCOUNT_SID')
    EMAILAGE_AUTH_TOKEN = os.getenv('EMAILAGE_AUTH_TOKEN')