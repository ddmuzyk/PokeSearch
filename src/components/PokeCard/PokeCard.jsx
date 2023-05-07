import React from "react";
import heartEmpty from '../../img/heart-regular.svg';
import heartFull from '../../img/heart-solid.svg';
import BaseStats from "./subPokeCard/BaseStats/BaseStats";
import Pokedex from "./subPokeCard/Pokedex/Pokedex";
import Moves from "./subPokeCard/Moves/Moves";
import './PokeCard.css';

const PokeCard = ({pokemonData, handleImageLoad, checkLocalStorageForFavorites, addedToFavorites, onAddToFavoritesClick}) => {
  return (
    <div className="pokecard-container">
      <div className="fav-icon-container">
        <img className='favorites-icon' onClick={onAddToFavoritesClick} src={addedToFavorites ? heartFull : heartEmpty}/>
      </div>
      <div className="img-container">
        <img className="pokemon-img"
        src={pokemonData.sprites.other['official-artwork'].front_default} 
        alt="Pokemon Image"
        onLoad={() => {
          checkLocalStorageForFavorites();
          handleImageLoad();
          }}
          onClick={() => console.log(pokemonData)}
        />
      </div>
      <h1 className="pokemon-description">{pokemonData.name.toUpperCase()}</h1>
      <div className="info-container">
        <BaseStats pokemonData={pokemonData}/>
        <Pokedex pokemonData={pokemonData}/>
      </div>
    </div>
  )
}

export default PokeCard;
