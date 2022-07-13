import { Typography, TextField, Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import { MainCard } from "../MainCard/MainCard";
import { MainPageContainer } from "../MainPageContainer/MainPageContainer";

export const LoginPage = () => {
  const { t } = useTranslation();

  return (
    <MainPageContainer>
      <MainCard headingText={t("login.headingText")}>
        <Typography variant="body1">{t("login.description")}</Typography>
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
