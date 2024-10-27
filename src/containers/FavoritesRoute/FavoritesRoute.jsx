import React, {useEffect} from "react";
import styled from "styled-components";
import rocket from '../../rocket.svg'
import FavPokeCard from "../../components/FavPokeCard/FavPokeCard";
import Footer from "../../components/Footer/Footer";
import { Routes, storageItem } from "../../constants/constants";
import { getPokemonsFromStorage } from "../../utils/utils";
import { NavBar } from "../../components/common/NavBar";

const S = {
  NavBar: styled(NavBar)`
    justify-content: flex-end;
  `,
}

const FavoritesRoute = ({clearData, setRoute, setScrollPosition, handleImageLoad, onFavPokemonClick, setFavoritesUpdated, favoritesUpdated, scrollPosition, isImageLoaded, isLoaderShown}) => {

  const favPokemons = getPokemonsFromStorage(storageItem) ?? {};
  const pokemonKeys = Object.keys(favPokemons);

  useEffect(() => {
    window.scrollTo(0, scrollPosition);
  }, [])

  return (
    <div className='favorites-route-wrapper'>
      <div className='svg-container' style={{display: !isImageLoaded && isLoaderShown ? 'flex' : 'none'}}>
        <img className='loader' src={rocket} alt='Loading image'></img>
      </div>
      <S.NavBar>
          <h1 className='take-back-button' onClick={() => {
            clearData();
            setScrollPosition(window.scrollY);
            setRoute(Routes.Search);
            window.scrollTo(top);
          }}>
          Take me back
          </h1>
      </S.NavBar>
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
      <Footer/>
    </div>
  )
}

export default FavoritesRoute;