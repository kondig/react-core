import React from 'react';

import './square.css';

const Square = (props) => (
      <button className="square" onClick={props.onClick} >
        {props.value}
      </button>
);

export { Square };


//1. the onClick prop on the built-in DOM <button> tells React to set up a click event addEventListener
//2. when clicked, React will call the onClick event handler in Square's render()
//3. this event handler calls this.props.onClick() [the Square's onClick prop is specified by the Board]
//4. the Square calls the Board's handleClick(i)
