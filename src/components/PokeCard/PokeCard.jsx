import React from "react";
import heartEmpty from '../../img/heart-regular.svg';
import heartFull from '../../img/heart-solid.svg';
import './PokeCard.css';

const PokeCard = ({pokemonData, handleImageLoad, checkLocalStorageForFavorites, addedToFavorites, onAddToFavoritesClick}) => {
  return (
    <div className="pokecard-container">
      <img className='favorites-icon' onClick={onAddToFavoritesClick} src={addedToFavorites ? heartFull : heartEmpty}/>
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
      <h2 className="pokemon-description">{pokemonData.name.toUpperCase()}</h2>
      <h3>HP : {pokemonData.stats[0].base_stat}</h3>
      <h3>Height : {pokemonData.height}</h3>
      <h3>Attack : {pokemonData.stats[1].base_stat}</h3>
      <h3>Defense : {pokemonData.stats[2].base_stat}</h3>
      <h3>Speed : {pokemonData.stats[5].base_stat}</h3>
      {/* <div className="img-container">
        <img className="pokemon-img"
        src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png' 
        alt="Pokemon Image"
        onLoad={handleImageLoad}
      />
      </div>
      <h2 className="pokemon-description">Charmander</h2>
      <h3>HP : 45</h3>
      <h3>Height : 67</h3>
      <h3>Attack : 73</h3>
      <h3>Defense : 12</h3>
      <h3>Speed : 90</h3> */}
    </div>
  )
}

export default PokeCard;
