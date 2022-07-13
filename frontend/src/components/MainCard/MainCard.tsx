import { PropsWithChildren } from "react";
import { Divider, Paper, Typography, Stack } from "@mui/material";

interface MainCardProps {
  headingText: string;
  secondaryHeadingElement?: React.ReactNode;
}

export const MainCard = ({
  headingText,
  secondaryHeadingElement,
  children,
}: PropsWithChildren<MainCardProps>) => {
  return (
    <Paper elevation={5}>
      <Stack
        padding={"30px 40px;"}
        justifyContent="space-between"
        alignItems="center"
        direction="row"
        width={"100%"}
      >
        <Typography variant="h5">
          <b>{headingText}</b>
        </Typography>
        {secondaryHeadingElement && secondaryHeadingElement}
      </Stack>
      <Divider />
      <Stack spacing={3} padding={"25px 40px 40px 40px"}>
        {children}
      </Stack>
    </Paper>
  );
};
