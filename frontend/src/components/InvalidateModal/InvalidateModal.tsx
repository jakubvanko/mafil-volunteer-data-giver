import { Button, Grid, Modal, TextField, Typography } from "@mui/material";
import { Trans, useTranslation } from "react-i18next";
import { MainCard } from "../MainCard/MainCard";
import { useNavigate } from "react-router-dom";
import { ButtonPair } from "../ButtonPair/ButtonPair";
import { useState } from "react";
import { useUserContext } from "../UserContextProvider/UserContextProvider";

interface InvalidateModalProps {
  isModalOpen: boolean;
  setModalOpen: Function;
}

export const InvalidateModal = ({
  isModalOpen,
  setModalOpen,
}: InvalidateModalProps) => {
  const { t } = useTranslation();
  const [confirmationText, setConfirmationText] = useState<string>("");
  const navigate = useNavigate();
  const userContext = useUserContext();

  return (
    <Modal open={isModalOpen} onClose={() => setModalOpen(false)}>
      <Grid
        minHeight="100vh"
        container
        justifyContent="center"
        alignItems={{ xs: "stretch", sm: "center" }}
        onClick={(event) =>
          event.target === event.currentTarget && setModalOpen(false)
        }
      >
        <MainCard headingText={t("invalidate.headingText")}>
          <Typography variant="body1" sx={{ lineHeight: "2em" }}>
            <Trans
              i18nKey="invalidate.descriptionText"
              components={{
                bold: <b />,
              }}
            />
          </Typography>
          <TextField
            id="textfield-code"
            label={t("invalidate.textFieldLabel")}
            variant="filled"
            fullWidth
            value={confirmationText}
            onChange={(event) => setConfirmationText(event.target.value)}
          />
          <ButtonPair
            left={{
              component: (
                <Button
                  fullWidth
                  variant="outlined"
                  color="error"
                  disabled={
                    !["ano", "yes"].includes(confirmationText.toLowerCase())
                  }
                  onClick={() => {
                    userContext.deleteAccount();
                    navigate("../../deleted");
                  }}
                >
                  {t("user.buttonDisableUserText")}
                </Button>
              ),
              size: 6,
            }}
            right={{
              component: (
                <Button
                  fullWidth
                  variant="contained"
                  color="success"
                  onClick={() => setModalOpen(false)}
                >
                  {t("invalidate.buttonGoBack")}
                </Button>
              ),
              size: 6,
            }}
          />
        </MainCard>
      </Grid>
    </Modal>
  );
};
