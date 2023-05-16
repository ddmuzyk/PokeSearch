import React from "react";
import './Evolutions.css';
import pokemons from "../../../../constants/pokemons";

const Evolutions = ({pokemonData}) => {

  const evolutions = pokemonData.evolutions;
  const name = pokemonData.name;
  // {for (let item of evolutions) {
  //   console.log(item)
  //   // for (let i = 0; i < pokemons.length; i++) {
  //   //   if (pokemons[i].name === item) {
  //   //     evolutionObject.name = item;
  //   //     evolutionObject.id = i + 1;
  //   //   }
  //   // }
  // }}
  // console.log(evolutions)

  return (
    <div className="evolutions-container">
      {Object.keys(evolutions).map((pokemon) => {
        return (
          <div key={pokemon} className="evolution-card">
            <img src={evolutions[pokemon].img} className="evolution-img"></img>
            <h2>{`${evolutions[pokemon].name[0].toUpperCase()}${evolutions[pokemon].name.slice(1)}`}</h2>
          </div>
        )}
      )}
    </div>
  )
}

// {`${evolutions[pokemon].name[0]}${evolutions[pokemon].name.slice(1)}`}
// {`${evolutions[pokemon].name[0].toUpperCase()}${evolutions[pokemon].name.slice(1)}`}

export default Evolutions;