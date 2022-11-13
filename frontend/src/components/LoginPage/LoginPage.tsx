import { Typography, TextField } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useEffect, useState } from "react";
import { useTranslation, Trans } from "react-i18next";
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
  const [isSMSError, setSMSError] = useState<boolean>(false);
  const userContext = useUserContext();

  useEffect(() => {
    if (emailToken === undefined || !userContext.isEmailToken(emailToken!)) {
      navigate("../../error", { replace: true });
      return;
    }
    userContext
      .requestSMSCode(emailToken)
      .then(() => {
        setSMSError(false);
      })
      .catch(() => setSMSError(true));
  }, [emailToken]);

  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault();
        setLoginLoading(true);
        try {
          await userContext.login(emailToken!, secret);
          navigate("../../user", { replace: true });
        } catch {
          await userContext.reloadLoginDetails(emailToken!);
          setLoginError(true);
          setSecret("");
        }
        setLoginLoading(false);
      }}
    >
      <MainPageContainer>
        <MainCard headingText={t("login.headingText")}>
          <Typography variant="body1">
            {userContext.secretTryAmount === undefined ||
              (userContext!.secretTryAmount > 0 && t("login.description"))}
            {userContext.secretTryAmount === undefined ||
              (userContext!.secretTryAmount > 0 && <br />)}
            {userContext.secretTryAmount !== undefined && (
              <Trans
                values={{
                  codeValidityDate:
                    userContext.secretExpirationDate &&
                    userContext.secretExpirationDate
                      .toLocaleTimeString("cs-CZ")
                      .replaceAll(" ", ""),
                  codeTryAmount: userContext.secretTryAmount,
                }}
                components={{
                  bold: <b />,
                }}
                i18nKey={
                  userContext!.secretTryAmount > 0
                    ? "login.smsCommentaryValid"
                    : "login.smsCommentaryInvalid"
                }
              />
            )}
          </Typography>
          {userContext.secretTryAmount === undefined ||
            (userContext!.secretTryAmount > 0 && (
              <TextField
                id="textfield-code"
                label={t("login.textFieldLabel")}
                variant="filled"
                fullWidth
                value={secret}
                onChange={(event) => setSecret(event.target.value)}
                error={
                  isLoginError ||
                  (isSMSError &&
                    (userContext.secretTryAmount === undefined ||
                      userContext.secretTryAmount <= 0))
                }
                helperText={
                  isLoginError
                    ? t("login.invalidSecret")
                    : isSMSError &&
                      (userContext.secretTryAmount === undefined ||
                        userContext.secretTryAmount <= 0)
                    ? t("login.smsError")
                    : ""
                }
              />
            ))}
          {userContext.secretTryAmount !== undefined &&
          userContext!.secretTryAmount <= 0 ? (
            <LoadingButton
              fullWidth
              variant="contained"
              onClick={() => window.location.reload()}
            >
              {t("login.buttonRefreshText")}
            </LoadingButton>
          ) : (
            <LoadingButton
              fullWidth
              variant="contained"
              loading={isLoginLoading}
              type="submit"
            >
              {t("login.buttonText")}
            </LoadingButton>
          )}
        </MainCard>
      </MainPageContainer>
    </form>
  );
};
