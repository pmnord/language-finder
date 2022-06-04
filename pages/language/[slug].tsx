import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import React from 'react';
import languagePagesData from '../../data/json/language-pages.json';
import styles from '../../styles/VideoPage.module.scss';

interface LanguagePageData {
  language: string;
  script: string;
  videoEmbedSource: string;
  videoEmbedCode: string;
  videoCaption: string;
  bibleLink: string;
  bibleText: string;
  fullFilmLink: string;
  fullFilmText: string;
  questionsLink: string;
  country: string;
  readingLanguage: string;
  slug: string;
}

const listItemStyle = {
  margin: '48px 0',
};

interface Props {
  data: LanguagePageData;
}

const LanguagePage: React.FunctionComponent<Props> = ({ data }) => {
  const {
    language,
    script,
    videoEmbedSource,
    videoEmbedCode,
    videoCaption,
    bibleLink,
    bibleText,
    fullFilmLink,
    fullFilmText,
    questionsLink,
    country,
    readingLanguage,
    slug,
  } = data;

  return (
    <div className={styles.root}>
      <Head>
        <title>{language} - Watch the film JESUS in your language</title>
      </Head>

      <h1>{language}</h1>

      {script && <h2>{script}</h2>}

      <figure>
        <div
          className={styles.video}
          dangerouslySetInnerHTML={{
            __html: data.videoEmbedCode,
          }}
          style={{ width: '600px' }}
        />
        <figcaption>{data.videoCaption}</figcaption>
      </figure>

      <section>
        <ul style={{ listStyle: 'none', textAlign: 'center', padding: 0 }}>
          <li style={listItemStyle}>
            <label htmlFor='bible-link'>{bibleText}</label>
            <br />
            <Link href={bibleLink}>
              <a id='bible-link'>{bibleLink}</a>
            </Link>
          </li>
          <li style={listItemStyle}>
            <label htmlFor='full-film-link'>
              {fullFilmText}
              <br />
            </label>
            <Link href={fullFilmLink}>
              <a id='full-film-link'>{fullFilmLink}</a>
            </Link>
          </li>
          <li style={listItemStyle}>
            <label htmlFor='questions-link'>
              Questions?
              <br />
            </label>
            <Link href={questionsLink}>
              <a id='questions-link'>{questionsLink}</a>
            </Link>
          </li>
        </ul>
      </section>

      <div className={styles.backLinkContainer}>
        <Link href='/'>
          <a>↩&nbsp;&nbsp;Back to Country List</a>
        </Link>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  params: { slug },
}) => {
  if (Array.isArray(slug)) slug = slug[0];

  // The slug is automatically being decoded from URI,
  // so we have to recode it
  const data = languagePagesData[encodeURI(slug)];

  if (!data) throw Error('Language page data not found');

  return {
    props: {
      data,
    },
  };
};

export default LanguagePage;
