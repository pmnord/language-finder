import { AppProps } from 'next/app';
import Nav from '../components/Nav';
import '../styles/globals.css';

function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Nav />
      <Component {...pageProps} />
    </div>
  );
}

export default App;
