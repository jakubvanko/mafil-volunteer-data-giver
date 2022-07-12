import { Typography, TextField, Button } from "@mui/material";
import { MainCard } from "../../components/MainCard/MainCard";
import { MainPage } from "../../components/MainPage/MainPage";

export const Login = () => {
  return (
    <MainPage>
      <MainCard headingText="Prístup k údajom">
        <Typography variant="body1">
          Pre prístup k údajom prosím zadajte svoje rodné číslo.
        </Typography>
        <TextField
          id="textfield-code"
          label="Rodné číslo"
          variant="filled"
          fullWidth
        />
        <Button fullWidth variant="contained">
          Prihlásiť sa
        </Button>
      </MainCard>
    </MainPage>
  );
};
