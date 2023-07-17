import React, {useState} from "react";


function NextMove(props){
    return <div><label>Next Move: {props.colIndex}, {props.rowIndex}</label></div>;
}
function randomMove(){
 
    const colIndex = Math.floor(Math.random() * 4);
    const rowIndex = Math.floor(Math.random() * 4);
    return  {"colIndex": colIndex, "rowIndex": rowIndex};

}

function Play(props){
    const [nextMove, setNextMove] = useState({colIndex: 0,rowIndex: 0});
    
return <div><button onClick={()=>setNextMove(randomMove()) }>Ask {props.opponent}</button>
    <NextMove colIndex={nextMove.colIndex} rowIndex={nextMove.rowIndex}/>
    </div>;
}
export default Play;