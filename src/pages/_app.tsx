import { Provider } from "react-redux";
import { store } from "src/utils/redux/store";
import { AppProps } from "next/dist/next-server/lib/router/router";
import { initFirebase } from "src/utils/firbase";
import { GlobalStyle } from "src/features/global-style";

initFirebase();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <GlobalStyle />
      <Component {...pageProps} />
    </Provider>
  );
}
