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
          <h1>PokéDex</h1>
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
              </>
            )}
          </div>
          {isAuthenticated && (
            <div className="profile-button-container">
              <Link to="/profile">
                <button>Profile</button>
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
