const fs = require('fs');
const countries = require('./countries.json');

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

  fs.writeFileSync('./data/all-languages.json', JSON.stringify(allLanguages));
}

extractAllLanguagesFromCountries();
