import { useState, useEffect} from 'react';
import pokemons from "./constants/pokemons";
import rocket from './rocket.svg';
import FavoritesRoute from './containers/FavoritesRoute/FavoritesRoute';
import Searchbar from './components/Searchbar/Searchbar';
import PokeCard from './components/PokeCard/PokeCard';
import Footer from './components/Footer/Footer';
import Error from './components/Error/Error';
import './App.css';
import { Urls, Routes, storageItem, pokemonDataAttribute } from './constants/constants';
import { getPokemonsFromStorage } from './utils/utils';

function App() {
  const [results, setResults] = useState([]);
  const [hiddenResults, setHiddenResults] = useState(true);
  const [inputValue, setInputValue] = useState('');
  const [pokemonData, setPokemonData] = useState({});
  const [route, setRoute] = useState(Routes.Search);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isLoaderShown, setIsLoaderShown] = useState(false);
  const [addedToFavorites, setAddedToFavorites] = useState(false);
  const [favoritesUpdated, setFavoritesUpdated] = useState(false);
  const [selectedResult, setSelectedResult] = useState(-1);
  const [scrollPosition, setScrollPosition] = useState(0);
  const favPokemons = JSON.parse(localStorage.getItem(storageItem)) ? JSON.parse(localStorage.getItem(storageItem)) : null;

  useEffect(() => {
    if (route === Routes.Search) {
      document.title = "PokeSearch";
    } else if (route === Routes.ResultsPage) {
      const pokemonName = pokemonData.name;
      document.title = `${pokemonName[0].toUpperCase()}${pokemonName.slice(1, pokemonName.length)} | PokeSearch`;
    } else if (route === Routes.Favorites) {
      document.title = 'Favorites | PokeSearch';
    } else if (route === Routes.Error) {
      document.title = 'Ooops!';
    }
    
  }, [route])

  const handleImageLoad = () => {
    setIsImageLoaded(true);
    setIsLoaderShown(false);
  };

  const clearData = () => {
    setInputValue('');
    setPokemonData({});
    setResults([]);
    setHiddenResults(true);
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
    Urls.UnknownPokemon;
  

    if (favPokemons) {
      if (!addedToFavorites) {
        setAddedToFavorites(true);
        favPokemons[pokemonKey] = {
          name: pokemonKey,
          imgUrl: pokemonImg
        };
        localStorage.setItem(storageItem, JSON.stringify(favPokemons));
      } else {
        delete favPokemons[pokemonKey];
        if (!Object.keys(favPokemons).length) {
          localStorage.removeItem(storageItem);
          setAddedToFavorites(false);
        } else {
          localStorage.setItem(storageItem, JSON.stringify(favPokemons));
          setAddedToFavorites(false);
        }
      }
    } else {
      localStorage.setItem(storageItem, JSON.stringify(
        {
          [pokemonKey]: {
            name: pokemonKey,
            imgUrl: pokemonImg
          }
        }
        ));
      setAddedToFavorites(true);
    }
  }

  const filterResults = (e) => {
    
    setInputValue(e.target.value);
    if (!e.target.value) {
      setResults([]);
      setHiddenResults(true);
      return;
    } else {
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
      if (!newResults.length) {
        setHiddenResults(true);
        setResults([]);
        return;
      }
      setResults(newResults);
      setHiddenResults(false);
    }
  }

  const extractEvolutionData = () => {
    const species = [];
  
    const recursiveExtraction = (data) => {
      if (!data.evolves_to.length) {
        species.push(data.species.name);
      } else {
        species.push(data.species.name);
        recursiveExtraction(data.evolves_to[0]);
      }
    };
  
    return (data) => {
      recursiveExtraction(data);
      return species;
    };
  };

  const onFetchError = () => {
    setRoute(Routes.Error);
    setIsLoaderShown(false);
    clearData();
  }

  // Async help function to fetch other pokemon data
  const fetchSpeciesAndEvolutions = async (url) => {

    try {
      const response = await fetch(url);
      const data = await response.json();
      const evolutionUrl = data.evolution_chain?.url;
  
      if (evolutionUrl) {
        try {
          const evolutionResponse = await fetch(evolutionUrl);
          const evolutionData = await evolutionResponse.json();
          const extract = extractEvolutionData();
          const species = extract(evolutionData.chain);
          return species;
        } catch (error) {
          console.error("Error occurred during data fetching:", error);
          onFetchError();
        }
      } else {
        console.log("No evolution data available.");
      }
    } catch (error) {
      console.error("Error occurred during data fetching:", error);
      onFetchError();
    }
  };

  const fetchPokemonData = async(pokemonName) => {
    try {
      const url = `${Urls.BasePokemon}${pokemonName}`;
      const response = await fetch(url);
      const data = await response.json();
      const speciesUrl = data.species.url;
      const evolutions = await fetchSpeciesAndEvolutions(speciesUrl);
      data.evolutions = evolutions;
      setPokemonData(data);
      setRoute(Routes.ResultsPage);
      window.scrollTo(top);
    } catch (err) {
      console.log(err);
      onFetchError();
    }
  }

  const onResultClick = async (e) => {
    const pokemonName = e.target.textContent;
    setIsLoaderShown(true);
    await fetchPokemonData(pokemonName);
  }

  const onEnterClick =  async () => {
    if (selectedResult > -1) {
      const pokemonName = results[selectedResult].name;
      setIsLoaderShown(true);
      await fetchPokemonData(pokemonName);
    }
  }

  const onFavPokemonClick = async (e) => {
    setScrollPosition(window.scrollY);
    setIsLoaderShown(true);
    const pokemonName = e.target.getAttribute(pokemonDataAttribute);
    await fetchPokemonData(pokemonName);
  }

  const onEvolutionBtnClick = async(pokemon) => {
    setIsImageLoaded(false);
    setIsLoaderShown(true);
    setRoute(Routes.ResultsPage);
    setAddedToFavorites(false);
    await fetchPokemonData(pokemon);
  }

  const checkLocalStorageForFavorites = () => {
    if (localStorage.getItem(storageItem)) {
      const favPokemons = JSON.parse(localStorage.getItem(storageItem));
      const pokemonName = pokemonData.name;
      if (favPokemons[pokemonName] && favPokemons[pokemonName].name === pokemonName) {
        setAddedToFavorites(true);
      }
    }
  }


  if (route === Routes.Search) {
    return (
      <>
        <div className='search-route-wrapper'>
          <div className='svg-container' style={{display: !isImageLoaded && isLoaderShown ? 'flex' : 'none'}}>
              <img className='loader' src={rocket} alt='Loading image'></img>
          </div>
          <div className='nav-bar'>
            <span className='search-nav-btns'>
              <h1 className='go-to-favorites-button' onClick={() => {
                clearData();
                setRoute(Routes.Favorites);
              }
              }>Go to Favorites</h1>
            </span>
          </div>
          <div className='title-and-searchbox-container'>
            <h1 className='pokesearch-title'>PokeSearch</h1>
            <Searchbar results={results} 
            hiddenResults={hiddenResults} 
            filterResults={filterResults}
            onResultClick={onResultClick}
            selectedResult={selectedResult}
            setSelectedResult={setSelectedResult}
            onEnterClick={onEnterClick}
            />
          </div>
          <div className='search-footer-container'>
            <footer className='search-route-footer'>
              <p className='search-footer-text'>Pokémon images & names © 1995-2024 Nintendo/Game Freak. Data from PokéAPI.</p>
            </footer>
          </div>
        </div>
      </>
    )
  } else if (route === Routes.ResultsPage) {
    return (
      <div className='results-route-wrapper'>
        <div className='svg-container' style={{display: !isImageLoaded && isLoaderShown ? 'flex' : 'none'}}>
          <img className='loader' src={rocket} alt='Loading image'></img>
        </div>
        <div className='nav-bar'>
          <div className='buttons-container'>
            <h1 className='back-button' onClick={() => {
              clearData();
              setRoute(Routes.Search);
              window.scrollTo(top);
              }}>
              Search
            </h1>
            <h1 className='back-to-favorites-button' onClick={() => {
              clearData();
              setRoute(Routes.Favorites);
            }}>Favorites</h1>
          </div>
        </div>
        
        <PokeCard pokemonData={pokemonData}
        handleImageLoad={handleImageLoad}
        checkLocalStorageForFavorites={checkLocalStorageForFavorites}
        addedToFavorites={addedToFavorites}
        onAddToFavoritesClick={onAddToFavoritesClick}
        onEvolutionBtnClick={onEvolutionBtnClick}
        />
        <Footer/>
      </div>
      )
  } else if (route === Routes.Favorites) {

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
  } else if (route === Routes.Error) {
    return (
      <div className='error-route-wrapper'>
        <Error
          clearData={clearData}
          setAddedToFavorites={setAddedToFavorites}
          setRoute={setRoute}
        />
      </div>
    )
  }
}

export default App;
