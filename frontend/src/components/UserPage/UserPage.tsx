import { Button, Link, Typography } from "@mui/material";
import { Trans, useTranslation } from "react-i18next";
import { MainCard } from "../MainCard/MainCard";
import { MainPageContainer } from "../MainPageContainer/MainPageContainer";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { InvalidateModal } from "../InvalidateModal/InvalidateModal";
import { ButtonPair } from "../ButtonPair/ButtonPair";
import { useUserContext } from "../UserContextProvider/UserContextProvider";

export const UserPage = () => {
  const { t } = useTranslation();
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const userContext = useUserContext();

  useEffect(() => {
    if (userContext.id === undefined && !userContext.isReloadPending) {
      navigate("../error");
    }
  }, [userContext, navigate]);

  return (
    <MainPageContainer>
      <MainCard
        headingText={t("user.headingText")}
        secondaryHeadingElement={
          <Typography variant="body2">
            {t("user.loginLinkAvailability")}{" "}
            {userContext.expirationDate &&
              userContext.expirationDate
                .toLocaleDateString("cs-CZ")
                .replaceAll(" ", "")}
          </Typography>
        }
      >
        <Typography variant="body1" sx={{ lineHeight: "2em" }}>
          <Trans
            values={{
              visitDate:
                userContext.visitDate &&
                userContext.visitDate
                  .toLocaleDateString("cs-CZ")
                  .replaceAll(" ", ""),
            }}
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
          left={{
            component: (
              <Button
                fullWidth
                variant="contained"
                color="success"
                onClick={async () => await userContext.downloadData()}
              >
                {t("user.buttonDownloadDataText")} (
                {userContext.dataSize && userContext.dataSize!.toFixed(2)} GB)
              </Button>
            ),
            size: 8,
          }}
          right={{
            component: (
              <Button
                fullWidth
                variant="outlined"
                color="error"
                onClick={() => {
                  userContext.logout();
                  navigate("../logout", { replace: true });
                }}
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
