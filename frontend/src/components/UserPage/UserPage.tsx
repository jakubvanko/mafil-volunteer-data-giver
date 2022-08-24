import { Button, Link, Typography, Grid } from "@mui/material";
import { Trans, useTranslation } from "react-i18next";
import { MainCard } from "../MainCard/MainCard";
import { MainPageContainer } from "../MainPageContainer/MainPageContainer";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { InvalidateModal } from "../InvalidateModal/InvalidateModal";

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
        <Grid container justifyContent="space-between" rowSpacing={0}>
          <Grid
            item
            xs={12}
            sm={8}
            paddingRight={{ xs: 0, sm: 1 }}
            paddingBottom={{ xs: 1, sm: 0 }}
          >
            <Button
              fullWidth
              variant="contained"
              color="success"
              href="path_to_file"
              download="User_anatomical_14_1_2022"
            >
              {t("user.buttonDownloadDataText")}
            </Button>
          </Grid>
          <Grid
            item
            xs={12}
            sm={4}
            paddingLeft={{ xs: 0, sm: 1 }}
            paddingTop={{ xs: 1, sm: 0 }}
          >
            <Button
              fullWidth
              variant="outlined"
              color="error"
              onClick={() => navigate("../logout", { replace: true })}
            >
              {t("user.buttonLogout")}
            </Button>
          </Grid>
        </Grid>
      </MainCard>
      <InvalidateModal isModalOpen={isModalOpen} setModalOpen={setModalOpen} />
    </MainPageContainer>
  );
};
