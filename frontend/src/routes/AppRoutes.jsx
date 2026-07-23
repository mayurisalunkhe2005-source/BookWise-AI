import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "../components/Navbar";
import ProtectedRoute from "../components/ProtectedRoute";
import PopularBooks from "../pages/PopularBooks";
import Dashboard from "../pages/Dashboard";
import Favorites from "../pages/Favorites";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Books from "../pages/Books";
import BookDetails from "../pages/BookDetails";
import Search from "../pages/Search";
import Recommendations from "../pages/Recommendations";
import Profile from "../pages/Profile";
import NotFound from "../pages/NotFound";

function AppRoutes() {
    return (
        <BrowserRouter>

            <Navbar />

            <Routes>

                <Route path="/" element={<Home />} />

                <Route path="/login" element={<Login />} />

                <Route path="/register" element={<Register />} />

                <Route
                    path="/books"
                    element={
                        <ProtectedRoute>
                            <Books />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/book-details"
                    element={
                        <ProtectedRoute>
                            <BookDetails />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/search"
                    element={
                        <ProtectedRoute>
                            <Search />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/recommendations"
                    element={
                        <ProtectedRoute>
                            <Recommendations />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/favorites"
                    element={
                        <ProtectedRoute>
                            <Favorites />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/profile"
                    element={
                        <ProtectedRoute>
                            <Profile />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/popular"
                    element={
                        <ProtectedRoute>
                            <PopularBooks />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/recommendations"
                    element={
                        <ProtectedRoute>
                            <Recommendations />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/favorites"
                    element={<Favorites />}
                />



                <Route path="*" element={<NotFound />} />

            </Routes>

        </BrowserRouter>
    );
}

export default AppRoutes;