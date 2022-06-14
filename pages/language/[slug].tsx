import { GetServerSideProps } from "next";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import Divider from "../../components/Divider";
import languagePagesData from "../../data/language-pages.json";

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
  
  const handleFacebookShare = () => {
    const config: { [key: string]: string | number } = {
      height:400,
      width:600,
      location: 'no',
      toolbar: 'no',
      status: 'no',
      directories: 'no',
      menubar: 'no',
      scrollbars: 'yes',
      resizable: 'no',
      centerscreen: 'yes',
      chrome: 'yes',
    };

    const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;

    window.open(
      facebookShareUrl, 
      "",
      Object.keys(config)
      .map(key => `${key}=${config[key]}`)
      .join(', '),
    );
  }

  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="canonical" href={url} />
        <meta property="og:title" content={title} />
        <meta property="og:url" content={url} />
        <meta property="og:image" content="/site-image.jpg" />
      </Head>

      <main
        className="my-0 mx-auto mt-12 flex max-w-5xl flex-col items-center px-0 py-2 text-center text-xl"
        style={{ lineBreak: "anywhere" }}
      >
        <h1 className="mb-1 text-4xl">{language}</h1>

        {script && <h2 className="text-2xl">{script}</h2>}

        <section className="my-4 w-full">
          <figure className="mx-auto w-fit">
            <div
              className="ml-2 w-[calc(100vw_-_16px)] max-w-2xl"
              dangerouslySetInnerHTML={{
                __html: data.videoEmbedCode,
              }}
            />
            
            {/* <svg viewBox="0 0 64 64" width="64" height="64">
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
            </svg> */}

            <figcaption className="-mt-5 px-4 text-sm text-gray-600">
              {data.videoCaption}
            </figcaption>
          </figure>
        </section>
        
        <section className="px-2 text-xl">
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

        <section>
          <button onClick={handleFacebookShare} className="inline-flex items-center text-sm bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-2 border border-gray-400 rounded shadow">
            <svg viewBox="0 0 64 64" width="32" height="32" className="-ml-2">
              <path
                d="M34.1,47V33.3h4.6l0.7-5.3h-5.3v-3.4c0-1.5,0.4-2.6,2.6-2.6l2.8,0v-4.8c-0.5-0.1-2.2-0.2-4.1-0.2 c-4.1,0-6.9,2.5-6.9,7V28H24v5.3h4.6V47H34.1z"
                fill="#2374e1"
              />
            </svg>
            <span>Share to Facebook</span>
          </button>
        </section>

      </main>

      <Divider />

      <footer className="mb-8 text-center">
        <Link href="/">
          <a className="flex items-center justify-center text-lg no-underline">
            <span aria-hidden className="text-2xl">
              ↩&nbsp;
            </span>
            Back to Country List
          </a>
        </Link>
      </footer>
    </>
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
