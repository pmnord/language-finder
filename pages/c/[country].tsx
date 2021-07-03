import React from 'react';
import { useRouter } from 'next/router';
import styles from '../../styles/Country.module.scss';
import Head from 'next/head';

const CountryPage = () => {
  const router = useRouter();
  const { country } = router.query;

  return (
    <div className={styles.root}>
      <Head>
        <title>{country} - Watch the film JESUS in your language</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <h1>{country}</h1>
      <div className={styles.languagesContainer}>
        <h2>Select your language below</h2>
      </div>
    </div>
  );
};

CountryPage.propTypes = {};

export default CountryPage;
