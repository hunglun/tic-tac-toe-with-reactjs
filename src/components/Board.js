import React, { useState } from "react";
import Square from "./Square";


function Board(props) {
    return (
        <>
            {[[0, 1, 2], [3, 4, 5], [6, 7, 8]].map((row) => {
                return <div className="board-row">
                    {row.map((index) => <Square value={props.squares[index]} onSquareClick={() => props.handleClick(index)} />)}
                </div>
            })}
        </>
    );
}
export default Board;