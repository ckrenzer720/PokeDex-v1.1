import React from "react";
import "./styles/App.css";
import PokeList from "./components/PokeList";
import Profile from "./components/Profile";
import { useAuth0 } from "@auth0/auth0-react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

function App() {
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();

  return (
    <Router>
      <div className="app">
        <header className="app-header">
          <h1>Welcome to the PokéDex</h1>
          {/* Auth Buttons */}
          <div>
            {!isAuthenticated ? (
              <button onClick={() => loginWithRedirect()}>Log In</button>
            ) : (
              <>
                <button
                  onClick={() => logout({ returnTo: window.location.origin })}
                >
                  Log Out
                </button>
                {/* Profile Link */}
                <Link to="/profile" style={{ marginLeft: "10px" }}>
                  <button>Profile</button>
                </Link>
              </>
            )}
          </div>
          {/* User Info */}
          {isAuthenticated && user && (
            <div style={{ marginTop: "10px" }}>
              <h3>Welcome, {user.name}!</h3>
              <img
                src={user.picture}
                alt={user.name}
                style={{ width: "50px", borderRadius: "50%" }}
              />
            </div>
          )}
        </header>
        <main>
          <Routes>
            <Route
              path="/"
              element={<PokeList isAuthenticated={isAuthenticated} />}
            />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
