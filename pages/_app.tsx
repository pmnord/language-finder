import { AppProps } from "next/app";
import Head from "next/head";
import "../styles/globals.css";

function App({ Component, pageProps }: AppProps) {
  const title = `Watch the film JESUS in your language`;
  const url = `https://freejesusfilm.netlify.app/`;

  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:title" content={title} />
        <meta property="og:url" content={url} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/site-image.jpg" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default App;
