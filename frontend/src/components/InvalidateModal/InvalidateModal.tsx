import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { Trans, useTranslation } from "react-i18next";
import { MainCard } from "../MainCard/MainCard";
import { Link as RouterLink } from "react-router-dom";
import { ButtonPair } from "../ButtonPair/ButtonPair";

interface InvalidateModalProps {
  isModalOpen: boolean;
  setModalOpen: Function;
}

export const InvalidateModal = ({
  isModalOpen,
  setModalOpen,
}: InvalidateModalProps) => {
  const { t } = useTranslation();

  return (
    <Modal open={isModalOpen} onClose={() => setModalOpen(false)}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          outline: "none",
        }}
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
          />
          <ButtonPair
            first={{
              component: (
                <Button
                  component={RouterLink}
                  to="../deleted"
                  fullWidth
                  variant="outlined"
                  color="error"
                >
                  {t("user.buttonDisableUserText")}
                </Button>
              ),
              size: 6,
            }}
            second={{
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
      </Box>
    </Modal>
  );
};
