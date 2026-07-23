import os
import joblib
import pandas as pd


class RecommendationService:
    def __init__(self):
        self.books = None
        self.popular_books = None
        self.similarity = None
        self.load_model()

    def load_model(self):
        """
        Load datasets and ML model once when FastAPI starts.
        """

        # backend/
        base_dir = os.path.dirname(
            os.path.dirname(
                os.path.dirname(__file__)
            )
        )

        model_dir = os.path.join(base_dir, "model")

        books_path = os.path.join(model_dir, "processed_books.csv")
        popular_books_path = os.path.join(model_dir, "popular_books.csv")
        similarity_path = os.path.join(model_dir, "similarity.pkl")

        # Load datasets
        self.books = pd.read_csv(books_path)
        self.popular_books = pd.read_csv(popular_books_path)

        # Load similarity matrix
        self.similarity = joblib.load(similarity_path)

        print("✅ Book Recommendation Model Loaded Successfully!")

    # --------------------------------------------------------
    # Get all books (Pagination)
    # --------------------------------------------------------
    def get_books(self, page: int = 1, limit: int = 20):
        total = len(self.books)

        start = (page - 1) * limit
        end = start + limit

        books = self.books.iloc[start:end]

        return {
            "page": page,
            "limit": limit,
            "total": total,
            "total_pages": (total + limit - 1) // limit,
            "books": books.to_dict(orient="records")
        }

    # --------------------------------------------------------
    # Get one book by ISBN
    # --------------------------------------------------------
    def get_book_by_isbn(self, isbn: str):
        result = self.books[self.books["ISBN"] == isbn]

        if result.empty:
            return None

        return result.iloc[0].to_dict()

    # --------------------------------------------------------
    # Search books
    # --------------------------------------------------------
    def search_books(self, query: str):
        result = self.books[
            self.books["title"].str.contains(query, case=False, na=False)
        ]

        return result.to_dict(orient="records")

    # --------------------------------------------------------
    # Get Popular Books
    # --------------------------------------------------------
    def get_popular_books(self, limit: int = 20):
        books = self.popular_books.head(limit)

        return books.to_dict(orient="records")

    # --------------------------------------------------------
    # Recommend Books
    # --------------------------------------------------------
    def recommend(self, title: str, top_n: int = 5):

        if title not in self.books["title"].values:
            return []

        index = self.books[self.books["title"] == title].index[0]

        similarity_scores = list(enumerate(self.similarity[index]))

        similarity_scores = sorted(
            similarity_scores,
            key=lambda x: x[1],
            reverse=True
        )

        recommendations = []

        for book_index, _ in similarity_scores[1: top_n + 1]:
            book = self.books.iloc[book_index]

            recommendations.append(
                {
                    "isbn": str(book["ISBN"]),
                    "title": book["title"],
                    "author": book["author"],
                    "year": (
                        None
                        if pd.isna(book["year"])
                        else int(book["year"])
                    ),
                    "publisher": book["publisher"],
                    "image": book["image"],
                }
            )

        return recommendations


# Singleton instance
recommendation_service = RecommendationService()