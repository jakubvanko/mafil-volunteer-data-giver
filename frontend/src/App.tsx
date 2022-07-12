import { StrictMode } from "react";
import { createTheme, CssBaseline } from "@mui/material";
import { Header } from "./scenes/Header/Header";
import { Login } from "./scenes/Login/Login";
import { ThemeProvider } from "@emotion/react";

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
          <Login />
        </CssBaseline>
      </ThemeProvider>
    </StrictMode>
  );
};

export default App;
