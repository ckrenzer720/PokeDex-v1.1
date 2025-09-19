import React, { useState, useEffect } from "react";
import "./styles/main.css";
import PokeList from "./components/PokeList";
import Profile from "./components/Profile";
import LoginForm from "./components/LoginForm";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import PokemonPage from "./components/PokemonPage";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  // Check for existing authentication on app load
  useEffect(() => {
    const savedUser = localStorage.getItem("pokemonUser");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem("pokemonUser", JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("pokemonUser");
  };

  return (
    <Router>
      <div className="app">
        <header className="app-header">
          <h1>
            <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
              Pokémon PokéDex
            </Link>
          </h1>
          <div>
            {!isAuthenticated ? (
              <Link to="/login">
                <button className="pokemon-login-btn">Trainer, Log In!</button>
              </Link>
            ) : (
              <>
                <button className="pokemon-login-btn" onClick={handleLogout}>
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
              element={
                <PokeList isAuthenticated={isAuthenticated} user={user} />
              }
            />
            <Route
              path="/login"
              element={<LoginForm onLogin={handleLogin} />}
            />
            <Route
              path="/profile"
              element={
                <Profile user={user} isAuthenticated={isAuthenticated} />
              }
            />
            <Route
              path="/pokemon/:num"
              element={<PokemonPage isAuthenticated={isAuthenticated} />}
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
