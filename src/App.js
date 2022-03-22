import React, { useReducer, createContext } from 'react';

import { Game } from 'components';

import {
    initialState,
    reducer,
} from 'models/tictactoe/reducer';

// import {
//     jumpTo,
//     play,
// } from 'models/tictactoe/actions';
//
// import {
//     xIsNext,
//     winner,
//     stepCoords,
//     stepNumber,
//     history,
//     historyStepCoords,
//     historySquares,
//     squares,
//     square,
//     squareByCoords,
// } from 'models/tictactoe/selectors';

import './app.css';

const StateContext = createContext();

function App() {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <StateContext.Provider value={{ state, dispatch }}>
          <Game />
        </StateContext.Provider>
    );
}


export { App, StateContext };
