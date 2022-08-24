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
    <Paper
      elevation={5}
      sx={{
        width: { xs: "100%", sm: "initial" },
        minHeight: { xs: "100%", sm: "initial" },
      }}
    >
      <Stack
        padding={{ xs: "30px 20px", sm: "30px 40px" }}
        justifyContent="space-between"
        alignItems="center"
        spacing={{ xs: 2, sm: 0 }}
        direction={{ xs: "column", sm: "row" }}
        width="100%"
      >
        <Typography variant="h5">
          <b>{headingText}</b>
        </Typography>
        {secondaryHeadingElement && secondaryHeadingElement}
      </Stack>
      <Divider />
      <Stack
        spacing={3}
        padding={{ xs: "25px 20px 40px 20px", sm: "25px 40px 40px 40px" }}
      >
        {children}
      </Stack>
    </Paper>
  );
};
