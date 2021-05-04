// import classes from '*.module.css';
import Head from 'next/head';
import styles from '../styles/Home.module.scss';
import countries from '../data/countries.json';
import Link from 'next/link';
import AutoSuggest from '../components/AutoSuggest';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <header>HEADER</header>

        <AutoSuggest />

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
                <Link href={`/c/${encodeURIComponent(countryName)}`}>
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
