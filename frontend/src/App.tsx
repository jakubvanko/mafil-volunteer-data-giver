import { StrictMode } from "react";
import { createTheme, CssBaseline } from "@mui/material";
import { Header } from "./components/Header/Header";
import { LoginPage } from "./components/LoginPage/LoginPage";
import { ThemeProvider } from "@emotion/react";
import { UserPage } from "./components/UserPage/UserPage";

const theme = createTheme({
  palette: {
    background: {
      default: "rgb(248, 248, 248)",
    },
  },
});

const App = () => {
  return (
    <StrictMode>
      <ThemeProvider theme={theme}>
        <CssBaseline>
          <Header />
          <UserPage />
        </CssBaseline>
      </ThemeProvider>
    </StrictMode>
  );
};

export default App;
