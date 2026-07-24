from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database.database import SessionLocal
from app.routers import auth, books, favorites, popular, dashboard
from app.services.seed_service import seed_books


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Seed books when the application starts
    db = SessionLocal()
    try:
        seed_books(db)
    finally:
        db.close()

    yield


app = FastAPI(
    title="BookWise AI API",
    version="1.0.0",
    lifespan=lifespan
)

app.add_middleware(
    CORSMiddleware,
   allow_origins=[
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:5175",
    "http://127.0.0.1:5173",
    "http://127.0.0.1:5174",
    "http://127.0.0.1:5175",

    "https://book-wise-ai-six.vercel.app",
],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Routers
app.include_router(auth.router)
app.include_router(books.router)
app.include_router(favorites.router)
app.include_router(popular.router)
app.include_router(dashboard.router)


@app.get("/")
def root():
    return {
        "message": "BookWise AI API is Running 🚀"
    }