import { Grid } from "@mui/material";
import { PropsWithChildren } from "react";

export const MainPageContainer = ({ children }: PropsWithChildren) => {
  return (
    <Grid
      minHeight={{ xs: "calc(100vh - 112px)", sm: "calc(100vh - 64px)" }}
      container
      justifyContent="center"
      alignItems={{ xs: "stretch", sm: "center" }}
      paddingBottom={{ xs: 0, sm: "64px" }}
    >
      {children}
    </Grid>
  );
};
