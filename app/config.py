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
    EMAILAGE_ACCOUNT_SID = 'EA439AD449954FC88A352EC1687C8263'
    EMAILAGE_AUTH_TOKEN = 'D8B41E108DE444F09B48E6BBDD27FC9D'
