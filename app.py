from dotenv import load_dotenv
import os

load_dotenv()

JWT_SECRET = os.getenv("JWT_SECRET")
API_BASE = os.getenv("NEXT_PUBLIC_API_BASE")
