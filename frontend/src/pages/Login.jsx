import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/Login.css";


function Login() {

    const navigate = useNavigate();

    const { login } = useAuth();


    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [error, setError] = useState("");


    const handleLogin = async (e) => {

        e.preventDefault();

        setError("");


        try {

            await login({
                email: email,
                password: password
            });


            localStorage.setItem(
    "username",
    email.split("@")[0]
);


            navigate("/");


            window.location.reload();


        } catch (error) {

            console.log(error.response);


            setError(
                error.response?.data?.detail?.[0]?.msg ||
                error.response?.data?.detail ||
                "Invalid email or password"
            );

        }

    };


    return (

        <div className="login-container">

            <div className="login-box">


                <h2>
                    Login Here
                </h2>


                {
                    error && (
                        <p className="error">
                            {error}
                        </p>
                    )
                }


                <form onSubmit={handleLogin}>


                    <input
                        type="email"
                        placeholder="Enter Email"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                        required
                    />


                    <input
                        type="password"
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                        required
                    />


                    <button type="submit">
                        Login
                    </button>


                </form>


                <p className="register-link">

                    Don't have an account?

                    <Link to="/register">
                        {" "}Register
                    </Link>

                </p>


            </div>

        </div>

    );

}


export default Login;