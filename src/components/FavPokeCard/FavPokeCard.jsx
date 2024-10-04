import React from "react";
import './FavPokeCard.css';

const FavPokeCard = ({pokemon, onFavPokemonClick, data, handleImageLoad, setFavoritesUpdated, favoritesUpdated, scrollPosition}) => {

  const favPokemons = JSON.parse(localStorage.getItem('favPokemons'));

  const removeFavorite = (e) => {
    const pokemon = e.target.getAttribute('data-pokemon');
    delete favPokemons[pokemon];
    if (!Object.keys(favPokemons).length) {
      localStorage.removeItem('favPokemons');
    } else {
      localStorage.setItem('favPokemons', JSON.stringify(favPokemons));
    }
    // Not the greatest way to cause a rerender :)
    setFavoritesUpdated(!favoritesUpdated);
  }

  return (
    <div className="fav-pokecard-container">
      <div className="fav-img-container" >
        <img className="fav-pokemon-img"
        src={favPokemons[pokemon].imgUrl}
        alt="Pokemon Image"
        />
      </div>
        <h2 className="fav-pokemon-description" >{pokemon.toUpperCase()}</h2>
        <h2 className="load-fav-button" data-pokemon={data} onClick={(e) => {
          onFavPokemonClick(e)
          }}>
          Show More
        </h2>
        <h3 className="remove-fav" data-pokemon={data} onClick={(e) => removeFavorite(e)}>Remove</h3>
    </div>
  )
}

export default FavPokeCard;