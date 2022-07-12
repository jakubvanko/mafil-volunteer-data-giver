import { Grid } from "@mui/material";
import { PropsWithChildren } from "react";

export const MainPageContainer = ({ children }: PropsWithChildren) => {
  return (
    <Grid
      minHeight={"calc(100vh - 64px)"}
      container
      justifyContent="center"
      alignItems="center"
      paddingBottom={"calc(64px)"}
    >
      {children}
    </Grid>
  );
};
