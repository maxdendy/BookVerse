import os
from dotenv import load_dotenv


class BaseSettings:
    def __init__(self):
        dotenv_path = os.path.join('', '.env')

        if os.path.exists(dotenv_path):
            load_dotenv(dotenv_path)
        else:
            raise Exception('You need to fill in the .env file')

        self.db_url = os.getenv('DB_URL')


Settings = BaseSettings()
