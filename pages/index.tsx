// import classes from '*.module.css';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import styles from '../styles/Home.module.scss';
import countries from '../data/countries.json';
import Link from 'next/link';

export default function Home() {
  const [state, setState] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setState(true);
    }, 5000);
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        {state && (
          <h1 onClick={() => setState(false)}>
            STATE IS NOW TRUE
            <br />
            click to set it back to false
          </h1>
        )}
        <header>HEADER</header>
        <h1>
          Dynamically import all the flag SVGs and map them to links to
          dynamically generated routes based on country names using the built-in
          JS method to turn a string into a valid path
        </h1>

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
          }}
        >
          {Object.keys(countries).map((countryName) => {
            const country = countries[countryName];
            return (
              <div key={country.id}>
                <Link href={`/${encodeURI(countryName)}`}>
                  <img
                    className={styles.flag}
                    src={country.flagSvg}
                    alt={countryName}
                    title={country.fullName}
                  />
                </Link>
              </div>
            );
          })}
        </div>
      </main>

      <footer className={styles.footer}>FOOTER</footer>
    </div>
  );
}
