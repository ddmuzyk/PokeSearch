import React from "react";
import './Moves.css';

const Moves = ({pokemonData}) => {
  return (
    <div className="moves-wrapper">
    <h1>Moves</h1>
    <ul className="moves-list">
      {pokemonData.moves.map((item) => {
        const move = item.move.name;
        return (
          <li key={move}>{move}</li>
        )
      })}
    </ul>
        
    </div>
  )
}

export default Moves;