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
              width={1440}
              height={500}
              src='/jesus-hd.jpg'
              alt='Learn More About Jesus Christ'
            />
          </a>
        </Link>
      </div>
    </nav>
  );
};

export default Nav;
