import React from "react";
import "./styles/App.css";
import PokeList from "./components/PokeList";

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>Welcome to the PokéDex</h1>
      </header>
      <main>
        <PokeList />
      </main>
    </div>
  );
}

export default App;
