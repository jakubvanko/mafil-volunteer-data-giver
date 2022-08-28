import { Typography, TextField } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { MainCard } from "../MainCard/MainCard";
import { MainPageContainer } from "../MainPageContainer/MainPageContainer";

interface LoginPageProps {
  loginFunction: (token: string, secret: string) => Promise<void>;
}

export const LoginPage = ({ loginFunction }: LoginPageProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { token } = useParams();
  const [secret, setSecret] = useState<string>("");
  const [isLoginLoading, setLoginLoading] = useState<boolean>(false);
  const [isLoginError, setLoginError] = useState<boolean>(false);

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
              await loginFunction(token!, secret);
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
