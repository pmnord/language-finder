import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";
import Autosuggest from "react-autosuggest";
import countries from "../data/countries.json";
import languages from "../data/languages.json";
import isValidCountry from "../helpers/isValidCountry";
import Suggestion from "./Suggestion";
// ---------------------------------------------
// Autosuggest Styles are located in globals.css
// ---------------------------------------------

const COUNTRY_NAMES = Object.keys(countries).filter((name) =>
  isValidCountry(countries[name])
);
const LANGUAGE_NAMES = Object.keys(languages);

const languagesWithScripts: Array<Language> = Object.values(languages)
  .filter((language) => language.script.length > 0)
  .map((language) => ({ ...language, name: language.script, script: "" }));

const getSuggestions = (value) => {
  if (value === undefined) {
    value = "";
  }
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  const matches = [];

  COUNTRY_NAMES.filter(
    (name) => name.toLowerCase().slice(0, inputLength) === inputValue
  ).forEach((name) => {
    matches.push(countries[name]);
  });

  LANGUAGE_NAMES.filter(
    (name) => name.toLowerCase().slice(0, inputLength) === inputValue
  ).forEach((name) => {
    matches.push(languages[name]);
  });

  languagesWithScripts
    .filter(
      (language) =>
        language.name.toLowerCase().slice(0, inputLength) === inputValue
    )
    .forEach((language) => matches.push(language));

  return matches;
};

const getSuggestionValue = (suggestion) => suggestion;

const renderSuggestion = (suggestion) => {
  return <Suggestion suggestion={suggestion} />;
};

const AutoSuggest = () => {
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const router = useRouter();

  const onChange = (_event: ChangeEvent, { newValue }) => {
    if (typeof newValue === "string") {
      setValue(newValue);
    } else if (typeof newValue === "object") {
      setValue(newValue.name);
    }
  };

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  const handleSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(value));
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  const handleSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  function handleSuggestionSelected(_event: any, { suggestionValue }: any) {
    setValue(suggestionValue.name);

    if (suggestionValue.type === "country") {
      return router.push(
        `/country/${encodeURIComponent(suggestionValue.name)}`
      );
    } else if (suggestionValue.type === "language") {
      return router.push(suggestionValue.hyperlink);
    }
  }

  return (
    <Autosuggest
      suggestions={suggestions}
      onSuggestionsFetchRequested={handleSuggestionsFetchRequested}
      onSuggestionsClearRequested={handleSuggestionsClearRequested}
      onSuggestionSelected={handleSuggestionSelected}
      getSuggestionValue={getSuggestionValue}
      renderSuggestion={renderSuggestion}
      inputProps={{
        placeholder: "Search by Country or Language",
        value,
        onChange,
      }}
    />
  );
};

export default AutoSuggest;
