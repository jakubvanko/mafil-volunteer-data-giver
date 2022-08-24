import { Grid } from "@mui/material";

interface ButtonPairProps {
  first: {
    component: React.ReactNode;
    size: number;
  };
  second: {
    component: React.ReactNode;
    size: number;
  };
}

export const ButtonPair = ({ first, second }: ButtonPairProps) => {
  return (
    <Grid container justifyContent="space-between" rowSpacing={0}>
      <Grid
        item
        xs={12}
        sm={first.size}
        paddingRight={{ xs: 0, sm: 1 }}
        paddingBottom={{ xs: 1, sm: 0 }}
      >
        {first.component}
      </Grid>
      <Grid
        item
        xs={12}
        sm={second.size}
        paddingLeft={{ xs: 0, sm: 1 }}
        paddingTop={{ xs: 1, sm: 0 }}
      >
        {second.component}
      </Grid>
    </Grid>
  );
};
