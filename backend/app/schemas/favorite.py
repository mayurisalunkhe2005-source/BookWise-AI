from datetime import datetime

from pydantic import BaseModel


class FavoriteResponse(BaseModel):
    isbn: str
    title: str
    author: str
    image: str | None = None
    created_at: datetime

    class Config:
        from_attributes = True