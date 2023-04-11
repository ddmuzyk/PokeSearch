import { useState, useEffect } from 'react';
import pokemons from "./constants/pokemons";
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg';
import rocket from'./rocket.svg';
import Searchbar from './components/Searchbar/Searchbar';
import PokeCard from './components/PokeCard/PokeCard';
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

  const handleImageLoad = () => {
    setIsImageLoaded(true);
    setIsLoaderShown(false);
  };

  // useEffect(() => {
  //   if (Object.keys(pokemonData).length) {
  //     console.log(pokemonData.sprites.other['official-artwork']);
  //     setRoute('resultsPage');
  //   }
  // }, [pokemonData]);

  const clearData = () => {
    setInputValue('');
    setPokemonData({});
    setResults([]);
    setHiddenResults(true);
    setRoute('search');
    setIsImageLoaded(false);
  }

  const filterResults = (e) => {
    setInputValue(e.target.value);
    if (!e.target.value) {
      setResults(results => []);
      setHiddenResults(true);
      return;
    } else {
      // let newResults = pokemons.filter((pokemon) => {
      //   return pokemon.name.includes(e.target.value);
      // })
      let newResults = [];
      let i = 0;
      for (let pokemon of pokemons) {
        if ( i < 10) {
          if (pokemon.name.includes(e.target.value.toLowerCase())) {
            newResults.push(pokemon);
            i++;
          }
        } else {
          break;
        }
      };
      if (!newResults.length) {
        setHiddenResults(true);
        return;
      }
      setResults(results => newResults);
      setHiddenResults(false);
    }
  }

  // Display the searched pokemon when user clicks on a result
  const onResultClick = async (e) => {
    setIsLoaderShown(true);
    try {
      const url = e.target.getAttribute('data-url');
      const response = await fetch(url);
      const data = await response.json();
      setPokemonData(data);
      setRoute('resultsPage');
    } catch (err) {
      console.log(err);
    }
  }

  if (route === 'search') {
    return <div className='App'>
      <h1 className='pokesearch-title'>PokeSearch</h1>
      <Searchbar results={results} 
      hiddenResults={hiddenResults} 
      inputValue={inputValue}
      filterResults={filterResults}
      onResultClick={onResultClick}
      />
      <div className='svg-container' style={{display: !isImageLoaded && isLoaderShown ? 'flex' : 'none'}}>
        <img className='loader' src={rocket} alt='Loading image'></img>
      </div>
    </div>
  } else if (route === 'resultsPage') {
    return (
      <div className='App'>
        <div className='svg-container' style={{display: !isImageLoaded && isLoaderShown ? 'flex' : 'none'}}>
          <img className='loader' src={rocket} alt='Loading image'></img>
        </div>
        <h1 className='back-button' onClick={clearData}>Back to search</h1>
        <h1 className='favorites-button'>Add to favorites</h1>
        <PokeCard pokemonData={pokemonData}
        handleImageLoad={handleImageLoad}
        />
      </div>)
  } 

//   return (
//     <div className="App">
//     {if (route) {
//     }}
//       <h1 className='back-button'>Back to search</h1>
//       <h1 className='favorites-button'>Add to favorites</h1>
//       <PokeCard/>
//     </div>
//   )
}

export default App;
