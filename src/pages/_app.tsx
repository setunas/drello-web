import { createGlobalStyle, ThemeProvider } from "styled-components";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import {
  fas,
  faHome,
  faPlus,
  faSignInAlt,
} from "@fortawesome/free-solid-svg-icons";

library.add(fab, fas, faHome, faPlus, faSignInAlt);

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  html, body, #__next {
    height: 100%;
    width: 100%;
  }
  body, #__next {
    margin: 0;
    padding: 0;
    font-family: "Trebuchet MS";
  }
  #__next {
    padding: 1em;
    display: grid;
    grid-template-rows: 10em auto 3em;
    grid-template-columns: repeat(12, fr);
    grid-gap: 1em;
  }
`;

const theme = {
  colors: {
    primary: "#0070f3",
  },
};

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}