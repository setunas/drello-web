import { Provider } from "react-redux";
import { store } from "src/redux/store";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import {
  fas,
  faHome,
  faPlus,
  faSignInAlt,
} from "@fortawesome/free-solid-svg-icons";
import { AppProps } from "next/dist/next-server/lib/router/router";

library.add(fab, fas, faHome, faPlus, faSignInAlt);

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
  }
  html, body, #__next {
    height: 100%;
    width: 100%;
  }
  body, #__next {
    font-family: "Trebuchet MS";
  }
  #__next {
    display: grid;
    grid-template-rows: 2fr 9fr 1fr;
    grid-gap: 1em;
  }
  a {
    text-decoration: none;
  }
`;

const theme = {
  colors: {
    primary: "#0070f3",
  },
};

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  );
}
