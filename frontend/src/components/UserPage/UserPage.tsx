import { Button, Link, Typography } from "@mui/material";
import { Trans, useTranslation } from "react-i18next";
import { MainCard } from "../MainCard/MainCard";
import { MainPageContainer } from "../MainPageContainer/MainPageContainer";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { InvalidateModal } from "../InvalidateModal/InvalidateModal";
import { ButtonPair } from "../ButtonPair/ButtonPair";

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
            values={{ visitDate: "XX.XX.XXXX" }}
            i18nKey="user.downloadInfoText"
            components={{
              bold: <b />,
              linkDisable: (
                <Link
                  onClick={() => setModalOpen(true)}
                  sx={{ cursor: "pointer" }}
                />
              ),
            }}
          />
        </Typography>
        <ButtonPair
          first={{
            component: (
              <Button
                fullWidth
                variant="contained"
                color="success"
                href="path_to_file"
                download="User_anatomical_14_1_2022"
              >
                {t("user.buttonDownloadDataText")}
              </Button>
            ),
            size: 8,
          }}
          second={{
            component: (
              <Button
                fullWidth
                variant="outlined"
                color="error"
                onClick={() => navigate("../logout", { replace: true })}
              >
                {t("user.buttonLogout")}
              </Button>
            ),
            size: 4,
          }}
        />
      </MainCard>
      <InvalidateModal isModalOpen={isModalOpen} setModalOpen={setModalOpen} />
    </MainPageContainer>
  );
};
