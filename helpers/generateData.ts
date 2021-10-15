//@ts-ignore
const fs = require('fs');
const CSVToJSON = require('csvtojson');

interface Language {
  language: string;
  name: string;
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
          name: language,
          script,
          type: 'language',
          hyperlink,
        };

        if (countries[country]) {
          countries[country].languages.push(newLangEntry);
        } else {
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

      fs.writeFileSync('./data/languages.json', JSON.stringify(languages));
      fs.writeFileSync('./data/countries.json', JSON.stringify(countries));
      fs.writeFileSync('./data/top.json', JSON.stringify(top));
    });
})();
