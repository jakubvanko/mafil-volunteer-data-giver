import { Button, Link, Stack, Typography, Box } from "@mui/material";
import { MainCard } from "../MainCard/MainCard";
import { MainPageContainer } from "../MainPageContainer/MainPageContainer";

export const UserPage = () => {
  return (
    <MainPageContainer>
      <MainCard headingText="Stiahnuť údaje">
        <Typography variant="body1" sx={{ lineHeight: "2em" }}>
          Teraz si môžete stiahnuť svoje údaje kliknutím na zelené tlačidlo.
          <br />
          Po stlačení tlačidla sa vám do počítača stiahne súbor .zip s vašimi
          dátami. <br />
          Tento .zip archív obsahuje: <br />• prehliadač, pomocou ktorého si
          môžete prezrieť vaše medicínske dáta <br />
          • vaše medicínske dáta <br />
          Pre zobrazenie podrobného návodu ako si zobraziť svoje dáta{" "}
          <Link>kliknite TU</Link>. <br />
          Berte prosím na vedomie, že sa jedná o{" "}
          <b color="danger">citlivé medicínske údaje.</b>
          <br />V prípade ak chcete zneplatiť svoj prihlasovací odkaz, môžete
          tak urobiť kliknutím na červené tlačidlo.
        </Typography>
        <Stack direction="row" spacing={3}>
          <Box width={"100%"}>
            <Button fullWidth variant="contained" color="success">
              Stiahnuť údaje
            </Button>
          </Box>
          <Box minWidth={"fit-content"}>
            <Button
              fullWidth
              variant="outlined"
              color="error"
              sx={{ width: "fit-content", whiteSpace: "nowrap" }}
            >
              Zneplatniť prihlasovací odkaz
            </Button>
          </Box>
        </Stack>
      </MainCard>
    </MainPageContainer>
  );
};
