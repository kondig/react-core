import React, { useReducer } from 'react';

import { Board } from 'components';

import { calculateTicTacToeWinner } from 'libraries';

import {
    initialState,
    reducer,
} from 'models/tictactoe/reducer';

import {
    jumpTo as jmpTo,
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

import './game.css';

// const initialState = {
//     history: [{
//         squares: Array(9).fill(null),
//     }],
//     xIsNext: true,
//     stepNumber: 0,
//     stepCoords: [null,null],
// };

// function reducer(state, action) {
//     switch (action.type) {
//         case 'newSquareClicked':
//             return {
//                 ...state,
//                 history: state.history.concat([{
//                     squares: action.payload.squares,
//                     stepCoords: [action.payload.col,action.payload.row],
//                 }]),
//                 xIsNext: !state.xIsNext,
//                 stepNumber: state.history.length,
//                 stepCoords: [action.payload.col,action.payload.row],
//             };
//         case 'jumpToMove':
//             return {
//                 ...state,
//                 stepNumber: action.payload,
//                 xIsNext: (action.payload % 2) === 0,
//                 indexOfMove: action.payload,
//             };
//         default:
//             throw new Error();
//     }
// }


function Game() {
    const [state, dispatch] = useReducer(reducer, initialState);

    const handleClick = (i) => {
        // dispatch({ type:'newSquareClicked', payload: { i } });
        dispatch(play({ i }));
    };
    const jumpTo = (step) => {
        // dispatch({ type:'jumpToMove', payload: step })
        dispatch(jmpTo({ step }));
    };
    const history = state.history;
    const current = history[state.stepNumber];
    // const current = history[history.length - 1];
    // const winner = calculateTicTacToeWinner(current.squares);
    const moves = history.map((step,move) => {
        const desc = move ?
            'Go to move #' + move + '   (' + history[move].stepCoords + ')' :
            'Go to game start';
        return (
            <li key={move}>
                <button onClick={() => jumpTo(move)}
                        style={{backgroundColor: (move === state.stepNumber) ? 'purple' : '#e3e3e3',
                                color: (move === state.stepNumber) ? '#ffffff' : '#000000',}}>
                    {desc}
                </button>
            </li>
        )
    });
    // const stepNum = stepNumber(state);
    // const moves = historyStepCoords(state).map(stepCoords, move) => {
    //     const desc = move ?
    //         'Go to move #' + move + '   (' + stepCoords + ')' :
    //         'Go to game start';
    //     return (
    //         <li key={move}>
    //             <button onClick={() => jumpTo(move)}
    //                     style={{backgroundColor: (move === stepNum) ? 'purple' : '#e3e3e3',
    //                             color: (move === stepNum) ? '#ffffff' : '#000000',}}>
    //                 {desc}
    //             </button>
    //         </li>
    //     )
    // });
    const status = state.winner
        ? 'Winner: ' + state.winner
        : 'Next player: ' + (state.xIsNext ? 'X' : 'O');
    // if (state.winner) {
    //     status = 'Winner: ' + state.winner;
    // } else {
    //     status = 'Next player: ' + (state.xIsNext ? 'X' : 'O');
    // }
    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
}
// the state mgmt logic should be managed in a separate place
// useReducer()

// const [state, dispatch] = useReducer(reducer, initialState);
// - the initial state is the value the state is initialized width
// - an action object describes how to update the State (has a property: type)
// - the dispatch f is a special function that dispatches an action object
// =============================================================================
class GameClassComponent extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          history: [{
              squares: Array(9).fill(null),
          }],
          xIsNext: true,
          stepNumber: 0,
          stepCoords: [null,null],
          indexOfMove: -1,
      }
  }
  handleClick(i) {
      const history = this.state.history.slice(0, this.state.stepNumber + 1);
      const current = history[history.length - 1];
      const squares = current.squares.slice();
      if (calculateTicTacToeWinner(squares) || squares[i]) {
          return;
      }
      const nrOfRows = 3;
      let row;
      if (i < squares.length/nrOfRows) { row = 1 }
      else if (i >= squares.length/nrOfRows && i < 2*squares.length/nrOfRows )
      { row = 2 }
      else
      { row = 3 };
      let col;
      if      (i === 0 || i === 3 || i === 6) { col = 1 }
      else if (i === 1 || i === 4 || i === 7) { col = 2 }
      else if (i === 2 || i === 5 || i === 8) { col = 3 };
      squares[i] = this.state.xIsNext ? 'X' : 'O';
      this.setState({
          history: history.concat([{
              squares: squares,
              stepCoords: [col,row]
          }]),
          xIsNext: !this.state.xIsNext,
          stepNumber: history.length,

      });
  }
  jumpTo(step) {
      this.setState({
          stepNumber: step,
          xIsNext: (step % 2) === 0,
          indexOfMove: step,
      });
  }
  render() {
    const history = this.state.history;
    // render the last move
    // const current = history[history.length - 1];
    // render the currently selected move
    const current = history[this.state.stepNumber];
    const winner = calculateTicTacToeWinner(current.squares);
    const moves = history.map((step,move) => {
        const desc = move ?
            'Go to move #' + move + '   (' + history[move].stepCoords + ')' :
            'Go to game start';
        return (
            <li key={move}>
                <button onClick={() => this.jumpTo(move)}
                        style={{backgroundColor: (move === this.state.stepNumber) ? 'purple' : '#e3e3e3',
                                color: (move === this.state.stepNumber) ? '#ffffff' : '#000000',}}>
                    {desc}
                </button>
            </li>
        )
    });
    let status;
    if (winner) {
        status = 'Winner: ' + winner;
    } else {
        status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }
    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

export { Game };
