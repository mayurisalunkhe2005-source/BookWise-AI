import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Register() {

  const navigate = useNavigate();

  const { register } = useAuth();

  const [formData, setFormData] = useState({

    username: "",

    email: "",

    password: ""

  });

  const [error, setError] = useState("");

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value,

    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    setError("");

    try {

      await register(formData);

      navigate("/login");

    }

    catch (err) {

      setError(

        err.response?.data?.detail ||

        "Registration failed"

      );

    }

  };

  return (

    <div className="container mt-5" style={{ maxWidth: "500px" }}>

      <div className="card shadow">

        <div className="card-body">

          <h2 className="text-center mb-4">

            Register

          </h2>

          {error && (

            <div className="alert alert-danger">

              {error}

            </div>

          )}

          <form onSubmit={handleSubmit}>

            <div className="mb-3">

              <label>Username</label>

              <input
                className="form-control"
                name="username"
                placeholder="Enter Username"
                value={formData.username}
                onChange={handleChange}
                required
              />

            </div>

            <div className="mb-3">

              <label>Email</label>

              <input
                type="email"
                className="form-control"
                name="email"
                placeholder="Enter Email"
                value={formData.email}
                onChange={handleChange}
                required
              />

            </div>

            <div className="mb-3">

              <label>Password</label>

              <input
                type="password"
                className="form-control"
                name="password"
                placeholder="Enter Password"
                value={formData.password}
                onChange={handleChange}
                required
              />

            </div>

            <button
              className="btn btn-success w-100"
              type="submit"
            >
              Register
            </button>

          </form>

          <p className="text-center mt-3">

            Already have an account?

            <Link to="/login">

              {" "}Login

            </Link>

          </p>

        </div>

      </div>

    </div>

  );

}

export default Register;