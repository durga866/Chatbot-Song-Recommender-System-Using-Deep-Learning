import React from 'react';

import './EmojiPicker.css';

import { Emojis } from './Emojis';

const EmojiPicker = (props) => {

    const handleClick = e => {
        props.emojiChoice(e.target.className)
    }

    const emojiMap = Emojis.map(emoji => {
        return <div className="emoji" key={emoji.emoji}>
                   <p className={emoji.genre} onClick={handleClick}>{emoji.emoji}</p>
               </div>
    })

    return(
        <div className="emoji-picker">
            <h3>select an emoji</h3>
            <div className="emoji-area">
                {emojiMap}
            </div>
        </div>
    )
}

export default EmojiPicker;