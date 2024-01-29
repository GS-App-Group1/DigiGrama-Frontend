import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { AuthProvider } from "@asgardeo/auth-react";

// const baseURL = "http://localhost:5173";
const baseURL =
  "https://c4168445-583b-4236-8e13-8a5174e19daa.e1-us-east-azure.choreoapps.dev";

const config = {
  signInRedirectURL: `${baseURL}/redirect`,
  signOutRedirectURL: baseURL,
  clientID: "WfmlPryaoGNriYT8fQdSTPgMtkAa",
  baseUrl: "https://api.asgardeo.io/t/interns",
  scope: [
    "openid",
    "profile",
    "app_roles",
    "groups",
    "phone",
    "email",
    "urn:interns:policeapipoliceapi:Admin",
    "urn:interns:mainservicetcfmainapi:User",
    "urn:interns:mainservicetcfmainapi:Admin",
    "urn:interns:identityapizttidentityapi:Admin",
  ],
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider config={config}>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
