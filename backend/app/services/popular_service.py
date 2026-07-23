from sqlalchemy.orm import Session

from app.models.book import Book


class PopularService:

    def get_popular_books(
        self,
        db: Session,
        limit: int = 20
    ):
        books = (
            db.query(Book)
            .limit(limit)
            .all()
        )

        return books


popular_service = PopularService()