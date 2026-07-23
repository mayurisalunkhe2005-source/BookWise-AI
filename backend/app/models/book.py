from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship

from app.database.database import Base


class Book(Base):
    __tablename__ = "books"

    id = Column(Integer, primary_key=True, index=True)

    isbn = Column(String(20), unique=True, nullable=False, index=True)

    title = Column(String(300), nullable=False)

    author = Column(String(200), nullable=False)

    year = Column(Integer, nullable=True)

    publisher = Column(String(200), nullable=True)

    image = Column(String(500), nullable=True)

    content = Column(String, nullable=True)

    favorites = relationship(
        "Favorite",
        back_populates="book",
        cascade="all, delete-orphan"
    )