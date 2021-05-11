import Link from 'next/link';
import React from 'react';
import styles from '../styles/Nav.module.scss';

const Nav = () => {
  return (
    <nav className={styles.nav}>
      <Link href='/'>Header/Home</Link>
    </nav>
  );
};

export default Nav;
