import React from 'react';
import ReactDOM from 'react-dom';

import {
    Game,
} from 'components';

import './index.css';

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

// ========================================

// function components = only contain a render method and don't have their own state

// ! convention: use on[Event] names for props of events and handle[Event] for their methods
