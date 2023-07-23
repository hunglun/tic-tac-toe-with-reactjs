import React, { useEffect, useState } from "react";


function NextMove(props) {
    return <div><label>Next Move: {props.colIndex}, {props.rowIndex}</label></div>;
}


function rotateSquareMatrixBy90Degrees(matrix) {
    return matrix.map((val, index) => matrix.map(row => row[index]).reverse())
}
function Play(props) {
    const [nextMove, setNextMove] = useState({ colIndex: 0, rowIndex: 0, marker: "." });
    const [autoplay, setAutoplay] = useState(false);
    const [table, setTable] = useState({});
    const [history, setHistory] = useState({});

    function Autoplay(props) {
        useEffect(() => {
            const interval = setInterval(() => { autoplay && makeMove() }, 1000);
            return () => clearInterval(interval);
        }, [autoplay]);

        return <div> <input type="checkbox" name="autoplay" defaultChecked={autoplay} onClick={(event) => {
            setAutoplay(event.target.checked);


        }} />
            <label>Autoplay: {autoplay.toString()}</label>
        </div>;
    }

    function findMatchInTable(squares) {
        // check if squares is found in table
        // if so, return the corresponding value from the table.
        // if not, add it to the table, and return.

        const squaresAsString = squares.reduce((accumulator, currentValue) => accumulator + currentValue, "")
        for (const [key, value] of Object.entries(table)) {
            if (key == squaresAsString)
                return value;
        }
        const initialValue = squares.map((val, index) => val == "." ? 3 : 0)
        setTable({ ...table, [squaresAsString]: initialValue });
        return initialValue;
    }

    function intelligentMove(squares) {
        // implement Matchbox Tic-Tac-Toe algorithm
        // https://en.wikipedia.org/wiki/Matchbox_Educable_Noughts_and_Crosses_Engine

        const matchedValue = findMatchInTable(squares);

        const allRecommendedMoves = [];
        matchedValue.forEach((val, index) => {
            for (let i = 0; i < val; i++) {
                allRecommendedMoves.push(index);
            }
        }, [table]);
        // pick one entry randomly from recommended moves
        const randomIndex = Math.floor(Math.random() * allRecommendedMoves.length);
        const randomMove = allRecommendedMoves[randomIndex];
        const colIndex = randomMove % 3;
        const rowIndex = Math.floor(randomMove / 3);
        console.log("random move", randomMove, colIndex, rowIndex)

        return { "colIndex": colIndex, "rowIndex": rowIndex, "marker": props.xIsNext ? "X" : "O" };

        // TODO next question, how to check if one board state is a rotation or mirror image of another?
        // let's just check all 8 possible rotations and mirror images, and see if any of them match.
        // if so, return the corresponding value from the table.


    }

    function isXLoser(squares, move) {
        if (move.marker != "O") return false;
        return props.calculateWinner(squares) == "O";
    }
    function isDraw(squares, move) {
        return squares.every((val) => val != ".");
    }

    function isXWinner(squares, move) {
        if (move.marker != "X") return false;
        return props.calculateWinner(squares) == "X";

    }
    function trainPlayerX(squares, move) {
        // record history of moves in table
        const squaresAsString = squares.reduce((accumulator, currentValue) => accumulator + currentValue, "")
        setHistory({ ...history, [squaresAsString]: { "move": move } })
        // if this is a winning move, then update the table to reflect that.
        console.log(squares, table, history, squaresAsString, move)

        // train player X with random moves from player 0

        const updatedSquares = [...squares];
        updatedSquares[move.colIndex + move.rowIndex * 3] = move.marker;


        if (isXLoser(updatedSquares, move)) {
            // TODO update table
            console.log("X lost!")

            // clear history

            props.resetBoard();
            setHistory({});
        } else if (isXWinner(updatedSquares, move)) {
            // update table
            console.log("X won!")
            // clear history

            props.resetBoard();
            setHistory({});
        } else if (isDraw(updatedSquares, move)) {
            // update table
            console.log("Draw game!")

            // clear history
            props.resetBoard();
            setHistory({});
        }


    }
    function makeMove() {
        const move = intelligentMove(props.squares);
        trainPlayerX(props.squares, move);
        setNextMove(move);
        props.handleClick(move.colIndex + move.rowIndex * 3);
        // console.log(move.colIndex, ",", move.rowIndex)
    }
    return <div> <Autoplay /><button onClick={makeMove}>Ask {props.opponent}</button>
        <NextMove colIndex={nextMove.colIndex} rowIndex={nextMove.rowIndex} />
    </div>;
}
export default Play;
export { rotateSquareMatrixBy90Degrees };