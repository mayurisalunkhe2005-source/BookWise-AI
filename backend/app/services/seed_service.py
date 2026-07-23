import os

import pandas as pd
from sqlalchemy.orm import Session

from app.models.book import Book


def seed_books(db: Session):
    """
    Seed books from processed_books.csv into the database.
    Runs only if the books table is empty.
    """

    # Don't seed twice
    if db.query(Book).count() > 0:
        print("📚 Books already seeded.")
        return

    # backend/
    base_dir = os.path.dirname(
        os.path.dirname(
            os.path.dirname(__file__)
        )
    )

    csv_path = os.path.join(
        base_dir,
        "model",
        "processed_books.csv"
    )

    df = pd.read_csv(csv_path)

    books = []

    for _, row in df.iterrows():

        year = None

        if pd.notna(row["year"]):
            try:
                year = int(row["year"])
            except Exception:
                year = None

        books.append(
            Book(
                isbn=str(row["ISBN"]),
                title=row["title"],
                author=row["author"],
                year=year,
                publisher=row["publisher"],
                image=row["image"],
                content=row["content"],
            )
        )

    db.bulk_save_objects(books)
    db.commit()

    print(f"✅ Seeded {len(books)} books.")