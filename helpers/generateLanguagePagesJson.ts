//@ts-ignore
const fs = require('fs');

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
