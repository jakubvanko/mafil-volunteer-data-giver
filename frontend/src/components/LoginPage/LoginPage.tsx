import { Typography, TextField, Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { MainCard } from "../MainCard/MainCard";
import { MainPageContainer } from "../MainPageContainer/MainPageContainer";

export const LoginPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <MainPageContainer>
      <MainCard headingText={t("login.headingText")}>
        <Typography variant="body1">{t("login.description")}</Typography>
        <TextField
          id="textfield-code"
          label={t("login.textFieldLabel")}
          variant="filled"
          fullWidth
        />
        <Button
          fullWidth
          variant="contained"
          onClick={() => navigate("../../user", { replace: true })}
        >
          {t("login.buttonText")}
        </Button>
      </MainCard>
    </MainPageContainer>
  );
};
