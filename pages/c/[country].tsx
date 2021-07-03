import React from 'react';
import { useRouter } from 'next/router';
import styles from '../../styles/Country.module.scss';

const CountryPage = () => {
  const router = useRouter();
  const { country } = router.query;

  return (
    <div className={styles.root}>
      <h1>{country}</h1>
      <div className={styles.languagesContainer}>
        <h2>Select your language below</h2>
      </div>
    </div>
  );
};

CountryPage.propTypes = {};

export default CountryPage;
