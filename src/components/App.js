import "../styles.css";
import { useState } from "react";
import Board from "./Board"
import Play from "./Play"
import { LineChart } from '@mui/x-charts/LineChart';
import Footer from "./Footer"
import calculateWinner from "../logic/CalculateWinner";
function App() {

  const [squares, setSquares] = useState(Array(9).fill("."));
  const [xIsNext, setXIsNext] = useState(true);
  const [reset, setReset] = useState(false);
  const winner = calculateWinner(squares);
  const [numberOfGamesPlayed, setNumberOfGamesPlayed] = useState(1);
  const [accumulatedWinsByX, setAccumulatedWinsByX] = useState([0]);
  let status = "Next player:" + (xIsNext ? "X" : "O");

  if (winner != ".") {

    status = "Winner: " + winner;
    if (reset) {
      setReset(false);
      setSquares(Array(9).fill("."));
      setXIsNext(true);
      if (winner == "X") {
        setAccumulatedWinsByX([...accumulatedWinsByX, accumulatedWinsByX[accumulatedWinsByX.length - 1] + 1]);
      } else {
        setAccumulatedWinsByX([...accumulatedWinsByX, accumulatedWinsByX[accumulatedWinsByX.length - 1] - 1]);
      }
      setNumberOfGamesPlayed(numberOfGamesPlayed + 1);
      // console.log("number of games played", numberOfGamesPlayed)
      // console.log("accumulated wins", accumulatedWinsByX)
    }
    // setSquares(Array(9).fill(".")); // reset the board, so autoplay can continue
  }
  else if (squares.every((val) => val != ".")) {
    status = "Draw game!";

    if (reset) {

      setReset(false);
      setSquares(Array(9).fill("."));
      setXIsNext(true);

      setAccumulatedWinsByX([...accumulatedWinsByX, accumulatedWinsByX[accumulatedWinsByX.length - 1]]);
      setNumberOfGamesPlayed(numberOfGamesPlayed + 1);
      // console.log("number of games played", numberOfGamesPlayed)
      // console.log("accumulated wins", accumulatedWinsByX)

    }
  }

  function resetBoard() {
    // console.log("resetting board")
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




  return <div
    // style={{ pointerEvents: winner != "." ? "none" : null }}
  >

    <h1>Tic Tac Toe</h1>
    <div className="status">{status}</div>
    <Play opponent="AI" handleClick={handleClick} squares={squares} resetBoard={resetBoard} xIsNext={xIsNext} />
    <Board
      handleClick={handleClick} squares={squares} setSquares={setSquares} />
    <LineChart
      id="line-chart"
      xAxis={[{ label: "Number of Games Played", data: Array.from(Array(numberOfGamesPlayed), (_, index) => index + 1) }]}
      series={[
        {
          label: "Accumulated Scores by X",
          data: accumulatedWinsByX
        },
      ]}
      width={500}
      height={300}
    />
    <Footer></Footer>
  </div>;
}

export default App; 