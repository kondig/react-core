// const xIsNext = (state) => state.xIsNext;
export const xIsNext = ({ xIsNext }) => xIsNext;
export const winner = ({ winner }) => winner;
export const stepCoords = ({ stepCoords }) => stepCoords;
export const stepNumber = ({ stepNumber }) => stepNumber;
export const history = ({ history }) => history;

export const historyStepCoords = ({ history }) => history.map(({ stepCoords }) => stepCoords);
export const historySquares = ({ history }) => history.map(({ squares }) => squares);
export const squares = ({ history }) => history[history.length - 1].squares;
export const square = (state) => (i) => squares(state)[i];

export const squareByCoords = (state) => (row, col) => squares(state)[(row - 1)*3 + col-1];
