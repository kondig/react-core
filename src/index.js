import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


// function components = only contain a render method and don't have their own state
function Square(props) {
    return (
      <button className="square" onClick={props.onClick} >
        {props.value}
      </button>
    );
}
//1. the onClick prop on the built-in DOM <button> tells React to set up a click event addEventListener
//2. when clicked, React will call the onClick event handler in Square's render()
//3. this event handler calls this.props.onClick() [the Square's onClick prop is specified by the Board]
//4. the Square calls the Board's handleClick(i)

// ! convention: use on[Event] names for props of events and handle[Event] for their methods

class Board extends React.Component {
  // constructor(props) {
  //     super(props);
  //     this.state = {
  //         squares: Array(9).fill(null),
  //         xIsNext: true,
  //     };
  // }
  // handleClick(i) {
  //     const squares = this.state.squares.slice();
  //     // return early by ignoring a click if someone has won the game or if a square is filled
  //     if (calculateWinner(squares) || squares[i]) { return; }
  //     squares[i] = this.state.xIsNext ? 'X' : 'O';
  //     this.setState({
  //         squares: squares,
  //         xIsNext: !this.state.xIsNext,
  //     });
  // }
  renderSquare(i) {
    return <Square value={this.props.squares[i]}
                   onClick={()=> this.props.onClick(i)}
                   />;
  }
  render() {
    // const winner = calculateWinner(this.state.squares);
    // let status;
    // if (winner) {
    //     status = 'Winner: ' + winner;
    // } else {
    //     status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    // }
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

class Game extends React.Component {
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
      if (calculateWinner(squares) || squares[i]) {
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
    const winner = calculateWinner(current.squares);
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


// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
