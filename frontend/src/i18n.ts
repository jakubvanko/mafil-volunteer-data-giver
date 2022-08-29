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
    invalidSecret: "Failed to log in. Please try again.",
  },
  common: {
    buttonOutLinkText: "Go to the website of the MAFIL laboratory",
  },
  user: {
    buttonDownloadDataText: "Download data",
    buttonDisableUserText: "Invalidate my login link",
    buttonLogout: "Log out",
    headingText: "Download your data",
    loginLinkAvailability: "Login link valid until",
    downloadInfoText: `You can now download your data taken on {{visitDate}}. <br/>
    After pressing the button, a .zip file with your data will be downloaded to your computer. <br/>
    This .zip archive contains: <br/>
    • a browser with which you can view your medical data <br/>
    • your medical data <br/>
    The data will be imported to the image browser automatically after starting. <br/>
    Please note that the archive contains <bold>sensitive medical data</bold>. <br/>
    If you want to invalidate your login link and disable this account <linkDisable>click HERE</linkDisable>.
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
  invalidate: {
    headingText: "Invalidate login link",
    textFieldLabel: "Verification word",
    buttonGoBack: "Go back",
    descriptionText: `By invalidating the login link, you will immediately lose access to downloading your data. <br/>
    Invalidation of the login link <bold>CANNOT BE REVERSED</bold>. <br/>
    After invalidation, you will be immediately logged out of all devices. <br/>
    <br/>
    If you really want to invalidate your login link, type the word <bold>YES</bold> in the following field.
    `,
    confirmationText: "YES",
  },
};

const translationCz = {
  login: {
    headingText: "Přístup k vašim datům",
    description: "Pro přístup k vašim datům zadejte prosím své rodné číslo.",
    textFieldLabel: "Rodné číslo",
    buttonText: "Přihlásit se",
    invalidSecret: "Přihlášení se nezdařilo. Zkuste to prosím znovu.",
  },
  common: {
    buttonOutLinkText: "Přejít na webstránku laboratoře MAFIL",
  },
  user: {
    buttonDownloadDataText: "Stáhnout údaje",
    buttonDisableUserText: "Zneplatnit přihlašovací odkaz",
    buttonLogout: "Odhlásit se",
    headingText: "Stáhnout údaje",
    loginLinkAvailability: "Přihlašovací odkaz platný do",
    downloadInfoText: `Nyní si můžete stáhnout své údaje z vaší návštěvy dne {{visitDate}}. <br/>
    Po stisku tlačítka se vám do počítače stáhne soubor .zip s vašimi daty. <br/>
    Tento zip archiv obsahuje: <br/>
    • prohlížeč, pomocí kterého si můžete prohlédnout vaše medicínská data <br/>
    • vaše medicínská data <br/>
    Data se vám do prohlížeče nahrají automaticky při jeho spuštění. <br/>
    Berte prosím na vědomí, že se jedná o <bold>citlivé medicínské údaje</bold>. <br/>
    Pro zneplatnění přihlašovacího odkazu a tedy i tohoto účtu <linkDisable>klikněte ZDE</linkDisable>.
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
  invalidate: {
    headingText: "Zneplatnit přihlašovací odkaz",
    textFieldLabel: "Ověřovací slovo",
    buttonGoBack: "Vrátit se zpět",
    descriptionText: `Zneplatněním přihlašovacího odkazu ihned ztratíte přístup ke stažení dat. <br/>
    Zneplatnění přihlašovacího odkazu je <bold>NEVRATNÉ</bold>. <br/>
    Po zneplatnění budete okamžitě odhlášeni ze všech zařízení. <br/>
    <br/>
    Chcete-li opravdu zneplatnit svůj přihlašovací odkaz, napište do následujícího pole slovo <bold>ANO</bold>.
    `,
    confirmationText: "ANO",
  },
};

const translationSk = {
  login: {
    headingText: "Prístup k vašim dátam",
    description: "Pre prístup k vašim dátam prosím zadajte svoje rodné číslo.",
    textFieldLabel: "Rodné číslo",
    buttonText: "Prihlásiť sa",
    invalidSecret: "Prihlásenie zlyhalo. Skúste to znova.",
  },
  common: {
    buttonOutLinkText: "Prejsť na webstránku laboratória MAFIL",
  },
  user: {
    buttonDownloadDataText: "Stiahnuť údaje",
    buttonDisableUserText: "Zneplatniť prihlasovací odkaz",
    buttonLogout: "Odhlásiť sa",
    headingText: "Stiahnuť údaje",
    loginLinkAvailability: "Prihlasovací odkaz platný do",
    downloadInfoText: `Teraz si môžete stiahnuť svoje údaje z vašej návštevy dňa {{visitDate}}. <br/>
    Po stlačení tlačidla sa vám do počítača stiahne súbor .zip s vašimi dátami. <br/>
    Tento .zip archív obsahuje: <br/>
    • prehliadač, pomocou ktorého si môžete prezrieť vaše medicínske dáta <br/>
    • vaše medicínske dáta <br/>
    Dáta sa vám do prehliadača nahrajú automaticky pri jeho spustení. <br/>
    Berte prosím na vedomie, že sa jedná o <bold>citlivé medicínske údaje</bold>. <br/>
    Pre zneplatnenie prihlasovacieho odkazu a teda aj tohto účtu <linkDisable>kliknite TU</linkDisable>.
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
  invalidate: {
    headingText: "Zneplatniť prihlasovací odkaz",
    textFieldLabel: "Overovacie slovo",
    buttonGoBack: "Vrátiť sa späť",
    descriptionText: `Zneplatnením prihlasovacieho odkazu ihneď stratíte prístup k stiahnutiu dát. <br/>
    Zneplatnenie prihlasovacieho odkazu je <bold>NEVRATNÉ</bold>. <br/>
    Po zneplatnení budete okamžite odhlásení zo všetkých zariadení. <br/>
    <br/>
    Ak chcete naozaj zneplatniť svoj prihlasovací odkaz, napíšte do nasledujúceho poľa slovo <bold>ANO</bold>.
    `,
    confirmationText: "ANO",
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
