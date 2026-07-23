import pandas as pd

# Load datasets
books = pd.read_csv(
    "dataset/Books.csv",
    encoding="latin-1",
    low_memory=False
)

ratings = pd.read_csv(
    "dataset/Ratings.csv",
    encoding="latin-1",
    low_memory=False
)

# Count ratings for each ISBN
rating_count = ratings.groupby("ISBN").size().reset_index(name="rating_count")

# Merge with books
books = books.merge(rating_count, on="ISBN")

# Keep books with at least 50 ratings
popular_books = books[books["rating_count"] >= 50]

print("Original Books :", len(books))
print("Popular Books :", len(popular_books))

# Save the filtered dataset
popular_books.to_csv("model/popular_books.csv", index=False)

print("\n✅ popular_books.csv created successfully!")
