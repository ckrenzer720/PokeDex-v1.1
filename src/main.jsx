import React from "react";
import ReactDOM from "react-dom/client"; // Updated import for React 18
import { Provider } from "react-redux";
import store from "./state/store";
import App from "./App";
import "./styles/main.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
