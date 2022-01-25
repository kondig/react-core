import {
    JUMP_TO,
    PLAY,
} from './actions';

import { calculateTicTacToeWinner } from 'libraries';

const initialState = {
    history: [{
        squares: Array(9).fill(null),
    }],
    xIsNext: true,
    stepNumber: 0,
    stepCoords: [null,null],
    winner: null,
};

function reducer(state, action) {
    switch (action.type) {
        case PLAY: {
            const { i } = action.payload;
            // const i = action.payload.i;
            const history = state.history.slice(0, state.stepNumber + 1);
            const current = history[state.history.length - 1];
            const squares = current.squares.slice();
            console.log('actionPLAY: ',current, state.winner, squares[i])
            if (state.winner || squares[i]) {
                return state;
            };
            const row = Math.floor(i/3) + 1;
            const col = i % 3 + 1;
            squares[i] = state.xIsNext ? 'X' : 'O';
            return {
                ...state,
                winner: calculateTicTacToeWinner(squares),
                history: state.history.concat([{
                    squares,
                    stepCoords: [row, col],
                }]),
                xIsNext: !state.xIsNext,
                stepNumber: state.history.length,
                stepCoords: [row, col],
            };
        };
        case JUMP_TO: {
            const { step } = action.payload;
            console.log('actionJUMP :', state);
            return {
                ...state,
                stepNumber: step,
                xIsNext: (step % 2) === 0,
            };
        };
        default:
            return state;
    }
}

export {
    initialState,
    reducer
};
