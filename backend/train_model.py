import pandas as pd
import joblib

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

print("=" * 60)
print("        BOOKWISE AI - TRAINING MODEL")
print("=" * 60)

# Load filtered dataset
books = pd.read_csv("model/popular_books.csv")

print(f"\nBooks Loaded: {len(books)}")

# Rename columns
books = books.rename(columns={
    "Book-Title": "title",
    "Book-Author": "author",
    "Year-Of-Publication": "year",
    "Publisher": "publisher",
    "Image-URL-M": "image"
})

# Keep required columns
books = books[
    ["ISBN", "title", "author", "year", "publisher", "image"]
]

# Remove missing values
books.dropna(inplace=True)

# Remove duplicate titles
books.drop_duplicates(subset="title", inplace=True)

books.reset_index(drop=True, inplace=True)

print(f"Books after cleaning: {len(books)}")

# Create content column
books["content"] = (
    books["title"].astype(str) + " " +
    books["author"].astype(str) + " " +
    books["publisher"].astype(str)
)

print("\nCreating TF-IDF Matrix...")

tfidf = TfidfVectorizer(stop_words="english")

tfidf_matrix = tfidf.fit_transform(books["content"])

print("Calculating Cosine Similarity...")

similarity = cosine_similarity(tfidf_matrix)

print("Saving model...")

books.to_csv("model/processed_books.csv", index=False)

joblib.dump(tfidf, "model/tfidf.pkl")
joblib.dump(similarity, "model/similarity.pkl")

print("\n✅ Training Completed Successfully!")
print("Files saved in model folder.")