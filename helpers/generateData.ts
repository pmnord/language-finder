//@ts-ignore
const fs = require('fs');
const CSVToJSON = require('csvtojson');
const chalk = require('chalk');

interface Language {
  language: string;
  name: string;
  script: string;
  type: string;
  hyperlink: string;
}

interface Country {
  name: string;
  type: string;
  fullName: string;
  aliases: string[];
  continents: string[];
  languages: Array<Language>;
  flagSvg: string;
}

const additionalLanguages = [
  {
    language: 'Lesser Antillean Creole French',
    script: '',
    hyperlink:
      'https://mylanguage.net.au/watch_online/dom00/JESUS/1_4472-jf6112-0-0',
  },
  {
    language: 'Chamorro',
    script: '',
    hyperlink:
      'https://mylanguage.net.au/watch_online/cjd00/JESUS/1_5379-jf6112-0-0',
  },
  {
    language: 'Wayampi, Oiapoque',
    script: '',
    hyperlink:
      'https://mylanguage.net.au/watch_online/Way99/JESUS/1_1795-jf6112-0-0',
  },
  {
    language: 'Papiamentu',
    script: '',
    hyperlink:
      'https://mylanguage.net.au/watch_online/pae00/JESUS/1_9131-jf6112-0-0',
  },
];

(() => {
  CSVToJSON()
    .fromFile('./data/_language-country.csv')
    .then((entries) => {
      // {
      //   language: 'French',
      //   script: 'Français',
      //   country: 'Benin',
      //   link: 'https://nextstep.is/z9cGCYIU'
      // },

      const top = [];

      const countries: Record<
        string,
        Country
      > = require('../data/_COUNTRYLIST.json');

      // for alias lookup within entries.forEach()
      const countriesArray = Object.values(countries);

      const languages: Record<string, Language> = {};

      let entryCount = 0;

      entries.forEach(({ country, language, hyperlink, script }) => {
        const newLangEntry: Language = {
          language,
          name: language,
          script,
          type: 'language',
          hyperlink,
        };

        if (countries[country]) {
          countries[country].languages.push(newLangEntry);
          entryCount++;
        } else {
          for (const countryEntry of countriesArray) {
            if (countryEntry.aliases.includes(country)) {
              countries[countryEntry.name] &&
                countries[countryEntry.name].languages.push(newLangEntry);
              entryCount++;
              break;
            }
          }
        }

        if (country === '_TOP') {
          top.push(newLangEntry);
        } else if (!languages[language]) {
          languages[language] = newLangEntry;
        } else if (languages[language].script !== script) {
          // Include languages with the same name but multiple scripts (Punjabi),
          // renaming already existing language in object
          const prev = { ...languages[language] };
          delete languages[language];
          languages[`${prev.language} (${prev.script})`] = prev;
          languages[`${language} (${script})`] = newLangEntry;
        }
      });

      //include additional languages manually
      for (const lang of additionalLanguages) {
        if (!languages[lang.language]) {
          const newLangEntry: Language = {
            language: lang.language,
            name: lang.language,
            script: lang.script,
            type: 'language',
            hyperlink: lang.hyperlink,
          };
          languages[lang.language] = newLangEntry;
        }
      }

      // logging
      console.log(`Populated ${chalk.cyan(top.length)} languages in top.json`);
      console.log(
        `Populated ${chalk.cyan(
          Object.keys(languages).length
        )} languages in languages.json`
      );
      console.log(
        `Populated ${chalk.cyan(
          entryCount
        )} language-country relationships in countries.json`
      );

      for (const country of Object.values(countries)) {
        if (country.languages.length === 0) {
          console.log(
            `${chalk.red(
              country.name
            )} has no languages. Please check the data.`
          );
        }
      }

      fs.writeFileSync('./data/languages.json', JSON.stringify(languages));
      fs.writeFileSync('./data/countries.json', JSON.stringify(countries));
      fs.writeFileSync('./data/top.json', JSON.stringify(top));
    });
})();

// Generate language page data
(async () => {
  try {
    const jsonArray: {
      language: string;
      script: string;
      videoEmbed: string;
      videoCaption: string;
      bibleLink: string;
      bibleText: string;
      fullFilmLink: string;
      questionsLink: string;
      country: string;
      readingLanguage: string;
    }[] = await CSVToJSON().fromFile('./data/_language-pages.csv');

    const languagePages = jsonArray.reduce((acc, cur) => {
      const urlName = encodeURI(cur.language);

      acc[urlName] = {
        urlName,
        ...jsonArray,
      };

      return acc;
    }, {});

    fs.writeFileSync(
      './data/languagePages.json',
      JSON.stringify(languagePages)
    );
    console.log(
      `Populated data for ${chalk.cyan(
        Object.keys(languagePages).length
      )} language pages in languagePages.json`
    );
  } catch (error) {
    console.log(error);
  }
})();
