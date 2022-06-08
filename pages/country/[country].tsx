import { GetServerSideProps, GetStaticPaths } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import React from 'react';
import countries from '../../data/countries.json';
import styles from '../../styles/CountryPage.module.scss';

interface Language {
  language: string;
  hyperlink: string;
  script: string;
}

interface Country {
  id: string;
  name: string;
  fullName: string;
  flagSvg: string;
  languages: Array<Language>;
  continents: Array<string>;
}

const CountryPage = ({ countryName }): JSX.Element => {
  // const router = useRouter();
  // let { country: countryName } = router.query;

  // if (Array.isArray(countryName)) countryName = countryName[0];

  countryName = decodeURI(countryName);

  const country: Country = countries[countryName];

  if (country === undefined) return null;

  return (
    <div className={styles.root}>
      <Head>
        <title>{country.name} - Watch the film JESUS in your language</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      {country.flagSvg !== '' && (
        <img
          className={styles.flag}
          src={`/flags/${country.flagSvg}`}
          alt={country.fullName}
          title={country.fullName}
        />
      )}
      {['Refugee', 'J-Immigrants'].includes(country.name) === false ? (
        <>
          <h1>{country.name}</h1>
          <h2>Select your language</h2>
        </>
      ) : (
        <h1>Select your language</h1>
      )}
      <div className={styles.languagesContainer}>
        <ul>
          {country.languages &&
            country.languages.map((language) => (
              <li key={language.language}>
                <Link href={language.hyperlink}>
                  <a>
                    {language.language}
                    <br />
                    {language.script.length > 0 &&
                      language.script.toLowerCase() !== 'english' &&
                      `${language.script}`}
                  </a>
                </Link>
              </li>
            ))}
          <li aria-hidden>
            <br />
          </li>
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

export const getStaticProps: GetServerSideProps = async ({ params }) => {
  return {
    props: {
      countryName: params.country,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    fallback: 'blocking',
    paths: Object.keys(countries).map((countryName) => ({
      params: {
        country: countryName,
      },
    })),
  };
};

export default CountryPage;
