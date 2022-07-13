import { Button, Link, Stack, Typography, Box } from "@mui/material";
import { Trans, useTranslation } from "react-i18next";
import { MainCard } from "../MainCard/MainCard";
import { MainPageContainer } from "../MainPageContainer/MainPageContainer";

export const UserPage = () => {
  const { t } = useTranslation();

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
              link2: <Link href="" />,
            }}
          />
        </Typography>
        <Stack direction="row" spacing={3}>
          <Box width={"100%"}>
            <Button fullWidth variant="contained" color="success">
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
                minWidth: "18vw",
              }}
            >
              {t("user.buttonDisableUserText")}
            </Button>
          </Box>
        </Stack>
      </MainCard>
    </MainPageContainer>
  );
};
