import React from "react";
import "./styles/App.css";
import PokeList from "./components/PokeList";
import Profile from "./components/Profile";
import { useAuth0 } from "@auth0/auth0-react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

function App() {
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();

  return (
    <Router>
      <div className="app">
        <header className="app-header">
          <h1>
            <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
              PokéDex
            </Link>
          </h1>
          <div>
            {!isAuthenticated ? (
              <button
                className="pokemon-login-btn"
                onClick={() => loginWithRedirect()}
              >
                Trainer, Log In!
              </button>
            ) : (
              <>
                <button
                  className="pokemon-login-btn"
                  onClick={() => logout({ returnTo: window.location.origin })}
                >
                  Log Out
                </button>
              </>
            )}
          </div>
          {isAuthenticated && (
            <div className="profile-button-container">
              <Link to="/profile">
                <button className="pokemon-login-btn">Profile</button>
              </Link>
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
