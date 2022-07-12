import { StrictMode } from "react";
import { CssBaseline } from "@mui/material";
import { Header } from "./scenes/Header/Header";

const App = () => {
  return (
    <StrictMode>
      <CssBaseline>
        <Header />
      </CssBaseline>
    </StrictMode>
  );
};

export default App;
