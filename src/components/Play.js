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

    function intelligentMove(squares) {
        // implement Matchbox Tic-Tac-Toe algorithm
        // https://en.wikipedia.org/wiki/Matchbox_Educable_Noughts_and_Crosses_Engine
        
        // design:
        // create a table that matches every possible board state, or matched the current game state, or a rotation or mirror image of it.
        // each entry in the table is a 3x3 matrix of 0, X or . (empty)
        const table = {
            ".........": [1,1,1,1,1,1,1,1,1],
            "X........": [0,1,1,1,1,1,1,1,1],            
            ".X.......": [1,0,1,1,1,1,1,1,1],
            "..X......": [1,1,0,1,1,1,1,1,1],
            "...X.....": [1,1,1,0,1,1,1,1,1],
            "....X....": [1,1,1,1,0,1,1,1,1],
            ".....X...": [1,1,1,1,1,0,1,1,1],
            "......X..": [1,1,1,1,1,1,0,1,1],
            ".......X.": [1,1,1,1,1,1,1,0,1],
            "........X": [1,1,1,1,1,1,1,1,0],
            "XOX......": [0,0,0,1,1,1,1,1,1],
            "XO.X.....": [0,0,0,1,1,1,1,1,1],           
        }      
        // how to generate the above table algorithmically?
        // Don't need to pre-build this table, just add to it as the game progresses.
        // Initially, each move is equally likely.

        
        // what should be the initial value corresponding to each board state? Let's make it 1 for now.

        // next question, how to check if one board state is a rotation or mirror image of another?
        // let's just check all 8 possible rotations and mirror images, and see if any of them match.
        // if so, return the corresponding value from the table.

    }

    function makeMove() {
        // TODO replace randomMove with intelligent move
        const move = randomMove();
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