import { GetServerSideProps } from "next";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import languagePagesData from "../../data/language-pages.json";
import styles from "../../styles/LanguagePage.module.scss";

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
  margin: "48px 0",
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

  const title = `${language} - Watch the film JESUS in your language`;

  const url = `https://freejesusfilm.netlify.app/language/${slug}`;

  return (
    <main
      className={`${styles.root} my-0 mx-auto mt-12 flex max-w-5xl flex-col items-center px-0 py-2 text-center text-xl`}
    >
      <Head>
        <title>{title}</title>
        <link rel="canonical" href={url} />
        <meta property="og:title" content={title} />
        <meta property="og:url" content={url} />
      </Head>

      <h1>{language}</h1>

      {script && <h2 className={styles.scriptTitle}>{script}</h2>}

      <section>
        <figure className="m-0">
          <div
            className={styles.video}
            dangerouslySetInnerHTML={{
              __html: data.videoEmbedCode,
            }}
          />
          <svg viewBox="0 0 64 64" width="64" height="64">
            <rect
              width="64"
              height="64"
              rx={"6px"}
              ry={"6px"}
              fill="#eee"
              // style={bgStyle}
            />
            <path
              d="M34.1,47V33.3h4.6l0.7-5.3h-5.3v-3.4c0-1.5,0.4-2.6,2.6-2.6l2.8,0v-4.8c-0.5-0.1-2.2-0.2-4.1-0.2 c-4.1,0-6.9,2.5-6.9,7V28H24v5.3h4.6V47H34.1z"
              fill="#2374e1"
            />
          </svg>
          <figcaption>{data.videoCaption}</figcaption>
        </figure>
      </section>

      <section>
        <ul style={{ listStyle: "none", textAlign: "center", padding: 0 }}>
          <li style={listItemStyle}>
            <label htmlFor="bible-link">{bibleText}</label>
            <br />
            <Link href={bibleLink}>
              <a id="bible-link">{bibleLink}</a>
            </Link>
          </li>
          <li style={listItemStyle}>
            <label htmlFor="full-film-link">
              {fullFilmText}
              <br />
            </label>
            <Link href={fullFilmLink}>
              <a id="full-film-link">{fullFilmLink}</a>
            </Link>
          </li>
          <li style={listItemStyle}>
            <label htmlFor="questions-link">
              Questions?
              <br />
            </label>
            <Link href={questionsLink}>
              <a id="questions-link">{questionsLink}</a>
            </Link>
          </li>
        </ul>
      </section>

      <footer className={styles.backLinkContainer}>
        <Link href="/">
          <a>↩&nbsp;&nbsp;Back to Country List</a>
        </Link>
      </footer>
    </main>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  params: { slug },
}) => {
  try {
    if (Array.isArray(slug)) slug = slug[0];

    // The slug is automatically being decoded from URI,
    // so we have to recode it
    const data = languagePagesData[encodeURI(slug)];

    if (!data) throw Error("Language page data not found");

    return {
      props: {
        data,
      },
    };
  } catch (error) {
    console.log(error);

    return {
      props: {},
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }
};

export default LanguagePage;
