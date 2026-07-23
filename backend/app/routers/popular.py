from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.services.popular_service import popular_service

router = APIRouter(
    prefix="/popular",
    tags=["Popular Books"]
)


@router.get("/")
def get_popular_books(
    limit: int = 20,
    db: Session = Depends(get_db)
):
    return popular_service.get_popular_books(
        db,
        limit
    )