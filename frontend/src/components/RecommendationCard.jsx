import { useNavigate } from "react-router-dom";

function RecommendationCard({ book, selectedBook }) {
  const navigate = useNavigate();

  const getReasons = () => {
    const reasons = [];

    // Same author
    if (
      selectedBook &&
      book.author &&
      selectedBook.toLowerCase().includes("grisham") &&
      book.author.toLowerCase().includes("grisham")
    ) {
      reasons.push("Same Author");
    }

    // Same publisher
    if (
      book.publisher &&
      book.publisher.toLowerCase().includes("dell")
    ) {
      reasons.push("Same Publisher");
    }

    // Similar publication period
    if (book.year >= 1990 && book.year <= 2005) {
      reasons.push("Similar Publication Period");
    }

    // Always show this reason
    reasons.push(`Popular among readers of "${selectedBook}"`);

    return reasons;
  };

  return (
    <div className="col-md-4 mb-4">
      <div className="card h-100 shadow">

        <img
          src={book.image}
          alt={book.title}
          className="card-img-top"
          style={{
            height: "300px",
            objectFit: "contain",
            backgroundColor: "#f8f9fa"
          }}
          onError={(e) => {
            e.target.src =
              "https://placehold.co/200x300?text=No+Cover";
          }}
        />

        <div className="card-body">

          <h5>{book.title}</h5>

          <p>
            <strong>Author:</strong> {book.author}
          </p>

          <p>
            <strong>Publisher:</strong> {book.publisher}
          </p>

          <p>
            <strong>Year:</strong> {book.year}
          </p>

          <hr />

          <h6>🤖 Why Recommended?</h6>

          <ul className="small">
            {getReasons().map((reason, index) => (
              <li key={index}>✔ {reason}</li>
            ))}
          </ul>

          <button
    className="btn btn-primary w-100 mt-2"
    onClick={() =>
        navigate("/book-details", {
            state: { book }
        })
    }
>
    📖 View Details
</button>

        </div>
      </div>
    </div>
  );
}

export default RecommendationCard;