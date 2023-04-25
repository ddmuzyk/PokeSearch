import React from "react";
import './FavPokeCard.css';

const FavPokeCard = ({pokemon, onFavPokemonClick, data, handleImageLoad, setFavoritesUpdated, favoritesUpdated}) => {
  // Function example in App.jsx
  const favPokemons = JSON.parse(localStorage.getItem('favPokemons'));
  // const pokemonKeys = Object.keys(favPokemons);
  // 

  const removeFavorite = (e) => {
    // setIsItemDeleted(true);
    const pokemon = e.target.getAttribute('data-pokemon');
    // console.log(pokemon);
    // setIsItemDeleted(true)
    delete favPokemons[pokemon];
    // localStorage.setItem('favPokemons', JSON.stringify(favPokemons));
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
        src={favPokemons[pokemon].sprites.other['official-artwork'].front_default}
        alt="Pokemon Image"
        onLoad={handleImageLoad}
        />
      </div>
        <h2 className="fav-pokemon-description">{pokemon.toUpperCase()}</h2>
        <h2 className="load-fav-button" data-pokemon={data} onClick={(e) => onFavPokemonClick(e)}>
          Show More
        </h2>
        <h3 className="remove-fav" data-pokemon={data} onClick={(e) => removeFavorite(e)}>Remove</h3>
        {/* <h3>HP : {favPokemons[pokemon].stats[0].base_stat}</h3> 
        <h3>Height : {favPokemons[pokemon].height}</h3>
        <h3>Attack : {favPokemons[pokemon].stats[1].base_stat}</h3>
        <h3>Defense : {favPokemons[pokemon].stats[2].base_stat}</h3>
        <h3>Speed : {favPokemons[pokemon].stats[5].base_stat}</h3> */}
    </div>
    // <div>
    //    <div className="img-container">
    //     <img className="pokemon-img"
    //     src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png' 
    //     alt="Pokemon Image"
    //     // onLoad={handleImageLoad}
    //   />
    //   </div>
    //   <h2 className="pokemon-description">Charmander</h2>
    //   <h3>HP : 45</h3>
    //   <h3>Height : 67</h3>
    //   <h3>Attack : 73</h3>
    //   <h3>Defense : 12</h3>
    //   <h3>Speed : 90</h3> 
    
  )
}

export default FavPokeCard;