import { Button, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { MainCard } from "../../components/MainCard/MainCard";
import { MainPageContainer } from "../MainPageContainer/MainPageContainer";

interface BasicMessagePageProps {
  headingText: string;
  descriptionText: string;
}

export const BasicMessagePage = ({
  headingText,
  descriptionText,
}: BasicMessagePageProps) => {
  const { t } = useTranslation();

  return (
    <MainPageContainer>
      <MainCard headingText={headingText}>
        <Typography variant="body1">{descriptionText}</Typography>
        <Button
          fullWidth
          variant="contained"
          href="https://mafil.ceitec.cz/"
          rel="noopener noreferrer"
        >
          {t("common.buttonOutLinkText")}
        </Button>
      </MainCard>
    </MainPageContainer>
  );
};
