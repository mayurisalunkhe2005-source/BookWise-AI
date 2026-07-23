import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Dashboard() {
    const { user } = useAuth();

    return (
        <div className="container mt-5">

            <div className="text-center mb-5">
                <h2>Welcome, {user?.username} 👋</h2>
                <p className="text-muted">
                    Discover your next favorite book with AI recommendations.
                </p>
            </div>

            <div className="row">

                <div className="col-md-4 mb-4">
                    <div className="card shadow text-center">
                        <div className="card-body">
                            <h1>📚</h1>
                            <h5>Books Available</h5>
                            <h3>20</h3>
                        </div>
                    </div>
                </div>

                <div className="col-md-4 mb-4">
                    <div className="card shadow text-center">
                        <div className="card-body">
                            <h1>🤖</h1>
                            <h5>AI Recommendations</h5>
                            <h3>5</h3>
                        </div>
                    </div>
                </div>

                <div className="col-md-4 mb-4">
                    <div className="card shadow text-center">
                        <div className="card-body">
                            <h1>❤️</h1>
                            <h5>Favorites</h5>
                            <h3>0</h3>
                        </div>
                    </div>
                </div>

            </div>

            <div className="card shadow mt-4">
                <div className="card-body">
                    <h4>Quick Actions</h4>

                    <div className="d-flex gap-3 flex-wrap mt-3">

                        <Link to="/books" className="btn btn-primary">
                            📚 Browse Books
                        </Link>

                        <Link to="/recommendations" className="btn btn-success">
                            🤖 AI Recommendations
                        </Link>

                        <Link to="/search" className="btn btn-warning">
                            🔍 Search Books
                        </Link>

                        <Link to="/favorites" className="btn btn-danger">
                            ❤️ Favorites
                        </Link>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Dashboard;