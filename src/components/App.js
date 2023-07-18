import "../styles.css";
import {useState} from "react";
import Board from "./Board"
import Play from "./Play"
function App() {

  const [squares, setSquares] = useState(Array(9).fill("."));
  function updateBoard(move){
    setSquares(squares => {
      const nextSquares = squares.slice();
      nextSquares[move.colIndex + move.rowIndex * 3] = move.marker;
      return nextSquares;
    });    
    console.log("updateBoard", move.colIndex, ",", move.rowIndex)
  }
  return <div>
    <h1>Tic Tac Toe</h1>
    <Play opponent="AI" updateBoard={updateBoard} squares={squares}/>
    <Board squares={squares} setSquares={setSquares} /></div>;
} 

export default App; 