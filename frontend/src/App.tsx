import { createTheme, CssBaseline } from "@mui/material";
import { Header } from "./components/Header/Header";
import { LoginPage } from "./components/LoginPage/LoginPage";
import { ThemeProvider } from "@emotion/react";
import { UserPage } from "./components/UserPage/UserPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { BasicMessagePage } from "./components/BasicMessagePage/BasicMessagePage";
import { applyLocalization } from "./i18n";
import { useTranslation } from "react-i18next";
import { UserContextProvider } from "./components/UserContextProvider/UserContextProvider";

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

  return (
    <UserContextProvider>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline>
            <Header />
            <Routes>
              <Route path="login/:emailToken" element={<LoginPage />} />
              <Route path="user" element={<UserPage />} />
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
    </UserContextProvider>
  );
};

export default App;
