import {
  Button,
  Link,
  Stack,
  Typography,
  Box,
  Modal,
  TextField,
} from "@mui/material";
import { Trans, useTranslation } from "react-i18next";
import { MainCard } from "../MainCard/MainCard";
import { MainPageContainer } from "../MainPageContainer/MainPageContainer";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useState } from "react";

export const UserPage = () => {
  const { t } = useTranslation();
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  return (
    <MainPageContainer>
      <MainCard
        headingText={t("user.headingText")}
        secondaryHeadingElement={
          <Typography variant="body2">
            {t("user.loginLinkAvailability")} XX.XX.XXXX
          </Typography>
        }
      >
        <Typography variant="body1" sx={{ lineHeight: "2em" }}>
          <Trans
            i18nKey="user.downloadInfoText"
            components={{
              bold: <b />,
              link1: <Link href="" />,
              link2: (
                <Link
                  onClick={() => setModalOpen(true)}
                  sx={{ cursor: "pointer" }}
                />
              ),
            }}
          />
        </Typography>
        <Stack direction="row" spacing={3}>
          <Box width={"100%"}>
            <Button
              fullWidth
              variant="contained"
              color="success"
              href="path_to_file"
              download="User_anatomical_14_1_2022"
            >
              {t("user.buttonDownloadDataText")}
            </Button>
          </Box>
          <Box>
            <Button
              fullWidth
              variant="outlined"
              color="error"
              sx={{
                width: "fit-content",
                whiteSpace: "nowrap",
                minWidth: "19em",
              }}
              onClick={() => navigate("../logout", { replace: true })}
            >
              {t("user.buttonLogout")}
            </Button>
          </Box>
        </Stack>
      </MainCard>
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
            <Stack direction="row" spacing={3}>
              <Box width={"100%"}>
                <Button
                  component={RouterLink}
                  to="../deleted"
                  fullWidth
                  variant="outlined"
                  color="error"
                >
                  {t("user.buttonDisableUserText")}
                </Button>
              </Box>
              <Box>
                <Button
                  fullWidth
                  variant="contained"
                  color="success"
                  sx={{
                    width: "fit-content",
                    whiteSpace: "nowrap",
                    minWidth: "19em",
                  }}
                  onClick={() => setModalOpen(false)}
                >
                  {t("invalidate.buttonGoBack")}
                </Button>
              </Box>
            </Stack>
          </MainCard>
        </Box>
      </Modal>
    </MainPageContainer>
  );
};
