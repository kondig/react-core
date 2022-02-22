import React, { useReducer } from 'react';

import { Game } from 'components';

import {
    initialState,
    reducer,
} from 'models/tictactoe/reducer';

import {
    jumpTo,
    play,
} from 'models/tictactoe/actions';

import {
    xIsNext,
    winner,
    stepCoords,
    stepNumber,
    history,
    historyStepCoords,
    historySquares,
    squares,
    square,
    squareByCoords,
} from 'models/tictactoe/selectors';

import './app.css';

function App() {
    const [state, dispatch] = useReducer(reducer, initialState);

    const playAction = (i) => {
        // dispatch({ type:'newSquareClicked', payload: { i } });
        dispatch(play({ i }));
    };
    const jumpAction = (step) => {
        // dispatch({ type:'jumpToMove', payload: step })
        dispatch(jumpTo({ step }));
    };

    return (
          <Game
                history={ history(state) }
                winner={ winner(state) }
                xIsNext= { xIsNext(state) }
                stepNumber={ stepNumber(state) }
                squares={ squares(state) }
                jumpTo={ jumpAction }
                play={ playAction }
                historyStepCoords={ historyStepCoords(state) }
          />
    );
}


export { App };
