import { useState, useEffect } from 'react';
import pokemons from "./constants/pokemons";
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg';
import rocket from './rocket.svg';
import FavoritesRoute from './containers/FavoritesRoute/FavoritesRoute';
import Searchbar from './components/Searchbar/Searchbar';
import PokeCard from './components/PokeCard/PokeCard';
import FavPokeCard from './components/FavPokeCard/FavPokeCard';
import Footer from './components/Footer/Footer';
import Error from './components/Error/Error';
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
    } else if (route === 'error') {
      document.title = 'Ooops!';
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
      // let favPokemons = JSON.parse(localStorage.getItem('favPokemons'));
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

  // Getting data to display the proper pokemon image in evolutions tab
  // const getData = (array, name) => {
  //   const filtered = array.filter(item => item !== name);
  //   let pokemonInfo = {}
  //   const loopAndFetch = async() => {
  //     for (let i = 0; i < filtered.length; i++) {
  //       const name = filtered[i]
  //       const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
  //       const data = await response.json();
  //       const img = await data.sprites.other['official-artwork'].front_default;
  //       const id = await data.id;
  //       pokemonInfo[name] = {
  //         name: name,
  //         img: img,
  //         id: id
  //       };
  //     }
  //   }

  //   return async() => {
  //     await loopAndFetch();
  //     return pokemonInfo;
  //   }
  // }

  // Function to extract evolution data
  const extractEvolutionData = () => {
    const species = [];
  
    const recursiveExtraction = (data) => {
      if (!data.evolves_to.length) {
        species.push(data.species.name);
      } else {
        // console.log(data.evolves_to)
        species.push(data.species.name);
        recursiveExtraction(data.evolves_to[0]);
      }
    };
  
    return (data) => {
      recursiveExtraction(data);
      return species;
    };
  };

  // Function that runs when fetching data responds with an error
  const onFetchError = () => {
    setRoute('error');
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
          // console.log(species)
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

  // Helper function to fetch pokemon data
  const fetchPokemonData = async(pokemonName) => {
    try {
      const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
      const response = await fetch(url);
      const data = await response.json();
      const speciesUrl = data.species.url;
      const evolutions = await fetchSpeciesAndEvolutions(speciesUrl);
      // const getPokemonData = getData(evolutions, data.name);
      // const pokeDataObject = await getPokemonData();
      data.evolutions = evolutions;
      setPokemonData(data);
      setRoute('resultsPage');
      window.scrollTo(top);
    } catch (err) {
      console.log(err);
      onFetchError();
    }
  }

  // Display the searched pokemon when user clicks on a result
  const onResultClick = async (e) => {
    const pokemonName = e.target.textContent;
    setIsLoaderShown(true);
    await fetchPokemonData(pokemonName);
  }

  const onEnterClick =  async () => {
    if (selectedResult > -1) {
      const pokemonName = results[selectedResult].name;
      // console.log(pokemonName);
      setIsLoaderShown(true);
      await fetchPokemonData(pokemonName);
    }
  }

  const onFavPokemonClick = async (e) => {
    // setIsImageLoaded(false);
    setScrollPosition(window.scrollY);
    setIsLoaderShown(true);
    const pokemonName = e.target.getAttribute('data-pokemon');
    await fetchPokemonData(pokemonName);
  }

  const onEvolutionBtnClick = async(pokemon) => {
    setIsImageLoaded(false);
    setIsLoaderShown(true);
    setAddedToFavorites(false);
    // const pokemonName = e.target.getAttribute('data-pokemon');
    await fetchPokemonData(pokemon);
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


  if (route === 'search') {
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
        <div className='search-footer-container'>
          <footer className='search-route-footer'>
            <p className='search-footer-text'>Pokémon images & names © 1995-2023 Nintendo/Game Freak. Data from PokéAPI.</p>
          </footer>
        </div>
      </div>
      </>
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
              window.scrollTo(top);
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
        onEvolutionBtnClick={onEvolutionBtnClick}
        />
        <Footer/>
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
  } else if (route === 'error') {
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
