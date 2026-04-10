import React, { useState } from 'react';
import './EmojiCard.css';

// each individual emoji row - shows the emoji, its name and description
// also added a little copy to clipboard feature when you click on the emoji
function EmojiCard({ emojiData }) {
  const [copied, setCopied] = useState(false);

  // formatting the alias name to look nicer
  // replacing underscores with spaces and capitalizing first letters
  const formatName = (aliases) => {
    if (!aliases || aliases.length === 0) return '';
    return aliases.map(alias =>
      alias.split('_').map(word =>
        word.charAt(0).toUpperCase() + word.slice(1)
      ).join(' ')
    ).join(', ');
  };

  // copy emoji to clipbaord when clicked - a nice little feature
  const handleCopy = () => {
    navigator.clipboard.writeText(emojiData.emoji).then(() => {
      setCopied(true);
      // reset copied state after 1.5 seconds
      setTimeout(() => setCopied(false), 1500);
    }).catch(err => {
      console.log('couldnt copy emoji:', err);
    });
  };

  return (
    <div className={`emoji-card ${copied ? 'copied' : ''}`} onClick={handleCopy}>
      {/* the emoji itself */}
      <span className="emoji-icon" role="img" aria-label={emojiData.description}>
        {emojiData.emoji}
      </span>

      {/* alias name column */}
      <span className="emoji-name">
        {formatName(emojiData.aliases)}
      </span>

      {/* description column */}
      <span className="emoji-description">
        {emojiData.description ? emojiData.description.charAt(0).toUpperCase() + emojiData.description.slice(1) : ''}
      </span>

      {/* show "copied!" when user clicks */}
      {copied && <span className="copied-badge">Copied!</span>}
    </div>
  );
}

export default EmojiCard;
