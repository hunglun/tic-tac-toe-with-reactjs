import "../styles.css";
import {useState} from "react";
import Board from "./Board"
import Play from "./Play"
function App() {
  return <div>
    <h1>Tic Tac Toe</h1>
    <Play opponent="AI" />
    <Board /></div>;
} 

export default App; 