import React, { useState, useEffect } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import EmojiList from './components/EmojiList';

// main app component for the emoji project
// fetches emoji data and handles the search/filter logic
function App() {
  const [emojis, setEmojis] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredEmojis, setFilteredEmojis] = useState([]);
  const [loading, setLoading] = useState(true);

  // fetching the emoji data when the page loads
  // using the external js file as data source
  useEffect(() => {
    fetchEmojiData();
  }, []);

  // function to fetch emojis from the external source
  const fetchEmojiData = async () => {
    try {
      // fetching from the external emoji list
      const response = await fetch('https://akhil-06.github.io/emoji_project/emojiList.js');
      const text = await response.text();

      // the file is a javascript file not json, so we cant use JSON.parse directly
      // using Function constructor to safely evaluate the js and get the array
      // basically it runs the script and returns the emojiList variable
const jsonStr = text
  .replace(/^const emojiList = /, '')
  .trim()
  .replace(/;$/, '');

const data = JSON.parse(jsonStr);

      setEmojis(data);
      setFilteredEmojis(data);
      setLoading(false);
    } catch (error) {
      console.log('error fetching emojis:', error);
      setLoading(false);
    }
  };

  // filter emojis based on search input
  // checks aliases, description and tags - case insensitive
  useEffect(() => {
    if (searchTerm === '') {
      setFilteredEmojis(emojis);
    } else {
      const query = searchTerm.toLowerCase();
      const results = emojis.filter((emoji) => {
        // check in aliases
        const aliasMatch = emoji.aliases && emoji.aliases.some(
          alias => alias.toLowerCase().includes(query)
        );
        // check in description
        const descMatch = emoji.description && emoji.description.toLowerCase().includes(query);
        // check in tags too
        const tagMatch = emoji.tags && emoji.tags.some(
          tag => tag.toLowerCase().includes(query)
        );
        return aliasMatch || descMatch || tagMatch;
      });
      setFilteredEmojis(results);
    }
  }, [searchTerm, emojis]);

  // handler for when user types in search bar
  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <div className="App" id="app-root">
      <div className="app-container">
        {/* header with title */}
        <h1 className="app-title" id="app-title">
          Emojee - Emoji 🔍 Application
        </h1>

        {/* search bar componenet */}
        <SearchBar onSearch={handleSearch} searchTerm={searchTerm} />

        {/* showing loading text or the emoji list */}
        {loading ? (
          <p className="loading-text">Loading emojis...</p>
        ) : (
          <>
            <p className="emoji-count">
              {filteredEmojis.length} emojis found
            </p>
            <EmojiList emojis={filteredEmojis} />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
