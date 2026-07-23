import { Link, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {

    const navigate = useNavigate();

    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");


    const logout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("username");

        navigate("/login");

        window.location.reload();
    };


    return (

        <nav className="navbar">

            {/* Left Side */}
            <div className="navbar-left">

                <div className="navbar-title">
                    📚 BookWise-AI
                </div>


                <div className="navbar-links">

                    <Link to="/">
                        Home
                    </Link>

                    <Link to="/books">
                        Books
                    </Link>

                    <Link to="/recommendations">
                        Recommendations
                    </Link>

                    <Link to="/favorites">
                        Favorites
                    </Link>

                </div>

            </div>


            {/* Right Side */}
            <div className="navbar-right">

                {
                    token ? (

                        <div className="user-section">

    <span className="user-name">
        👤 {username}
    </span>

    <button
        className="logout-btn"
        onClick={logout}
    >
        Logout
    </button>

</div>

                    ) : (

                        <Link to="/login">
                            Login
                        </Link>

                    )
                }

            </div>


        </nav>

    );

}


export default Navbar;