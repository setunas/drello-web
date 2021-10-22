import { Provider } from "react-redux";
import { store } from "src/redux/store";
import { ThemeProvider } from "styled-components";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import {
  fas,
  faHome,
  faPlus,
  faSignInAlt,
} from "@fortawesome/free-solid-svg-icons";
import { AppProps } from "next/dist/next-server/lib/router/router";
import { initFirebase } from "src/utils/firbase";
import { GlobalStyle } from "src/components/global-style";

initFirebase();
library.add(fab, fas, faHome, faPlus, faSignInAlt);

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
