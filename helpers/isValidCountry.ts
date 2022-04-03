export default function isValidCountry(country: Country) {
  return country.languages.length > 0 && country.flagSvg !== '';
}
