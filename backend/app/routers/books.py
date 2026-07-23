from fastapi import APIRouter, HTTPException, Query

from app.schemas.book import RecommendationRequest
from app.services.recommendation_service import recommendation_service

router = APIRouter(
    prefix="/books",
    tags=["Books"]
)


# --------------------------------------------------------
# Get All Books (Pagination)
# --------------------------------------------------------
@router.get("/")
def get_books(
    page: int = Query(1, ge=1),
    limit: int = Query(20, ge=1, le=100)
):
    return recommendation_service.get_books(page, limit)


# --------------------------------------------------------
# Search Books
# --------------------------------------------------------
@router.get("/search")
def search_books(query: str = Query(..., min_length=1)):
    return recommendation_service.search_books(query)


# --------------------------------------------------------
# Popular Books
# --------------------------------------------------------
@router.get("/popular")
def get_popular_books(
    limit: int = Query(20, ge=1, le=100)
):
    return recommendation_service.get_popular_books(limit)


# --------------------------------------------------------
# Recommend Books
# --------------------------------------------------------
@router.post("/recommend")
def recommend_books(request: RecommendationRequest):

    recommendations = recommendation_service.recommend(
        request.book_title
    )

    if not recommendations:
        raise HTTPException(
            status_code=404,
            detail="Book not found"
        )

    return {
        "book": request.book_title,
        "count": len(recommendations),
        "recommendations": recommendations,
    }


# --------------------------------------------------------
# Get Book By ISBN
# --------------------------------------------------------
@router.get("/{isbn}")
def get_book(isbn: str):
    book = recommendation_service.get_book_by_isbn(isbn)

    if book is None:
        raise HTTPException(
            status_code=404,
            detail="Book not found"
        )

    return book