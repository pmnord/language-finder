import React from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import Link from 'next/link';

const CountryPage = (props) => {
  const router = useRouter();
  const { country } = router.query;

  return (
    <div style={{ textAlign: 'center', fontSize: '1.5rem', marginTop: '3rem' }}>
      This is the country page for <strong>{country}</strong>
    </div>
  );
};

CountryPage.propTypes = {};

export default CountryPage;
