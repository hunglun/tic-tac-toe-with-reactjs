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
    function randomMove() {
        const colIndex = Math.floor(Math.random() * 3);
        const rowIndex = Math.floor(Math.random() * 3);
        return { "colIndex": colIndex, "rowIndex": rowIndex, "marker": props.xIsNext ? "X" : "O" };
    }

    function Autoplay(props) {
        useEffect(() => {
            const interval = setInterval(()=> { autoplay && makeMove()}, 1000);
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
        // if not, add it to the table, and return 1.
   
        const squaresAsString = squares.reduce((accumulator, currentValue) => accumulator + currentValue, "")
        for (const [key, value] of Object.entries(table)) {
            if (key == squaresAsString)
                return value;
        }
        const initialValue = squares.map((val, index) => val == "." ? 1 : 0)
        setTable({ ...table, [squaresAsString]: initialValue });
        return initialValue;
    }
    function intelligentMove(squares) {
        // implement Matchbox Tic-Tac-Toe algorithm
        // https://en.wikipedia.org/wiki/Matchbox_Educable_Noughts_and_Crosses_Engine
        
        // design:
        // create a table that matches every possible board state, or matched the current game state, or a rotation or mirror image of it.
        // each entry in the table is a 3x3 matrix of 0, X or . (empty)
        
        
        
        // q: how to iterate over table to find a match to squares?
        const matchedValue=findMatchInTable(squares);

        // convert [0,1,1,1] to [0,2,3,4]
        const allPossibleMoves = [];
        matchedValue.forEach((val, index) => {
            for (let i = 0; i < val; i++) {
                allPossibleMoves.push(index);
            }
        } , [table]);
        // pick one entry randomly from allPossibleMoves
        const randomIndex = Math.floor(Math.random() * allPossibleMoves.length);
        const randomMove = allPossibleMoves[randomIndex];
        const colIndex = randomMove % 3;
        const rowIndex = Math.floor(randomMove / 3);
        console.log(table)

        return { "colIndex": colIndex, "rowIndex": rowIndex, "marker": props.xIsNext ? "X" : "O" };

        // // how to generate the above table algorithmically?
        // Don't need to pre-build this table, just add to it as the game progresses.
        // Initially, each move is equally likely.

        
        // what should be the initial value corresponding to each board state? Let's make it 1 for now.

        // TODO next question, how to check if one board state is a rotation or mirror image of another?
        // let's just check all 8 possible rotations and mirror images, and see if any of them match.
        // if so, return the corresponding value from the table.

      
   }

    function makeMove() {
        const move = intelligentMove(props.squares);
        setNextMove(move);
        props.handleClick(move.colIndex + move.rowIndex * 3);
        console.log(move.colIndex, ",", move.rowIndex)
    }
    return <div> <Autoplay /><button onClick={makeMove}>Ask {props.opponent}</button>
        <NextMove colIndex={nextMove.colIndex} rowIndex={nextMove.rowIndex} />
    </div>;
}
export default Play;
export { rotateSquareMatrixBy90Degrees };