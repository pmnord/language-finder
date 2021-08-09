import React from 'react';
import { useRouter } from 'next/router';
import styles from '../../styles/Country.module.scss';
import Head from 'next/head';
import countries from '../../data/countries.json';
import Link from 'next/link';

interface Language {
  language: string;
  hyperlink: string;
}

interface Country {
  id: string;
  name: string;
  fullName: string;
  flagSvg: string;
  languages: Array<Language>;
  continents: Array<string>;
}

const CountryPage = (): JSX.Element => {
  const router = useRouter();
  let { country: countryName } = router.query;

  if (Array.isArray(countryName)) countryName = countryName[0];

  countryName = decodeURI(countryName);

  const country: Country = countries[countryName];

  if (country === undefined) return null;
  console.log(country);
  return (
    <div className={styles.root}>
      <Head>
        <title>{country.name} - Watch the film JESUS in your language</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <img
        className={styles.flag}
        src={`/flags/${country.flagSvg}`}
        alt={country.fullName}
        title={country.fullName}
      />
      <h1>{country.name}</h1>
      <div className={styles.languagesContainer}>
        <h2>Select your language below</h2>
        <ul>
          {country.languages &&
            country.languages.map((language) => (
              <li key={language.language}>
                <Link href={language.hyperlink}>
                  <a>{language.language}</a>
                </Link>
              </li>
            ))}
        </ul>
      </div>
      <div className={styles.backLinkContainer}>
        <Link href='/'>
          <a>↩&nbsp;&nbsp;Back to Country List</a>
        </Link>
      </div>
    </div>
  );
};

export default CountryPage;
