import "../styles.css";
import { useState } from "react";
import Board from "./Board"
import Play from "./Play"
function App() {

  const [squares, setSquares] = useState(Array(9).fill("."));

  const [xIsNext, setXIsNext] = useState(true);
  const winner = calculateWinner(squares);
  let status = "Next player:" + (xIsNext ? "X" : "O");
  if (winner != ".") {
    // bug 2: there should be only at most one winner per game. 
    status = "Winner: " + winner;
  }
  function handleClick(i) {
    if (squares[i] != ".") return;
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? "X" : "O";
    setXIsNext(!xIsNext);
    setSquares(nextSquares);
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
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return ".";
  }


  return <div>

    <h1>Tic Tac Toe</h1>
    <div className="status">{status}</div>
    <Play opponent="AI" handleClick={handleClick} squares={squares} xIsNext={xIsNext} />
    <Board handleClick={handleClick} squares={squares} setSquares={setSquares} /></div>;
}

export default App; 