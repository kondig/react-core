import React, { useContext } from 'react';
import { StateContext } from '../../App.js';

import { Square } from 'components/square';

import {
    play,
} from 'models/tictactoe/actions';

import {
    // history as selectHistory,
    squares as selectSquares,
} from 'models/tictactoe/selectors';

import './board.css';

const Board = ({ squares, playAction }) => {
    const renderSquare = (i) => (
        <Square
            value={squares[i]}
            play={()=> playAction(i)}
        />
    );
    return (
      <div>
        <div className="board-row">
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div className="board-row">
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div className="board-row">
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
      </div>
    );
}

const BoardContainer = () => {
    const { state, dispatch } = useContext(StateContext);
    const squares = selectSquares(state);
    const playAction = (i) => {
        dispatch(play({ i }));
    };
    return (
      <Board
          squares = {squares}
          playAction = {playAction}
       />
    );
}

export { Board };
export default BoardContainer;
