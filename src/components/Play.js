import React, { useState } from "react";


function NextMove(props) {
    return <div><label>Next Move: {props.colIndex}, {props.rowIndex}</label></div>;
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
        return <div> <input type="checkbox" name="autoplay" defaultChecked={autoplay} onClick={(event) => {
            setAutoplay(event.target.checked)
        }} />
            <label>Autoplay: {autoplay.toString()}</label>
        </div>;
    }

    function makeMove() {
        // TODO replace randomMove with intelligent move
        const move = randomMove();
        setNextMove(move);
        props.handleClick(move.colIndex + move.rowIndex * 3);
        console.log(move.colIndex, ",", move.rowIndex)
    }
    // bug 1: setInterval is not cleared when autoplay is unchecked
    setInterval(() => { if (autoplay) { makeMove()} }, 1000);
    return <div> <Autoplay /><button onClick={makeMove}>Ask {props.opponent}</button>
        <NextMove colIndex={nextMove.colIndex} rowIndex={nextMove.rowIndex} />
    </div>;
}
export default Play;