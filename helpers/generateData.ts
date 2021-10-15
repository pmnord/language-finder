//@ts-ignore
const fs = require('fs');
const CSVToJSON = require('csvtojson');

interface Language {
  language: string;
  script: string;
  type: 'language';
  hyperlink: string;
}

interface Country {
  name: string;
  type: 'country';
  fullName: string;
  aliases: string[];
  continents: string[];
  languages: Array<Language>;
  flagSvg: string;
}

const additionalLanguages = [
  {
    language: 'Lesser Antillean Creole French',
    hyperlink:
      'https://mylanguage.net.au/watch_online/dom00/JESUS/1_4472-jf6112-0-0',
  },
  {
    language: 'Chamorro',
    hyperlink:
      'https://mylanguage.net.au/watch_online/cjd00/JESUS/1_5379-jf6112-0-0',
  },
  {
    language: 'Wayampi, Oiapoque',
    hyperlink:
      'https://mylanguage.net.au/watch_online/Way99/JESUS/1_1795-jf6112-0-0',
  },
  {
    language: 'Papiamentu',
    hyperlink:
      'https://mylanguage.net.au/watch_online/pae00/JESUS/1_9131-jf6112-0-0',
  },
];

(() => {
  CSVToJSON()
    .fromFile('./data/_language-country.csv')
    .then((entries) => {
      console.log(entries);
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

      entries.forEach(({ country, language, hyperlink, script }) => {
        const newLangEntry: Language = {
          language,
          script,
          type: 'language',
          hyperlink,
        };

        if (countries[country]) {
          countries[country].languages.push(newLangEntry);
        } else {
          // TODO loop through every country and check if the country name is in aliases
          for (const countryEntry of countriesArray) {
            if (countryEntry.aliases.includes(country)) {
              countries[countryEntry.name] &&
                countries[countryEntry.name].languages.push(newLangEntry);
              break;
            }
          }
        }

        if (country === '_TOP') {
          top.push(newLangEntry);
        } else if (!languages[language]) {
          languages[language] = newLangEntry;
        }

        fs.writeFileSync('./test-lang.json', JSON.stringify(languages));
        fs.writeFileSync('./test-country.json', JSON.stringify(countries));
        fs.writeFileSync('./test-top.json', JSON.stringify(top));
      });
    });
})();

// function reduceLanguagesIntoCountry() {
//   const reducedRel = rel.reduce((acc, cur) => {
//     if (!acc[cur.country]) acc[cur.country] = [];

//     acc[cur.country].push({
//       language: cur.language,
//       hyperlink: cur.hyperlink,
//     });

//     return acc;
//   }, {});

//   fs.writeFileSync(
//     `./data/relationships-reduced-${Date.now()}.json`,
//     JSON.stringify(reducedRel)
//   );
// }

// function setLanguageArrayInCountry() {
//   Object.keys(countries).forEach((key) => {
//     const country = countries[key];
//     country.languages = languageArrays[key];
//   });
//   fs.writeFileSync('./data/new-countries.json', JSON.stringify(countries));
// }

// function extractAllLanguagesFromCountries() {
//   const allLanguages = {};

//   Object.keys(countries).forEach((key) => {
//     const country = countries[key];
//     country.languages.forEach(({ language, hyperlink }) => {
//       if (!allLanguages[language]) {
//         allLanguages[language] = {
//           name: language,
//           hyperlink,
//           type: 'language',
//         };
//       }
//     });
//   });

//   for (language of additionalLanguages) {
//     allLanguages[language.language] = {
//       name: language.language,
//       hyperlink: language.hyperlink,
//       type: 'language',
//     };
//   }

//   fs.writeFileSync('./data/all-languages.json', JSON.stringify(allLanguages));
// }
