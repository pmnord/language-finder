//@ts-ignore
const fs = require('fs');
const CSVToJSON = require('csvtojson');
const chalk = require('chalk');

(async () => {
  const entries = await CSVToJSON().fromFile('./data/csv/language-pages.csv');

  const result = entries.reduce((acc, entry) => {
    entry.slug = encodeURI(entry.language);
    acc[entry.slug] = entry;

    return acc;
  }, {});

  fs.writeFileSync('./data/json/language-pages.json', JSON.stringify(result));

  console.log(
    `Populated ${chalk.cyan(
      entries.length
    )} language page entries in language-pages.json`
  );
})();
