import { useState, useEffect } from 'react';
import pokemons from "./constants/pokemons";
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg';
import rocket from './rocket.svg';

import Searchbar from './components/Searchbar/Searchbar';
import PokeCard from './components/PokeCard/PokeCard';
import FavPokeCard from './components/FavPokeCard/FavPokeCard';
import './App.css';

function App() {
  const [results, setResults] = useState([]);
  const [hiddenResults, setHiddenResults] = useState(true);
  // const [displayedPokemon, setDisplayedPokemon] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [pokemonData, setPokemonData] = useState({});
  const [route, setRoute] = useState('search');
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isLoaderShown, setIsLoaderShown] = useState(false);
  const [addedToFavorites, setAddedToFavorites] = useState(false);
  const [favoritesUpdated, setFavoritesUpdated] = useState(false);
  const favPokemons = JSON.parse(localStorage.getItem('favPokemons')) ? JSON.parse(localStorage.getItem('favPokemons')) : {};
  const pokemonKeys = Object.keys(favPokemons);

  const handleImageLoad = () => {
    // if (localStorage.getItem('favPokemons')) {
    //   const favPokemons = JSON.parse(localStorage.getItem('favPokemons'));
    //   const pokemonName = pokemonData.name;
    //   if (favPokemons[pokemonName] && favPokemons[pokemonName].name === pokemonName) {
    //     setAddedToFavorites(true);
    //   }
    // }
    setIsImageLoaded(true);
    setIsLoaderShown(false);
  };

  const clearData = () => {
    setInputValue('');
    setPokemonData({});
    setResults([]);
    setHiddenResults(true);
    // setRoute('search');
    setIsImageLoaded(false);
    setAddedToFavorites(false);
  }

  const onAddToFavoritesClick = () => {
    const pokemonKey = pokemonData.name;
    if (localStorage.getItem('favPokemons')) {
      let favPokemons = JSON.parse(localStorage.getItem('favPokemons'));
      if (!addedToFavorites) {
        favPokemons[pokemonKey] = pokemonData;
        localStorage.setItem('favPokemons', JSON.stringify(favPokemons));
        setAddedToFavorites(true);
      } else {
        delete favPokemons[pokemonKey];
        if (!Object.keys(favPokemons).length) {
          localStorage.removeItem('favPokemons')
          setAddedToFavorites(false);
        } else {
          localStorage.setItem('favPokemons', JSON.stringify(favPokemons));
          setAddedToFavorites(false);
        }
      }
    } else {
      localStorage.setItem('favPokemons', JSON.stringify({[pokemonKey]: pokemonData}));
      setAddedToFavorites(true);
    }
    // console.log(localStorage.getItem('favPokemons') === JSON.stringify(pokemonData))
  }

  const filterResults = (e) => {
    
    setInputValue(e.target.value);
    if (!e.target.value) {
      setResults(results => []);
      setHiddenResults(true);
      return;
    } else {
      // if (results.length >= 1 && results[0].name.includes(e.target.value)) {
      //   let times = 0;
      //   results.forEach((result) => {
      //     if (result.name.includes(e.target.value.toLowerCase())) {
      //       times++
      //     }
      //   })
      //   console.log('times:', times);
      //   console.log('results.length: ', results.length)
      //   if (times === results.length) {
      //     return;
      //   }
      // }
      // if (e.target.value.length > 1 && hiddenResults && !results.length) {
      //   return;
      // } 
      let newResults = [];
      let i = 0;
      for (let pokemon of pokemons) {
        if ( i < 10) {
          if (pokemon["name"].includes(e.target.value.toLowerCase())) {
            newResults.push(pokemon);
            i++;
          }
        } else {
          break;
        }
      };
      // console.log(results)
      if (!newResults.length) {
        setHiddenResults(true);
        setResults([]);
        return;
      }
      // Check if previous results are the same as new results to avoid unneccessary operations
      // if (JSON.stringify(newResults) === JSON.stringify(results)) {
      //   return;
      // }
      setResults(results => newResults);
      setHiddenResults(false);
    }
  }

  // Display the searched pokemon when user clicks on a result
  const onResultClick = async (e) => {
    const pokemonName = e.target.textContent;
    setIsLoaderShown(true);
    try {
      const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
      const response = await fetch(url);
      const data = await response.json();
      setPokemonData(data);
      setRoute('resultsPage');
    } catch (err) {
      console.log(err);
    }
  }

  const checkLocalStorageForFavorites = () => {
    if (localStorage.getItem('favPokemons')) {
      const favPokemons = JSON.parse(localStorage.getItem('favPokemons'));
      const pokemonName = pokemonData.name;
      if (favPokemons[pokemonName] && favPokemons[pokemonName].name === pokemonName) {
        setAddedToFavorites(true);
      }
    }
  }

  const onFavPokemonClick = (e) => {
    setIsLoaderShown(true);
    const pokemonKey = e.target.getAttribute('data-pokemon');
    const newData = favPokemons[pokemonKey];
    setPokemonData(newData);
    setRoute('resultsPage');
  }

  if (route === 'search') {
    return (
      <div className='search-route-wrapper'>
        <div className='svg-container' style={{display: !isImageLoaded && isLoaderShown ? 'flex' : 'none'}}>
              <img className='loader' src={rocket} alt='Loading image'></img>
        </div>
        <div className='nav-bar'>
          <span className='search-nav-btns'>
            <h1 className='go-to-favorites-button' onClick={() => setRoute('favorites')}>Go to Favorites</h1>
          </span>
        </div>
        <div className='title-and-searchbox-container'>
          <h1 className='pokesearch-title'>PokeSearch</h1>
          <Searchbar results={results} 
          hiddenResults={hiddenResults} 
          inputValue={inputValue}
          filterResults={filterResults}
          onResultClick={onResultClick}
          />
        </div>
      </div>
    )
  } else if (route === 'resultsPage') {
    return (
      <div className='results-route-wrapper'>
        <div className='svg-container' style={{display: !isImageLoaded && isLoaderShown ? 'flex' : 'none'}}>
          <img className='loader' src={rocket} alt='Loading image'></img>
        </div>
        <div className='nav-bar'>
          <div className='buttons-container'>
          <h1 className='back-button' onClick={() => {
            setRoute('search')
            clearData()
            }}>
            Search
          </h1>
          <h1 className='back-to-favorites-button' onClick={() => {
            setRoute('favorites');
            clearData();
          }}>Favorites</h1>
          {/* <h1 className='favorites-button' onClick={onAddToFavoritesClick}>
            <img className='favorites-icon' src={addedToFavorites ? heartFull : heartEmpty}/>
          </h1> */}
          </div>
        </div>
        
        <PokeCard pokemonData={pokemonData}
        handleImageLoad={handleImageLoad}
        checkLocalStorageForFavorites={checkLocalStorageForFavorites}
        addedToFavorites={addedToFavorites}
        onAddToFavoritesClick={onAddToFavoritesClick}
        />
      </div>
      )
  } else if (route === 'favorites') {
    return (
      <div className='App'>
        {/* <div className='favorites-wrapper'> */}
          <div className='svg-container' style={{display: !isImageLoaded && isLoaderShown ? 'flex' : 'none'}}>
            <img className='loader' src={rocket} alt='Loading image'></img>
          </div>
          <div className='nav-bar'>
            <h1 className='take-back-button' onClick={() => {
              setRoute('search');
              clearData();
            }}>
            Take me back
            </h1>
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
                />
              })}
            </div>
          ) : (
            <h1 className='no-favorites-message'>Looks like you don't have any favorite pokemons yet...</h1>
          )}
        {/* </div> */}
      </div>
    )
  }
}

export default App;
