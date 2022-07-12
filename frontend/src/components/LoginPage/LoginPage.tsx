import { Typography, TextField, Button } from "@mui/material";
import { MainCard } from "../MainCard/MainCard";
import { MainPageContainer } from "../MainPageContainer/MainPageContainer";

export const LoginPage = () => {
  return (
    <MainPageContainer>
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
    </MainPageContainer>
  );
};
