import React from "react";
import './Moves.css';

const Moves = ({pokemonData}) => {

  const moves = pokemonData.moves;

  return (
    <div className="moves-wrapper">
      <h1 className="moves-title">Moves</h1>
      <div className="moves-list">
        {moves.map((item) => {
          const move = item.move.name;
          return <div key={move} className="move">{move}</div>
        })}
      </div>
        
    </div>
  )
}

export default Moves;