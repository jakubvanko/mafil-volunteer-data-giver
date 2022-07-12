import { PropsWithChildren } from "react";
import { Divider, Paper, Typography, Box, Stack } from "@mui/material";

interface MainCardProps {
  headingText: string;
}

export const MainCard = ({
  headingText,
  children,
}: PropsWithChildren<MainCardProps>) => {
  return (
    <Paper elevation={5}>
      <Box padding={"30px 40px;"}>
        <Typography variant="h5">
          <b>{headingText}</b>
        </Typography>
      </Box>
      <Divider />
      <Stack spacing={2.5} padding={"25px 40px 40px 40px"}>
        {children}
      </Stack>
    </Paper>
  );
};
