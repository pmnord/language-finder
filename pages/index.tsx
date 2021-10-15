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
          Watch The Film <em>JESUS</em> In Your Language
        </h1>

        <CommonLanguagesBanner />

        <AutoSuggest />

        <div className={styles.flagsContainer}>
          {Object.keys(countries).map((countryName) => {
            const country = countries[countryName];
            return (
              <Link
                key={country.name}
                href={`/c/${encodeURIComponent(countryName)}`}
              >
                <a className={styles.countryLink}>
                  <div className={styles.countryContainer}>
                    <img
                      className={styles.flag}
                      src={`/flags/${country.flagSvg}`}
                      alt={countryName}
                      title={country.fullName}
                    />
                    <span className={styles.flagLabel}>{country.name}</span>
                  </div>
                </a>
              </Link>
            );
          })}
        </div>
      </main>

      <footer className={styles.footer}>
        <Link href='/'>
          <a>Back to the Top ↑</a>
        </Link>
      </footer>
    </div>
  );
}
