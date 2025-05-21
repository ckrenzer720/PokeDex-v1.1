import React from "react";
import ReactDOM from "react-dom/client"; // Updated import for React 18
import { Provider } from "react-redux";
import { Auth0Provider } from "@auth0/auth0-react";
import store from "./state/store";
import App from "./App";
import { auth0Config } from "./auth0-config";
import "./styles/App.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Auth0Provider
      domain={auth0Config.domain}
      clientId={auth0Config.clientId}
      authorizationParams={auth0Config.authorizationParams}
    >
      <Provider store={store}>
        <App />
      </Provider>
    </Auth0Provider>
  </React.StrictMode>
);
