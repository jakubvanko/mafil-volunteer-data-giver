import { createTheme, CssBaseline } from "@mui/material";
import { Header } from "./components/Header/Header";
import { LoginPage } from "./components/LoginPage/LoginPage";
import { ThemeProvider } from "@emotion/react";
import { UserPage } from "./components/UserPage/UserPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { BasicMessagePage } from "./components/BasicMessagePage/BasicMessagePage";
import { applyLocalization } from "./i18n";
import { useTranslation } from "react-i18next";
import { useState } from "react";

import {
  deleteUser,
  getUserData,
  getUserDetails,
  login,
  UserDetails,
} from "./scripts/api";

applyLocalization();

const theme = createTheme({
  palette: {
    background: {
      default: "rgb(248, 248, 248)",
    },
  },
});

const App = () => {
  const { t } = useTranslation();
  const [userToken, setUserToken] = useState<string>("");
  const [userDetails, setUserDetails] = useState<UserDetails>();

  const loginFunction = async (token: string, secret: string) => {
    const loginData = await login(token, secret);
    setUserToken(loginData.token);
    loadUserDetails(loginData.token, loginData.id);
  };

  const loadUserDetails = async (token: string, userId: string) => {
    setUserDetails(await getUserDetails(token, userId));
  };

  const logoutFunction = () => {
    setUserToken("");
    setUserDetails(undefined);
  };

  const downloadUserData = async () => {
    await getUserData(userToken, userDetails!.id);
  };

  const invalidateFunction = async () => {
    await deleteUser(userToken, userDetails!.id);
  };

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline>
          <Header />
          <Routes>
            <Route
              path="login/:token"
              element={<LoginPage loginFunction={loginFunction} />}
            />
            <Route
              path="user"
              element={
                <UserPage
                  userDetails={userDetails}
                  logoutFunction={logoutFunction}
                  downloadUserDataFunction={downloadUserData}
                  invalidateFunction={invalidateFunction}
                />
              }
            />
            <Route
              path="logout"
              element={
                <BasicMessagePage
                  headingText={t("logout.headingText")}
                  descriptionText={t("logout.descriptionText")}
                />
              }
            />
            <Route
              path="deleted"
              element={
                <BasicMessagePage
                  headingText={t("deleted.headingText")}
                  descriptionText={t("deleted.descriptionText")}
                />
              }
            />
            <Route
              path="*"
              element={
                <BasicMessagePage
                  headingText={t("error.headingText")}
                  descriptionText={t("error.descriptionText")}
                />
              }
            />
          </Routes>
        </CssBaseline>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
