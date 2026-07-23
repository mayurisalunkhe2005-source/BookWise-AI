import os
from pathlib import Path

from dotenv import load_dotenv # type: ignore
from sqlalchemy import create_engine # type: ignore
from sqlalchemy.orm import declarative_base, sessionmaker # type: ignore

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Project root (backend/)
BASE_DIR = Path(__file__).resolve().parents[2]

# Load .env from backend/
load_dotenv(BASE_DIR / ".env")

DATABASE_URL = os.getenv("DATABASE_URL")

if DATABASE_URL is None:
    raise ValueError("DATABASE_URL is not set in the .env file")

# Convert relative SQLite path to an absolute path
if DATABASE_URL.startswith("sqlite:///./"):
    db_relative = DATABASE_URL.replace("sqlite:///./", "")
    db_absolute = BASE_DIR / db_relative
    DATABASE_URL = f"sqlite:///{db_absolute.as_posix()}"

engine = create_engine(
    DATABASE_URL,
    connect_args={"check_same_thread": False}
)

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

Base = declarative_base()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()