import React from "react";
import './Evolutions.css';

const Evolutions = ({pokemonData, onEvolutionBtnClick}) => {

  const name = pokemonData.name;
  const evolutions = pokemonData.evolutions.length ? pokemonData.evolutions.filter(item => item !== name) : [];
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

   if (evolutions.length) return (
    <div className="evolutions-container">
      <h2 id="evolution-title" className="subcomponent-title">{evolutions.length === 1 ? "Evolution" : 'Evolutions'}</h2>
      {evolutions.map((pokemon) => {
        return (
          <div key={pokemon} className="evolution-card">
            {/* <img src={evolutions[pokemon].img} className="evolution-img"></img> */}
            <h3 className="evolution-pokemon-name">{`${pokemon[0].toUpperCase()}${pokemon.slice(1)}`}</h3>
            <button 
            className="evolution-load-btn" 
            data-pokemon={pokemon}
            onClick={() => {onEvolutionBtnClick(pokemon)}}
            >Load More
            </button>
          </div>
        )}
      )}
    </div>
  )
}

// {`${evolutions[pokemon].name[0]}${evolutions[pokemon].name.slice(1)}`}
// {`${evolutions[pokemon].name[0].toUpperCase()}${evolutions[pokemon].name.slice(1)}`}

export default Evolutions;