import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import React from 'react';
import videoPageData from '../../data/videoPageData.json';
import styles from '../../styles/VideoPage.module.scss';

const listItemStyle = {
  margin: '1rem',
};

interface VideoPageData {
  language: string;
  video: {
    embed: string;
    caption: string;
  };
  links: {
    bible: {
      href: string;
      text: string;
    };
    fullFilm: {
      href: string;
      text: string;
    };
    questions: {
      href: string;
      text: string;
    };
    optional: {
      href: string;
      text: string;
    };
    share: {
      href: string;
      text: string;
    };
  };
}

const VideoPage = ({ language }): JSX.Element => {
  language = decodeURI(language);

  const data: VideoPageData = videoPageData[language];

  if (!data) return null;

  return (
    <div className={styles.root}>
      <Head>
        <title>{data.language} - Watch the film JESUS in your language</title>
      </Head>

      <h1>{data.language}</h1>

      <figure>
        <div
          className={styles.video}
          dangerouslySetInnerHTML={{
            __html: data.video.embed,
          }}
          style={{ width: '600px' }}
        />
        <figcaption>{data.video.caption}</figcaption>
      </figure>

      <section>
        <ul style={{ listStyle: 'none', display: 'flex', flexWrap: 'wrap' }}>
          <li style={listItemStyle}>
            <Link href={data.links.bible.href}>
              <a>{data.links.bible.text}</a>
            </Link>
          </li>
          <li style={listItemStyle}>
            <Link href={data.links.fullFilm.href}>
              <a>{data.links.fullFilm.text}</a>
            </Link>
          </li>
          <li style={listItemStyle}>
            <Link href={data.links.questions.href}>
              <a>{data.links.questions.text}</a>
            </Link>
          </li>
          <li style={listItemStyle}>
            <Link href={data.links.optional.href}>
              <a>{data.links.optional.text}</a>
            </Link>
          </li>
          <li style={listItemStyle}>
            <Link href={data.links.share.href}>
              <a>{data.links.share.text}</a>
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

export const getStaticProps: GetStaticProps = async ({ params }) => {
  return {
    props: {
      language: params.language,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    fallback: 'blocking',
    paths: Object.keys(videoPageData).map((language) => ({
      params: {
        language,
      },
    })),
  };
};

export default VideoPage;
