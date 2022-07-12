import { Button, Typography } from "@mui/material";
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
  return (
    <MainPageContainer>
      <MainCard headingText={headingText}>
        <Typography variant="body1">{descriptionText}</Typography>
        <Button fullWidth variant="contained">
          Prejsť na webstránku laboratória mafil
        </Button>
      </MainCard>
    </MainPageContainer>
  );
};
