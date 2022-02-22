// a selector is a function that knows how to extract a specific piece of data from state
// const xIsNext = (state) => state.xIsNext;
export const xIsNext = ({ xIsNext }) => xIsNext;
export const winner = ({ winner }) => winner;
export const stepCoords = ({ stepCoords }) => stepCoords;
export const stepNumber = ({ stepNumber }) => stepNumber;
export const history = ({ history }) => history;

// export const squares = ({ history }) => history[history.length - 1].squares;
export const squares = ({ history, stepNumber }) => history[stepNumber].squares;
export const historyStepCoords = ({ history }) => history.map(({ stepCoords }) => stepCoords);
export const historySquares = ({ history }) => history.map(({ squares }) => squares);

export const square = (state) => (i) => squares(state)[i];
export const squareByCoords = (state) => (row, col) => squares(state)[(row - 1)*3 + col-1];


// const initialState = {
//     history: [{
//         squares: Array(9).fill(null),
//         stepCoords:
//     }],
//     xIsNext: true,
//     stepNumber: 0,
//     stepCoords: [null,null],
//     winner: null,
// };
