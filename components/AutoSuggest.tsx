import { useRouter } from 'next/router';
import React, { ChangeEvent, useState } from 'react';
import Autosuggest from 'react-autosuggest';
import countries from '../data/countries.json';
// ---------------------------------------------
// Autosuggest Styles are located in globals.css
// ---------------------------------------------

const getSuggestions = (value) => {
  if (value === undefined) {
    value = '';
  }
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0
    ? []
    : Object.keys(countries).filter(
        (countryName) =>
          countryName.toLowerCase().slice(0, inputLength) === inputValue
      );
};

const getSuggestionValue = (suggestion) => suggestion;

const renderSuggestion = (suggestion) => {
  const country = countries[suggestion];

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <>
        <img
          style={{ height: '1rem', marginRight: '1rem' }}
          src={`flags/${country.flagSvg}`}
          alt={country.name}
          title={country.fullName}
        />
        <p>{country.name}</p>
      </>
    </div>
  );
};

const AutoSuggest = () => {
  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const router = useRouter();

  const onChange = (_event: ChangeEvent, { newValue }) => {
    setValue(newValue);
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

  function handleSuggestionSelected(
    _event,
    { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }
  ) {
    console.log(
      suggestion,
      suggestionValue,
      suggestionIndex,
      sectionIndex,
      method
    );

    router.push(`/c/${encodeURIComponent(suggestionValue)}`);
  }

  return (
    <Autosuggest
      suggestions={suggestions}
      onSuggestionsFetchRequested={handleSuggestionsFetchRequested}
      onSuggestionsClearRequested={handleSuggestionsClearRequested}
      onSuggestionSelected={handleSuggestionSelected}
      getSuggestionValue={getSuggestionValue}
      renderSuggestion={renderSuggestion}
      inputProps={{ placeholder: 'Search by Country Name', value, onChange }}
    />
  );
};

export default AutoSuggest;
