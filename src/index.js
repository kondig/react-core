import React from 'react';
import ReactDOM from 'react-dom';

import {
    App,
} from './App';

import './index.css';

// ========================================

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

// ========================================

// function components = only contain a render method and don't have their own state

// ! convention: use on[Event] names for props of events and handle[Event] for their methods
