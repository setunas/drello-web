import { Provider } from "react-redux";
import { store } from "src/utils/redux/store";
import { ThemeProvider } from "styled-components";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import {
  fas,
  faHome,
  faPlus,
  faSignInAlt,
  faTimes,
  faStar,
  faCog,
} from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { AppProps } from "next/dist/next-server/lib/router/router";
import { initFirebase } from "src/utils/firbase";
import { GlobalStyle } from "src/features/global-style";

library.add(fab, fas, far, faHome, faPlus, faSignInAlt, faTimes, faStar, faCog);
initFirebase();

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
