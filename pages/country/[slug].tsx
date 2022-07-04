import { GetServerSideProps, GetStaticPaths } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Divider from "../../components/Divider";
import countries from "../../data/countries.json";

interface Language {
  language: string;
  hyperlink: string;
  script: string;
}

interface Country {
  id: string;
  name: string;
  urlName: string;
  fullName: string;
  flagSvg: string;
  languages: Array<Language>;
  continents: Array<string>;
}

const CountryPage: React.FunctionComponent<{ slug: string }> = ({ slug }) => {
  const countryName = decodeURI(slug);

  const country: Country = countries[countryName];

  if (country === undefined) return null;

  const title = `${country.name} - Watch the film JESUS in your language`;

  const url = `https://freejesusfilm.netlify.app/country/${country.urlName}`;

  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="canonical" href={url} />
        <meta property="og:title" content={title} />
        <meta property="og:url" content={url} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/site-image.jpg" />
      </Head>

      <div className="container mx-auto px-1 text-center">
        <header>
          <nav className="my-2 mx-auto max-w-5xl">
            <Link href="/">
              <a>
                <Image
                  className="rounded-md"
                  width={1440 * 0.4}
                  height={500 * 0.4}
                  src="/site-image.jpg"
                  alt="Learn More About Jesus Christ"
                />
              </a>
            </Link>
          </nav>
        </header>

        <main>
          {country.flagSvg !== "" && (
            <img
              className="mx-auto mt-6 mb-3 h-40 shadow-md shadow-gray-500"
              src={`/flags/${country.flagSvg}`}
              alt={country.fullName}
              title={country.fullName}
            />
          )}

          {["Refugee", "J-Immigrants"].includes(country.name) === false ? (
            <>
              <h1 className="text-4xl">{country.name}</h1>
              <h2 className="text-md mt-4">Select your language</h2>
            </>
          ) : (
            <h1 className="text-3xl">Select your language</h1>
          )}

          <ul className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {country.languages &&
              country.languages.map((language) => (
                <li
                  key={language.language}
                  className="mx-auto my-5 w-fit text-lg"
                >
                  <Link href={language.hyperlink}>
                    <a className="text-2xl">
                      <p>{language.language}</p>
                      {language.script.length > 0 &&
                        language.script.toLowerCase() !== "english" && (
                          <p>{language.script}</p>
                        )}
                    </a>
                  </Link>
                </li>
              ))}
            <li aria-hidden>
              <br />
            </li>
          </ul>
        </main>

        <Divider />

        <footer className="my-10">
          <Link href="/">
            <a className="flex items-center justify-center text-lg no-underline">
              <span aria-hidden className="text-2xl">
                ↩&nbsp;
              </span>
              Back to Country List
            </a>
          </Link>
        </footer>
      </div>
    </>
  );
};

export const getStaticProps: GetServerSideProps = async ({ params }) => {
  return {
    props: {
      slug: params.slug,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    fallback: "blocking",
    paths: Object.keys(countries).map((slug) => ({
      params: {
        slug,
      },
    })),
  };
};

export default CountryPage;
