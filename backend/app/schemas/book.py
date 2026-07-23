from pydantic import BaseModel


class RecommendationRequest(BaseModel):
    book_title: str