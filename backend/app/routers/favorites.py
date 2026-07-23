from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.security import get_current_user
from app.database.database import get_db
from app.models.user import User
from app.schemas.favorite import FavoriteResponse
from app.services.favorite_service import favorite_service

router = APIRouter(
    prefix="/favorites",
    tags=["Favorites"]
)


@router.post("/{isbn}")
def add_favorite(
    isbn: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    favorite = favorite_service.add_favorite(
        db,
        current_user,
        isbn
    )

    if favorite is None:
        raise HTTPException(
            status_code=404,
            detail="Book not found"
        )

    return {
        "message": "Book added to favorites successfully."
    }


@router.get("/", response_model=list[FavoriteResponse])
def get_favorites(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return favorite_service.get_favorites(
        db,
        current_user
    )


@router.delete("/{isbn}")
def remove_favorite(
    isbn: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    success = favorite_service.remove_favorite(
        db,
        current_user,
        isbn
    )

    if not success:
        raise HTTPException(
            status_code=404,
            detail="Favorite not found"
        )

    return {
        "message": "Book removed from favorites."
    }


@router.get("/{isbn}/status")
def favorite_status(
    isbn: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return {
        "favorite": favorite_service.is_favorite(
            db,
            current_user,
            isbn
        )
    }