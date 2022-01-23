import React from 'react';

import './square.css';

const Square = (props) => (
      <button className="square" onClick={props.onClick} >
        {props.value}
      </button>
);

export { Square };
