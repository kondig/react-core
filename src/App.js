import React, { useReducer, createContext } from 'react';

// import { Game } from 'components';
import { GameContainer } from 'components';

import {
    initialState,
    reducer,
} from 'models/tictactoe/reducer';

import './app.css';

const StateContext = createContext();

function App() {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <StateContext.Provider value={{ state, dispatch }}>
          <GameContainer />
        </StateContext.Provider>
    );
}

export { App, StateContext };
