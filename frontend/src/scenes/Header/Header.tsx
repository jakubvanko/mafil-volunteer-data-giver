import {
  AppBar,
  Breadcrumbs,
  SvgIcon,
  Toolbar,
  Link,
  Stack,
} from "@mui/material";
import { SK, CZ, GB } from "country-flag-icons/react/3x2";

export const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          width={"100%"}
        >
          <img
            src="https://mafil.ceitec.cz/files/287/thumb/157-logo-mafil-transp2-0x0.png"
            height={40}
            alt="Mafil-Ceitec logo"
          />
          <Breadcrumbs aria-label="breadcrumb">
            <Link
              component="button"
              underline="hover"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "5px",
              }}
              color="white"
            >
              <SvgIcon>
                <SK />
              </SvgIcon>
              Slovenčina
            </Link>
            <Link
              component="button"
              underline="hover"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "5px",
              }}
              color="white"
            >
              <SvgIcon>
                <CZ />
              </SvgIcon>
              Čeština
            </Link>
            <Link
              component="button"
              underline="hover"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "5px",
              }}
              color="white"
            >
              <SvgIcon>
                <GB />
              </SvgIcon>
              English
            </Link>
          </Breadcrumbs>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};
