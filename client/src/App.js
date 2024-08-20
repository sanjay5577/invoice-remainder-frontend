import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import "./App.css";

function App() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // Add a loading state

    const getUser = async () => {
        try {
            console.log(process.env.REACT_APP_API_URL);
            const url = `${process.env.REACT_APP_API_URL}/auth/login/success`;
            const response = await axios.get(url, { withCredentials: true });
            console.log(response.data)
            
            if (response.data && response.data.user && response.data.user._json) {
                setUser(response.data.user._json);
            } else {
                throw new Error("Unexpected response structure");
            }
        } catch (err) {
            console.error("Failed to fetch user data:", err.message);
            setUser(null);
        } finally {
            setLoading(false);
        }
    };
    
    
    

    useEffect(() => {
        getUser();
    }, []);

    if (loading) {
        return <div>Loading...</div>; // Show a loading message while fetching user data
    }

    return (
        <div className="container">
            <Routes>
                <Route
                    exact
                    path="/"
                    element={user ? <Home user={user} /> : <Navigate to="/login" />}
                />
                <Route
                    exact
                    path="/login"
                    element={user ? <Navigate to="/" /> : <Login />}
                />
                <Route
                    path="/signup"
                    element={user ? <Navigate to="/" /> : <Signup />}
                />
            </Routes>
        </div>
    );
}

export default App;
