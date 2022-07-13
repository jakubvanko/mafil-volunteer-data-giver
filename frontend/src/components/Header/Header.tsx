import {
  AppBar,
  Breadcrumbs,
  SvgIcon,
  Toolbar,
  Link,
  Stack,
} from "@mui/material";
import { SK, CZ, GB, FlagComponent } from "country-flag-icons/react/3x2";
import { useTranslation } from "react-i18next";

interface LanguageBreadcrumbButtonProps {
  languageName: string;
  languageLabel: string;
  LanguageFlag: FlagComponent;
}

const LanguageBreadcrumbButton = ({
  languageName,
  languageLabel,
  LanguageFlag,
}: LanguageBreadcrumbButtonProps) => {
  const { i18n } = useTranslation();

  return (
    <Link
      component="button"
      underline={i18n.resolvedLanguage === languageLabel ? "always" : "hover"}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: "5px",
        textDecorationColor: "inherit",
      }}
      color="#fff"
      onClick={() => i18n.changeLanguage(languageLabel)}
    >
      <SvgIcon>
        <LanguageFlag />
      </SvgIcon>
      {languageName}
    </Link>
  );
};

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
            <LanguageBreadcrumbButton
              languageName="Čeština"
              languageLabel="cz"
              LanguageFlag={CZ}
            />
            <LanguageBreadcrumbButton
              languageName="Slovenčina"
              languageLabel="sk"
              LanguageFlag={SK}
            />
            <LanguageBreadcrumbButton
              languageName="English"
              languageLabel="en"
              LanguageFlag={GB}
            />
          </Breadcrumbs>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};
