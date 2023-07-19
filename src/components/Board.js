import React, { useState } from "react";
import Square from "./Square";


function Board(props) {
    return (
        <>
            {[[0, 1, 2], [3, 4, 5], [6, 7, 8]].map((row) => {
                return <div key={row[0]} className="board-row">
                    {row.map((index) => <Square key={index} value={props.squares[index]} onSquareClick={() => props.handleClick(index)} />)}
                </div>
            })}
        </>
    );
}
export default Board;