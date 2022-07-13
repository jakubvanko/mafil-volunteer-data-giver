import { createTheme, CssBaseline } from "@mui/material";
import { Header } from "./components/Header/Header";
import { LoginPage } from "./components/LoginPage/LoginPage";
import { ThemeProvider } from "@emotion/react";
import { UserPage } from "./components/UserPage/UserPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { BasicMessagePage } from "./components/BasicMessagePage/BasicMessagePage";
import { applyLocalization } from "./i18n";

applyLocalization();

const theme = createTheme({
  palette: {
    background: {
      default: "rgb(248, 248, 248)",
    },
  },
});

const App = () => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline>
          <Header />
          <Routes>
            <Route path="login/:token" element={<LoginPage />} />
            <Route path="user" element={<UserPage />} />
            <Route
              path="logout"
              element={
                <BasicMessagePage
                  headingText="Boli ste odhlásení"
                  descriptionText="Boli ste úspešne odhlásení. Teraz môžete webstránku bezpečne opustiť."
                />
              }
            />
            <Route
              path="deleted"
              element={
                <BasicMessagePage
                  headingText="Váš prihlasovací odkaz bol zneplatnený"
                  descriptionText="Váš prihlasovací odkaz bol zneplatnený. Ďakujeme za účasť v našej štúdii."
                />
              }
            />
            <Route
              path="*"
              element={
                <BasicMessagePage
                  headingText="Chyba 404"
                  descriptionText="Zadaná stránka neexistuje alebo bola odstránená."
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
