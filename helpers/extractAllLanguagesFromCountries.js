const fs = require('fs');
const countries = require('./countries.json');

const otherLanguages = [
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

function extractAllLanguagesFromCountries() {
  const allLanguages = {};

  Object.keys(countries).forEach((key) => {
    const country = countries[key];
    country.languages.forEach(({ language, hyperlink }) => {
      if (!allLanguages[language]) {
        allLanguages[language] = {
          name: language,
          hyperlink,
          type: 'language',
        };
      }
    });
  });

  for (language of otherLanguages) {
    allLanguages[language.language] = {
      name: language.language,
      hyperlink: language.hyperlink,
      type: 'language',
    };
  }

  fs.writeFileSync('./data/all-languages.json', JSON.stringify(allLanguages));
}

extractAllLanguagesFromCountries();
