import React from "react";
import heartEmpty from '../../img/heart-regular.svg';
import heartFull from '../../img/heart-solid.svg';
import BaseStats from "./subPokeCard/BaseStats/BaseStats";
import Pokedex from "./subPokeCard/Pokedex/Pokedex";
import Moves from "./subPokeCard/Moves/Moves";
import ToggleSwitch from "./subPokeCard/ToggleSwitch/ToggleSwitch";
import './PokeCard.css';
import Sprites from "./subPokeCard/Sprites/Sprites";
import Evolutions from "./subPokeCard/Evolutions/Evolutions";

const PokeCard = ({pokemonData, handleImageLoad, checkLocalStorageForFavorites, addedToFavorites, onAddToFavoritesClick, onEvolutionBtnClick}) => {



  let imgUrl = '';

  if (pokemonData.sprites.other['official-artwork'].front_default) {
    imgUrl = pokemonData.sprites.other['official-artwork'].front_default;
  } else {
    imgUrl = 'https://i0.wp.com/www.alphr.com/wp-content/uploads/2016/07/whos_that_pokemon.png?resize=1280%2C960&ssl=1';
  }
  

  return (
    <div className="pokecard-container">
      <div className="fav-icon-container">
        <img className='favorites-icon' onClick={onAddToFavoritesClick} src={addedToFavorites ? heartFull : heartEmpty}/>
      </div>
      <div className="img-container">
        <img className="pokemon-img"
        src={imgUrl} 
        alt="Pokemon Image"
        onLoad={() => {
          checkLocalStorageForFavorites();
          handleImageLoad();
          }}
          // To be deleted 
          onClick={() => console.log(pokemonData)}
        />
      </div>
      {/* <ToggleSwitch/> */}
      <h1 className="pokemon-description">{pokemonData.name.toUpperCase()}</h1>
      <div className="info-container">
        <BaseStats pokemonData={pokemonData}/>
        <Pokedex pokemonData={pokemonData}/>
      </div>
      <Sprites pokemonData={pokemonData}/>
      <Evolutions pokemonData={pokemonData}
      onEvolutionBtnClick={onEvolutionBtnClick}
      />
    </div>
  )
}

export default PokeCard;
