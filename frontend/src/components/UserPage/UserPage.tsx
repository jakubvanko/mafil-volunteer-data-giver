import { Button, Link, Typography } from "@mui/material";
import { Trans, useTranslation } from "react-i18next";
import { MainCard } from "../MainCard/MainCard";
import { MainPageContainer } from "../MainPageContainer/MainPageContainer";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { InvalidateModal } from "../InvalidateModal/InvalidateModal";
import { ButtonPair } from "../ButtonPair/ButtonPair";
import { UserDetails } from "../../scripts/api";

interface UserPageProps {
  userDetails: UserDetails | undefined;
  logoutFunction: Function;
  downloadUserDataFunction: Function;
  invalidateFunction: (token: string, secret: string) => Promise<void>;
}

export const UserPage = ({
  userDetails,
  logoutFunction,
  downloadUserDataFunction,
  invalidateFunction,
}: UserPageProps) => {
  const { t } = useTranslation();
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  if (!userDetails) {
    navigate("../../error");
  }

  return (
    <MainPageContainer>
      <MainCard
        headingText={t("user.headingText")}
        secondaryHeadingElement={
          <Typography variant="body2">
            {t("user.loginLinkAvailability")}{" "}
            {userDetails &&
              userDetails.expirationDate
                .toLocaleDateString("cs-CZ")
                .replaceAll(" ", "")}
          </Typography>
        }
      >
        <Typography variant="body1" sx={{ lineHeight: "2em" }}>
          <Trans
            values={{
              visitDate:
                userDetails &&
                userDetails.visitDate
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
          first={{
            component: (
              <Button
                fullWidth
                variant="contained"
                color="success"
                onClick={async () => await downloadUserDataFunction()}
              >
                {t("user.buttonDownloadDataText")} (
                {userDetails && userDetails.dataSize.toFixed(2)} GB)
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
                onClick={() => {
                  logoutFunction();
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
      <InvalidateModal
        isModalOpen={isModalOpen}
        setModalOpen={setModalOpen}
        invalidateFunction={invalidateFunction}
      />
    </MainPageContainer>
  );
};
