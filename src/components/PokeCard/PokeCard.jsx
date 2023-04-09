import React from "react";
import './PokeCard.css';

const PokeCard = (pokemonData) => {
  return (
    <div className="pokecard-container">
      <img className="pokemon-img" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png" alt="Pokemon Image"/>
      <h2 className="pokemon-description">Bulbasaur</h2>
      <h3>HP: 45</h3>
      <h3>Height: 6</h3>
      <h3>Attack: 49</h3>
      <h3>Defense: 45</h3>
      <h3>Speed: 45</h3>
    </div>
  )
}

export default PokeCard;