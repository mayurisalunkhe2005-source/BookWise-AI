from sqlalchemy.orm import Session

from app.models.book import Book
from app.models.favorite import Favorite
from app.models.user import User


class FavoriteService:

    def add_favorite(
        self,
        db: Session,
        user: User,
        isbn: str
    ):
        book = db.query(Book).filter(Book.isbn == isbn).first()

        if not book:
            return None

        existing = (
            db.query(Favorite)
            .filter(
                Favorite.user_id == user.id,
                Favorite.book_isbn == isbn
            )
            .first()
        )

        if existing:
            return existing

        favorite = Favorite(
            user_id=user.id,
            book_isbn=isbn
        )

        db.add(favorite)
        db.commit()
        db.refresh(favorite)

        return favorite

    def remove_favorite(
        self,
        db: Session,
        user: User,
        isbn: str
    ):
        favorite = (
            db.query(Favorite)
            .filter(
                Favorite.user_id == user.id,
                Favorite.book_isbn == isbn
            )
            .first()
        )

        if not favorite:
            return False

        db.delete(favorite)
        db.commit()

        return True

    def get_favorites(
        self,
        db: Session,
        user: User
    ):
        favorites = (
            db.query(Favorite)
            .filter(Favorite.user_id == user.id)
            .all()
        )

        result = []

        for favorite in favorites:

            book = (
                db.query(Book)
                .filter(Book.isbn == favorite.book_isbn)
                .first()
            )

            if book:
                result.append(
                    {
                        "isbn": book.isbn,
                        "title": book.title,
                        "author": book.author,
                        "image": book.image,
                        "created_at": favorite.created_at,
                    }
                )

        return result

    def is_favorite(
        self,
        db: Session,
        user: User,
        isbn: str
    ):
        favorite = (
            db.query(Favorite)
            .filter(
                Favorite.user_id == user.id,
                Favorite.book_isbn == isbn
            )
            .first()
        )

        return favorite is not None


favorite_service = FavoriteService()