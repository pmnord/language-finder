import Link from 'next/link';
import React from 'react';
import styles from '../styles/Nav.module.scss';

const Nav = () => {
  return (
    <nav className={styles.nav}>
      <div className='header-container'>
        <Link href='/'>
          <picture>
            {/* <!-- The browser will use the first compatible source --> */}
            <source type='image/avif' srcSet='header.avif' />
            <source type='image/webp' srcSet='header.webp' />
            <img src='header.jpg' alt='Learn More About Jesus Christ' />
          </picture>
        </Link>
      </div>
    </nav>
  );
};

export default Nav;
