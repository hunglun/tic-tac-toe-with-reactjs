import React, { useState } from "react";
import Square from "./Square";

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
function Board(props) {

    const [xIsNext, setXIsNext] = useState(true);
    const winner = calculateWinner(props.squares);
    let status = "Next player:" + (xIsNext ? "X" : "O");
    if (winner != ".") {
        status = "Winner: " + winner;
    }
    function handleClick(i) {
        if (props.squares[i] != ".") return;
        const nextSquares = props.squares.slice();
        if (xIsNext) {
            nextSquares[i] = "X";
        } else {
            nextSquares[i] = "O";
        }
        setXIsNext(!xIsNext);
        props.setSquares(nextSquares);
    }
    return (
        <>
            <div className="status">{status}</div>
            <div className="board-row">
                {[0, 1, 2].map((index) => <Square value={props.squares[index]} onSquareClick={() => handleClick(index)} />)}
            </div>
            <div className="board-row">
                {[3, 4, 5].map((index) => <Square value={props.squares[index]} onSquareClick={() => handleClick(index)} />)}
            </div>
            <div className="board-row">
                {[6, 7, 8].map((index) => <Square value={props.squares[index]} onSquareClick={() => handleClick(index)} />)}
            </div>
        </>
    );
}
export default Board;