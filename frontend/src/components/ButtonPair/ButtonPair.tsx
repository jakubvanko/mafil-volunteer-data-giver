import { Grid } from "@mui/material";

interface ButtonPairProps {
  left: {
    component: React.ReactNode;
    size: number;
  };
  right: {
    component: React.ReactNode;
    size: number;
  };
}

export const ButtonPair = ({ left, right }: ButtonPairProps) => (
  <Grid container>
    <Grid
      item
      xs={12}
      sm={left.size}
      paddingRight={{ xs: 0, sm: 1 }}
      paddingBottom={{ xs: 1, sm: 0 }}
    >
      {left.component}
    </Grid>
    <Grid
      item
      xs={12}
      sm={right.size}
      paddingLeft={{ xs: 0, sm: 1 }}
      paddingTop={{ xs: 1, sm: 0 }}
    >
      {right.component}
    </Grid>
  </Grid>
);
