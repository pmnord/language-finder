// function importAll(r) {
//   let images = {};
//   r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
//   return images;
// }

// const images = importAll(require.context('./images', false, /\.(png|jpe?g|svg)$/));

// Load locally as a function.
// require('require-context/register');
// var requireContext = require('require-context');

// function importAll(r) {
//   let images = {};
//   r.keys().map((item, index) => {
//     images[item.replace('./', '')] = r(item);
//   });
//   return images;
// }

// const flagSvgs = importAll(
//   requireContext('../resources/flag-svgs', false, /\.(png|jpe?g|svg)$/)
// );
// console.log(flagSvgs);

// export default flagSvgs;
