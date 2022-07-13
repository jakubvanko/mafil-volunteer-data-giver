import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const translationEn = {
  login: {
    headingText: "Access your data",
    description:
      "To access your data, please enter your social security number.",
    textFieldLabel: "Social security number",
    buttonText: "Log in",
  },
  common: {
    buttonOutLinkText: "Go to the website of the MAFIL laboratory",
  },
  user: {
    buttonDownloadDataText: "Download data",
    buttonDisableUserText: "Invalidate my login link",
    headingText: "Download your data",
    loginLinkAvailability: "Login link valid until",
    downloadInfoText: `Now you can download your data by clicking the green button. <br/>
        After pressing the button, a .zip file with your data will be downloaded to your computer. <br/>
        This .zip archive contains: <br/>
        • a browser with which you can view your medical data <br/>
        • your medical data <br/>
        To view detailed instructions on how to view your data <link1>click HERE</link1>. <br/>
        Please note that the archive contains <bold>sensitive medical data</bold>. <br/>
        If you want to invalidate your login link, you can do so by clicking the red button. <br/>
        <bold>To log out, simply close this website or <link2>click HERE</link2>.</bold>
    `,
  },
  error: {
    headingText: "Error 404",
    descriptionText: "The specified page does not exist or has been removed.",
  },
  deleted: {
    headingText: "Your login link has been invalidated",
    descriptionText:
      "Your login link has been invalidated. Thank you for participating in our study.",
  },
  logout: {
    headingText: "You have been logged out",
    descriptionText:
      "You have been successfully logged out. You can now safely leave the website.",
  },
};

const translationCz = {
  login: {
    headingText: "Přístup k vašim datům",
    description: "Pro přístup k vašim datům zadejte prosím své rodné číslo.",
    textFieldLabel: "Rodné číslo",
    buttonText: "Přihlásit se",
  },
  common: {
    buttonOutLinkText: "Přejít na webstránku laboratoře MAFIL",
  },
  user: {
    buttonDownloadDataText: "Stáhnout údaje",
    buttonDisableUserText: "Zneplatnit přihlašovací odkaz",
    headingText: "Stáhnout údaje",
    loginLinkAvailability: "Přihlašovací link platný do",
    downloadInfoText: `Nyní si můžete stáhnout své údaje klepnutím na zelené tlačítko. <br/>
    Po stisku tlačítka se vám do počítače stáhne soubor .zip s vašimi daty. <br/>
    Tento zip archiv obsahuje: <br/>
    • prohlížeč, pomocí kterého si můžete prohlédnout vaše medicínská data <br/>
    • vaše medicínská data <br/>
    Pro zobrazení podrobného návodu jak si zobrazit svá data <link1>klikněte ZDE</link1>. <br/>
    Berte prosím na vědomí, že se jedná o <bold>citlivé medicínské údaje</bold>. <br/>
    V případě, že chcete zneplatit svůj přihlašovací odkaz, můžete tak učinit kliknutím na červené tlačítko. <br/>
    <bold>Chcete-li se odhlásit, jednoduše zavřete tuto webstránku nebo <link2>klikněte ZDE</link2>.</bold>
    `,
  },
  error: {
    headingText: "Chyba 404",
    descriptionText: "Zadaná stránka neexistuje nebo byla odstraněna.",
  },
  deleted: {
    headingText: "Váš přihlašovací odkaz byl zneplatněn",
    descriptionText:
      "Váš přihlašovací odkaz byl zneplatněn. Děkujeme za účast v naší studii.",
  },
  logout: {
    headingText: "Byli jste odhlášeni",
    descriptionText:
      "Byli jste úspěšně odhlášeni. Nyní můžete webovou stránku bezpečně opustit.",
  },
};

const translationSk = {
  login: {
    headingText: "Prístup k vašim dátam",
    description: "Pre prístup k vašim dátam prosím zadajte svoje rodné číslo.",
    textFieldLabel: "Rodné číslo",
    buttonText: "Prihlásiť sa",
  },
  common: {
    buttonOutLinkText: "Prejsť na webstránku laboratória MAFIL",
  },
  user: {
    buttonDownloadDataText: "Stiahnuť údaje",
    buttonDisableUserText: "Zneplatniť prihlasovací odkaz",
    headingText: "Stiahnuť údaje",
    loginLinkAvailability: "Prihlasovací link platný do",
    downloadInfoText: `Teraz si môžete stiahnuť svoje údaje kliknutím na zelené tlačidlo. <br/>
    Po stlačení tlačidla sa vám do počítača stiahne súbor .zip s vašimi dátami. <br/>
    Tento .zip archív obsahuje: <br/>
    • prehliadač, pomocou ktorého si môžete prezrieť vaše medicínske dáta <br/>
    • vaše medicínske dáta <br/>
    Pre zobrazenie podrobného návodu ako si zobraziť svoje dáta <link1>kliknite TU</link1>. <br/>
    Berte prosím na vedomie, že sa jedná o <bold>citlivé medicínske údaje</bold>. <br/>
    V prípade ak chcete zneplatiť svoj prihlasovací odkaz, môžete tak urobiť kliknutím na červené tlačidlo. <br/>
    <bold>Ak sa chcete odhlásiť, jednoducho zatvorte túto webstránku alebo <link2>kliknite TU</link2>.</bold>
    `,
  },
  error: {
    headingText: "Chyba 404",
    descriptionText: "Zadaná stránka neexistuje alebo bola odstránená.",
  },
  deleted: {
    headingText: "Váš prihlasovací odkaz bol zneplatnený",
    descriptionText:
      "Váš prihlasovací odkaz bol zneplatnený. Ďakujeme za účasť v našej štúdii.",
  },
  logout: {
    headingText: "Boli ste odhlásení",
    descriptionText:
      "Boli ste úspešne odhlásení. Teraz môžete webstránku bezpečne opustiť.",
  },
};

export const applyLocalization = () =>
  i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      debug: true,
      fallbackLng: "cz",
      interpolation: {
        escapeValue: false,
      },
      resources: {
        en: {
          translation: translationEn,
        },
        sk: {
          translation: translationSk,
        },
        cz: {
          translation: translationCz,
        },
      },
    });
