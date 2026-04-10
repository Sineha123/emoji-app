import React from 'react';
import './EmojiList.css';
import EmojiCard from './EmojiCard';

// emoji list componenet - renders all the emoji cards
// gets the filtered emojis array from App component
function EmojiList({ emojis }) {
  // if no emojis match the search show a message
  if (emojis.length === 0) {
    return (
      <div className="no-results" id="no-results">
        <p>No emojis found 😢</p>
        <p className="no-results-hint">Try searching for something else</p>
      </div>
    );
  }

  return (
    <div className="emoji-list" id="emoji-list">
      {/* mapping through each emoji and rendering a card for it */}
      {emojis.map((emoji, index) => (
        <EmojiCard key={index} emojiData={emoji} />
      ))}
    </div>
  );
}

export default EmojiList;
