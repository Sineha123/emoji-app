import React from 'react';
import './SearchBar.css';

// search bar componenet - lets users type and search for emojis
// has a text input and a search button like in the refrence
function SearchBar({ onSearch, searchTerm }) {
  // handle input change - update the search term as user types
  const handleChange = (e) => {
    onSearch(e.target.value);
  };

  return (
    <div className="search-bar" id="search-bar">
      <input
        type="text"
        className="search-input"
        id="search-input"
        placeholder="Emojee Search"
        value={searchTerm}
        onChange={handleChange}
      />
      <button className="search-button" id="search-button">
        Search
      </button>
    </div>
  );
}

export default SearchBar;
