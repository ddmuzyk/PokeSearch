import React, {useEffect} from "react";
import rocket from '../../rocket.svg'
import FavPokeCard from "../../components/FavPokeCard/FavPokeCard";

const FavoritesRoute = ({clearData, setRoute, setScrollPosition, handleImageLoad, onFavPokemonClick, setFavoritesUpdated, favoritesUpdated, scrollPosition, isImageLoaded, isLoaderShown}) => {

  const favPokemons = JSON.parse(localStorage.getItem('favPokemons')) ? JSON.parse(localStorage.getItem('favPokemons')) : {};
  const pokemonKeys = Object.keys(favPokemons);

  useEffect(() => {
    window.scrollTo(0, scrollPosition);
  }, [])

  return (
    <div className='favorites-route-wrapper'>
      <div className='svg-container' style={{display: !isImageLoaded && isLoaderShown ? 'flex' : 'none'}}>
        <img className='loader' src={rocket} alt='Loading image'></img>
      </div>
      <div className='nav-bar'>
        <span className='fav-route-btns-container'>
          <h1 className='take-back-button' onClick={() => {
            clearData();
            setRoute('search');
            // setScrollPosition(0);
          }}>
          Take me back
          </h1>
        </span>
      </div>
      {pokemonKeys.length > 0 ? (
        <div className='fav-pokemons-container'>
          {pokemonKeys.map((key) => {
            return <FavPokeCard key={key} 
            pokemon={key}
            data={`${key}`}
            handleImageLoad={handleImageLoad}
            onFavPokemonClick={onFavPokemonClick}
            setFavoritesUpdated={setFavoritesUpdated}
            favoritesUpdated={favoritesUpdated}
            scrollPosition={scrollPosition}
            />
          })}
        </div>
      ) : (
        <div className='no-fav-message-container'>
          <h1 className='no-favorites-message'>Looks like you don't have any favorite pokemons yet...</h1>
        </div>
      )}
    </div>
  )
}

export default FavoritesRoute;