import pandas as pd

ratings = pd.read_csv(
    "dataset/Ratings.csv",
    low_memory=False,
    encoding="latin-1"
)

print("Columns:")
print(ratings.columns.tolist())

print("\nFirst 5 rows:")
print(ratings.head())

print("\nShape:")
print(ratings.shape)
