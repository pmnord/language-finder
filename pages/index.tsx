import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import AutoSuggest from "../components/AutoSuggest";
import Divider from "../components/Divider";
import SearchIcon from "../components/SearchIcon";
import countries from "../data/countries.json";
import commonLanguages from "../data/top.json";
import isValidCountry from "../helpers/isValidCountry";

export default function Home() {
  const title = `Watch the film JESUS in your language`;
  const url = `https://freejesusfilm.netlify.app/`;

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <title>{title}</title>
        <meta property="og:title" content={title} />
        <meta property="og:url" content={url} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/site-image.jpg" />
      </Head>
      <div id="top" className="mx-auto min-h-screen max-w-6xl px-2">
        <header className="my-2 mx-auto max-w-5xl">
          <Image
            className="rounded-md"
            width={1440}
            height={500}
            src="/site-image.jpg"
            alt="Learn More About Jesus Christ"
          />
        </header>

        <main>
          <h1 className="my-6 text-center text-5xl font-normal leading-snug">
            Watch The Film <span style={{ color: "#ef3340" }}>JESUS</span> In
            Your Language
          </h1>

          <div className="flex flex-wrap justify-center bg-white p-4">
            {commonLanguages.map((language) => (
              <span
                key={language.language}
                className="m-4 text-2xl leading-none"
              >
                <Link href={language.hyperlink}>
                  <a>{language.script}</a>
                </Link>
              </span>
            ))}
          </div>

          <div className="mx-auto my-12 flex w-fit items-center justify-center rounded-md bg-white p-4 drop-shadow-xl">
            <SearchIcon className="mr-2 h-10" />
            <AutoSuggest />
          </div>

          <ul className="grid grid-cols-3 gap-2 md:grid-cols-4 lg:grid-cols-5">
            {Object.keys(countries).map((countryName) => {
              const country = countries[countryName];

              if (!isValidCountry(country)) return null;

              return (
                <li key={country.name}>
                  <Link href={`/country/${encodeURIComponent(countryName)}`}>
                    <a className="text-black no-underline hover:underline">
                      <div className="flex flex-col items-center justify-center sm:m-2">
                        <img
                          className="m-2 h-14 drop-shadow-2xl sm:h-24"
                          src={`/flags/${country.flagSvg}`}
                          alt={countryName}
                          title={country.fullName}
                        />
                        <span className="text-center">{country.name}</span>
                      </div>
                    </a>
                  </Link>
                </li>
              );
            })}
          </ul>
        </main>

        <Divider />

        <footer className="mb-8 flex w-full justify-center">
          <a href="#top" className="flex items-end text-xl no-underline">
            <span className="text-3xl" aria-hidden>
              ↑&nbsp;
            </span>
            Scroll to Top
          </a>
        </footer>
      </div>
    </>
  );
}
