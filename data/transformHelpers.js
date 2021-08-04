const fs = require('fs');
const languageArrays = require('./country-lang.json');
const countries = require('./countries.json');

function reduceLanguagesIntoCountry() {
  const reducedRel = rel.reduce((acc, cur) => {
    if (!acc[cur.country]) acc[cur.country] = [];

    acc[cur.country].push({
      language: cur.language,
      hyperlink: cur.hyperlink,
    });

    return acc;
  }, {});

  fs.writeFileSync(
    './data/relationships-8-4-reduced.json',
    JSON.stringify(reducedRel)
  );
}

function setLanguageArrayInCountry() {
  Object.keys(countries).forEach((key) => {
    const country = countries[key];
    country.languages = languageArrays[key];
  });
  fs.writeFileSync('./data/new-countries.json', JSON.stringify(countries));
}
// setLanguageArrayInCountry();
