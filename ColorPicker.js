import React from 'react';

import './ColorPicker.css';

import { ColorData } from './ColorData';

const ColorPicker = (props) => {
    
    const handleClick = e => {
        props.colorChoice(e.target.className)
    }

    const colorSquares = ColorData.map( color => {
       return <div key={color.bpm} className={color.bpm} onClick={handleClick}>
                <p>{color.color}</p>
            </div>
        }
    )

    return(
        <div className="color-picker">
            <h3>select a color</h3>
            <div className="color-area">
                {colorSquares}
            </div>
        </div>
    )
}

export default ColorPicker;