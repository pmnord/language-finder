// import classes from '*.module.css';
import Head from 'next/head';
import styles from '../styles/index.module.scss';
import countries from '../data/countries.json';
import Link from 'next/link';
import AutoSuggest from '../components/AutoSuggest';
import CommonLanguagesBanner from '../components/CommonLanguages';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Watch the film JESUS in your language</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        <h1>
          Watch the film <em>JESUS</em> in your language
        </h1>

        <CommonLanguagesBanner />
        <span>&nbsp;</span>
        <span>&nbsp;</span>

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
                    src={`flags/${country.flagSvg}`}
                    alt={countryName}
                    title={country.fullName}
                  />
                </Link>
              </div>
            );
          })}
        </div>
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
}
