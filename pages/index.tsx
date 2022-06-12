import Image from "next/image";
import Link from "next/link";
import AutoSuggest from "../components/AutoSuggest";
import Divider from "../components/Divider";
import SearchIcon from "../components/SearchIcon";
import countries from "../data/countries.json";
import commonLanguages from "../data/top.json";
import isValidCountry from "../helpers/isValidCountry";
import styles from "../styles/index.module.scss";

export default function Home() {
  return (
    <div id="top" className={styles.container}>
      <header className="my-2 mx-auto max-w-5xl">
        <Image
          className="rounded-md"
          width={1440}
          height={500}
          src="/site-image.jpg"
          alt="Learn More About Jesus Christ"
        />
      </header>

      <main className={styles.main}>
        <h1 className="my-6 font-bold leading-snug">
          Watch The Film <span style={{ color: "#ef3340" }}>JESUS</span> In Your
          Language
        </h1>

        <div className="flex flex-wrap justify-center bg-white">
          {commonLanguages.map((language) => (
            <span
              key={language.language}
              className="m-3.5 text-2xl leading-none"
            >
              <Link href={language.hyperlink}>
                <a>{language.script}</a>
              </Link>
            </span>
          ))}
        </div>

        <div className={styles.searchInputContainer}>
          <SearchIcon />
          <AutoSuggest />
        </div>

        <ul className="grid grid-cols-3 gap-2 md:grid-cols-4 lg:grid-cols-5">
          {Object.keys(countries).map((countryName) => {
            const country = countries[countryName];

            if (!isValidCountry(country)) return null;

            return (
              <li key={country.name}>
                <Link href={`/country/${encodeURIComponent(countryName)}`}>
                  <a className={styles.countryLink}>
                    <div className="flex flex-col items-center justify-center sm:m-2">
                      <img
                        className={styles.flag}
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

      <footer className="mb-8 flex w-3/4 justify-center">
        <a href="#top" className="flex items-end text-xl no-underline">
          <span className="text-3xl" aria-hidden>
            ↑&nbsp;
          </span>
          Scroll to Top
        </a>
      </footer>
    </div>
  );
}
