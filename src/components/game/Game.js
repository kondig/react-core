import React from 'react';

import { Board } from 'components';

import './game.css';

function Game({
    history,
    winner,
    xIsNext,
    stepNumber,
    squares,
    historyStepCoords,
    jumpTo,
    play,
}) {
    const moves = history.map((step,move) => {
        const desc = move ?
            'Go to move #' + move + '   (' + historyStepCoords[move] + ')' :
            'Go to game start';
        return (
            <li key={move}>
                <button onClick={() => jumpTo(move)}
                        style={{backgroundColor: (move === stepNumber) ? 'purple' : '#e3e3e3',
                                color: (move === stepNumber) ? '#ffffff' : '#000000',}}>
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
          <Board
            squares={squares}
            // onClick={(i) => play(i)}
            onClick={play}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
}

export { Game };
