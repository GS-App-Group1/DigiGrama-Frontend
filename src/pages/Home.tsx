import React, { useEffect, useState } from "react";
import { ChakraProvider, Spinner, Center } from "@chakra-ui/react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import AuthPage from "./AuthPage";
import GramaHomePage from "./GramaHome";
import UserHomePage from "./UserHome";
import { useAuthContext, BasicUserInfo } from "@asgardeo/auth-react";

interface DerivedState {
  authenticateResponse: BasicUserInfo;
  idToken: string[];
  decodedIdTokenHeader: string;
  decodedIDTokenPayload: Record<string, string | number | boolean>;
}

type RedirectProps = {
  role: string;
};

const Redirect = ({ role }: RedirectProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (role === "Admin") {
      navigate("/grama-home");
    } else if (role === "Users") {
      navigate("/user-home");
    }
  }, [role, navigate]);

  return (
    <Center h="100vh" bgGradient="linear(to-tl, #189972, #ffffff)">
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    </Center>
  );
};

const Home: React.FC = () => {
  const {
    state,
    signIn,
    signOut,
    getBasicUserInfo,
    getIDToken,
    getAccessToken,
    getDecodedIDToken,
  } = useAuthContext();

  const [derivedAuthenticationState, setDerivedAuthenticationState] =
    useState<DerivedState>({} as DerivedState);

  const [accessToken, setAccessToken] = useState<string>("");

  useEffect(() => {
    if (!state?.isAuthenticated) {
      return;
    }

    (async (): Promise<void> => {
      const basicUserInfo = await getBasicUserInfo();
      const idToken = await getIDToken();
      const accessToken = await getAccessToken();
      const decodedIDToken = await getDecodedIDToken();

      const derivedState: DerivedState = {
        authenticateResponse: basicUserInfo,
        idToken: idToken.split("."),
        decodedIdTokenHeader: JSON.parse(atob(idToken.split(".")[0])),
        decodedIDTokenPayload: decodedIDToken,
      };

      setDerivedAuthenticationState(derivedState);
      setAccessToken(accessToken);
      console.log("access", accessToken);
    })();
  }, [state.isAuthenticated, getBasicUserInfo, getIDToken, getDecodedIDToken]);

  console.log(derivedAuthenticationState);

  const payload = derivedAuthenticationState.authenticateResponse;
  console.log(payload);
  let role = "";
  let username = "";
  let nic = "";
  let email = "";
  if (payload) {
    if (payload.groups) {
      role = payload.groups.toString();
    } else {
      role = "Users";
    }
    if (payload.username) {
      username = payload.username;
    }
    if (payload.nic) {
      nic = payload.nic;
    }
    if (payload.email) {
      email = payload.email;
    }
  }

  return (
    <ChakraProvider>
      <Router>
        <Routes>
          {/* <Route path="/" element={<RedirectToAuth />} /> */}
          <Route
            path="/"
            element={
              role ? <Redirect role={role} /> : <AuthPage signIn={signIn} />
            }
          />
          <Route path="/redirect" element={<Redirect role={role} />} />
          <Route
            path="/grama-home"
            element={
              role === "Admin" ? (
                <GramaHomePage
                  token={accessToken}
                  signOut={signOut}
                  username={username}
                  nic={nic}
                />
              ) : null
            }
          />
          <Route
            path="/user-home"
            element={
              role === "Users" ? (
                <UserHomePage
                  token={accessToken}
                  signOut={signOut}
                  username={username}
                  nic={nic}
                  email={email}
                />
              ) : null
            }
          />
        </Routes>
      </Router>
    </ChakraProvider>
  );
};

export default Home;
