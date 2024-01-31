import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { AuthProvider } from "@asgardeo/auth-react";

// const baseURL = "http://localhost:5173";
const baseURL =
  "https://7520375f-93f2-49ce-af11-f09cc7d08dcb.e1-us-east-azure.choreoapps.dev";

const config = {
  signInRedirectURL: `${baseURL}/redirect`,
  signOutRedirectURL: baseURL,
  clientID: "3zISm33IVril_g6jhfRrTUQfJJYa",
  baseUrl: "https://api.asgardeo.io/t/interns",
  scope: [
    "openid",
    "profile",
    "groups",
    "phone",
    "email",
    "roles",
    "urn:interns:policeapipoliceapi:Admin",
    "urn:interns:mainservicetcfmainapi:User",
    "urn:interns:mainservicetcfmainapi:Admin",
    "urn:interns:identityapizttidentityapi:Admin",
    "urn:interns:nicimageapinzrnicimagesap:Admin",
    "urn:interns:nicimageapinzrnicimagesap:User",
  ],
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider config={config}>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
