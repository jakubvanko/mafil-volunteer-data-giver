import { Typography, TextField } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { MainCard } from "../MainCard/MainCard";
import { MainPageContainer } from "../MainPageContainer/MainPageContainer";
import { useUserContext } from "../UserContextProvider/UserContextProvider";

export const LoginPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { emailToken } = useParams();
  const [secret, setSecret] = useState<string>("");
  const [isLoginLoading, setLoginLoading] = useState<boolean>(false);
  const [isLoginError, setLoginError] = useState<boolean>(false);
  const userContext = useUserContext();

  return (
    <MainPageContainer>
      <MainCard headingText={t("login.headingText")}>
        <Typography variant="body1">{t("login.description")}</Typography>
        <TextField
          id="textfield-code"
          label={t("login.textFieldLabel")}
          variant="filled"
          fullWidth
          value={secret}
          onChange={(event) => setSecret(event.target.value)}
          error={isLoginError}
          helperText={isLoginError && t("login.invalidSecret")}
        />
        <LoadingButton
          fullWidth
          variant="contained"
          loading={isLoginLoading}
          onClick={async () => {
            setLoginLoading(true);
            try {
              await userContext.login(emailToken!, secret);
              navigate("../../user", { replace: true });
            } catch {
              setLoginError(true);
            }
            setLoginLoading(false);
          }}
        >
          {t("login.buttonText")}
        </LoadingButton>
      </MainCard>
    </MainPageContainer>
  );
};
