from sqlalchemy.orm import Session

from app.models.book import Book
from app.models.favorite import Favorite
from app.models.user import User


class DashboardService:

    def get_dashboard(self, db: Session):

        return {
            "total_users": db.query(User).count(),
            "total_books": db.query(Book).count(),
            "total_favorites": db.query(Favorite).count(),
        }


dashboard_service = DashboardService()