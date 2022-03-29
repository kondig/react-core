import React, { useContext } from 'react';
import { StateContext } from '../../App.js';

// import { Board } from 'components';
import { BoardContainer } from 'components';

import {
    xIsNext as selectIsNext,
    winner as selectWinner,
    stepNumber as selectStepNumber,
    history as selectHistory,
    // squares as selectSquares,
} from 'models/tictactoe/selectors';

import {
    jumpTo,
} from 'models/tictactoe/actions';

import './game.css';

const Game = ({
    history,
    stepNumber,
    winner,
    xIsNext,
    jumpAction,
}) => {
    const moves = history.map((step,move) => {
        const desc = move ?
            'Go to move #' + move + '   (' + history[move].stepCoords + ')' :
            'Go to game start';
        return (
            <li key={move}>
                <button onClick={() => jumpAction(move)}
                        style={{
                            backgroundColor: (move === stepNumber) ? 'purple' : '#e3e3e3',
                            color: (move === stepNumber) ? '#ffffff' : '#000000',
                        }}
                    >
                    {desc}
                </button>
            </li>
        )
    });

    const status = winner
        ? 'Winner: ' + winner
        : 'Next player: ' + (xIsNext ? 'X' : 'O');

    return (
      <div className="game">
        <div className="game-board">
          <BoardContainer />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
}

function GameContainer() {
    const { state, dispatch } = useContext(StateContext);
    const history =  selectHistory(state);
    const stepNumber = selectStepNumber(state);
    const winner = selectWinner(state);
    const xIsNext = selectIsNext(state);
    // const squares = selectSquares(state);
    const jumpAction = (step) => {
        dispatch(jumpTo({ step }));
    };
    return (
          <Game
            jumpAction = { jumpAction }
            history = { history }
            stepNumber = { stepNumber }
            winner = { winner }
            xIsNext = { xIsNext }
          />

    );
}

export { Game };
export { GameContainer };
