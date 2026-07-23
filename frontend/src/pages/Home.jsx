import { Link } from "react-router-dom";
import "../styles/Home.css";

function Home() {
  return (
    <section
      className="hero-section"
    >
      <div className="hero-overlay">
        <div className="hero-content">
          <h1>📚 Smart Book Recommendation System</h1>

          <p>
            Discover your next favorite book with AI-powered personalized
            recommendations tailored to your interests.
          </p>

          <Link to="/books" className="hero-btn">
            Explore Books
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Home;