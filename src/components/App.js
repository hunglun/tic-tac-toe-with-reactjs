import "../styles.css";
import { useState } from "react";
import Board from "./Board"
import Play from "./Play"
function App() {

  const [squares, setSquares] = useState(Array(9).fill("."));
  const [xIsNext, setXIsNext] = useState(true);
  const [reset, setReset] = useState(false);
  const winner = calculateWinner(squares);
  let status = "Next player:" + (xIsNext ? "X" : "O");
  
  if (winner != ".") {
    
    status = "Winner: " + winner;
    if (reset){
      setReset(false);
      setSquares(Array(9).fill("."));
      setXIsNext(true);
    }
    // setSquares(Array(9).fill(".")); // reset the board, so autoplay can continue
  }
  if (squares.every((val) => val != ".")) {
    status = "Draw game!";

    if (reset){
      setReset(false);
      setSquares(Array(9).fill("."));
      setXIsNext(true);
    }
  }

  function resetBoard(){
    console.log("resetting board")
    setReset(true);
    // setSquares(Array(9).fill("."));
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


  return <div
    style={{ pointerEvents: winner != "." ? "none" : null }}
  >

    <h1>Tic Tac Toe</h1>
    <div className="status">{status}</div>
    <Play opponent="AI" handleClick={handleClick} squares={squares} calculateWinner={calculateWinner} resetBoard={resetBoard} xIsNext={xIsNext} />
    <Board
      handleClick={handleClick} squares={squares} setSquares={setSquares} /></div>;
}

export default App; 