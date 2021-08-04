import Link from 'next/link';
import React from 'react';
import styles from '../styles/Nav.module.scss';
import Image from 'next/image';

const Nav = (): JSX.Element => {
  return (
    <nav className={styles.nav}>
      <div className={styles.bannerContainer}>
        <Link href='/'>
          <a>
            <Image
              height='170'
              width='1060'
              src='/header.jpg'
              alt='Learn More About Jesus Christ'
            />
          </a>
        </Link>
      </div>
    </nav>
  );
};

export default Nav;
