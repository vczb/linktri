import { SaguGlobalStyles, SaguProvider, theme } from "sagu-ui";

function MyApp({ Component, pageProps }) {
  return (
    <SaguProvider theme={theme}>
      <SaguGlobalStyles />
      <Component {...pageProps} />
    </SaguProvider>
  );
}

export default MyApp;
