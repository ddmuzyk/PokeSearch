import { useState, useEffect } from 'react';
import pokemons from "./constants/pokemons";
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg';
import rocket from './rocket.svg';
import FavoritesRoute from './containers/FavoritesRoute/FavoritesRoute';
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
  const [selectedResult, setSelectedResult] = useState(-1);
  const [scrollPosition, setScrollPosition] = useState(0);
  // const [componentsRendered, setComponentsRendered] = useState(0);
  const favPokemons = JSON.parse(localStorage.getItem('favPokemons')) ? JSON.parse(localStorage.getItem('favPokemons')) : {};
  const pokemonKeys = Object.keys(favPokemons);

  useEffect(() => {
    if (route === 'search') {
      document.title = "PokeSearch";
    } else if (route === 'resultsPage') {
      const pokemonName = pokemonData.name;
      document.title = `${pokemonName[0].toUpperCase()}${pokemonName.slice(1, pokemonName.length)} | PokeSearch`;
    } else if (route === 'favorites') {
      document.title = 'Favorites | PokeSearch';
    }
    
  }, [route])

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
    setSelectedResult(-1);
  }

  const onAddToFavoritesClick = () => {
    const pokemonKey = pokemonData.name;
    const pokemonImg = pokemonData.sprites.other['official-artwork'].front_default 
    ? 
    pokemonData.sprites.other['official-artwork'].front_default 
    : 
    'https://i0.wp.com/www.alphr.com/wp-content/uploads/2016/07/whos_that_pokemon.png?resize=1280%2C960&ssl=1';

    if (localStorage.getItem('favPokemons')) {
      let favPokemons = JSON.parse(localStorage.getItem('favPokemons'));
      if (!addedToFavorites) {
        // if (pokemonKeys.length === 30) {
        //   console.log('Maximum number (30) of favorite pokemons reached.');
        //   return;
        // }
        setAddedToFavorites(true);
        favPokemons[pokemonKey] = {
          name: pokemonKey,
          imgUrl: pokemonImg
        };
        localStorage.setItem('favPokemons', JSON.stringify(favPokemons));
      } else {
        delete favPokemons[pokemonKey];
        if (!Object.keys(favPokemons).length) {
          localStorage.removeItem('favPokemons');
          setAddedToFavorites(false);
        } else {
          localStorage.setItem('favPokemons', JSON.stringify(favPokemons));
          setAddedToFavorites(false);
        }
      }
    } else {
      localStorage.setItem('favPokemons', JSON.stringify(
        {
          [pokemonKey]: {
            name: pokemonKey,
            imgUrl: pokemonImg
          }
        }
        ));
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
      let newResults = [];
      let i = 0;
      let index = 0;
      for (let pokemon of pokemons) {
        
        if ( i < 10) {
          if (pokemon["name"].includes(e.target.value.toLowerCase())) {
            // Index added so in the future I can add arrows to move between pokemons
            pokemon.index = index;
            newResults.push(pokemon);
            i++;
          }
          index++;
        } else {
          break;
        }
      };
      if (!newResults.length) {
        setHiddenResults(true);
        setResults([]);
        return;
      }
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
      window.scrollTo(top);
    } catch (err) {
      console.log(err);
    }
  }

  const onEnterClick =  async () => {
    if (selectedResult > -1) {
      const pokemonName = results[selectedResult].name;
      // console.log(pokemonName);
      setIsLoaderShown(true);
      try {
        const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
        const response = await fetch(url);
        const data = await response.json();
        setPokemonData(data);
        setRoute('resultsPage');
        window.scrollTo(top);
      } catch (err) {
        console.log(err);
      }
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

  const onFavPokemonClick = async (e) => {
    // setIsImageLoaded(false);
    setScrollPosition(window.scrollY);
    setIsLoaderShown(true);
    const pokemonKey = e.target.getAttribute('data-pokemon');
    try {
      const url = `https://pokeapi.co/api/v2/pokemon/${pokemonKey}`;
      const response = await fetch(url);
      const data = await response.json();
      setPokemonData(data);
      window.scrollTo(top);
      setRoute('resultsPage');
    } catch (err) {
      console.log(err);
    }
  }

  if (route === 'search') {
    return (
      <div className='search-route-wrapper'>
        <div className='svg-container' style={{display: !isImageLoaded && isLoaderShown ? 'flex' : 'none'}}>
              <img className='loader' src={rocket} alt='Loading image'></img>
        </div>
        <div className='nav-bar'>
          <span className='search-nav-btns'>
            <h1 className='go-to-favorites-button' onClick={() => {
              clearData();
              setRoute('favorites');
            }
            }>Go to Favorites</h1>
          </span>
        </div>
        <div className='title-and-searchbox-container'>
          <h1 className='pokesearch-title'>PokeSearch</h1>
          <Searchbar results={results} 
          hiddenResults={hiddenResults} 
          inputValue={inputValue}
          setInputValue={setInputValue}
          filterResults={filterResults}
          onResultClick={onResultClick}
          selectedResult={selectedResult}
          setSelectedResult={setSelectedResult}
          onEnterClick={onEnterClick}
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
              clearData();
              setRoute('search');
              // setScrollPosition(0);
              }}>
              Search
            </h1>
            <h1 className='back-to-favorites-button' onClick={() => {
              clearData();
              setRoute('favorites');
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
      <FavoritesRoute
        isImageLoaded={isImageLoaded}
        isLoaderShown={isLoaderShown}
        handleImageLoad={handleImageLoad}
        onFavPokemonClick={onFavPokemonClick}
        setFavoritesUpdated={setFavoritesUpdated}
        favoritesUpdated={favoritesUpdated}
        scrollPosition={scrollPosition}
        clearData={clearData}
        setRoute={setRoute}
        setScrollPosition={setScrollPosition}
      />
    )
  }
}

export default App;
