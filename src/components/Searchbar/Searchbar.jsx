import React, {useState, useRef, useEffect} from "react";
import './Searchbar.css';


const Searchbar = ({results, hiddenResults, filterResults, inputValue, setInputValue, onResultClick, selectedResult, setSelectedResult, onEnterClick}) => {

  const inputRef = useRef(null);

  const onResultHover = (e) => {
    // const pokemonName = e.target.textContent;
    // setSelectedResult(pokemonName);
    if (results[selectedResult]) {
      console.log(results[selectedResult].name);
    }
    
  }

  // useEffect(() => {
  //   inputRef.current.focus();
  // },[]);

  const handleKeyPress = (e) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
    }
    if (results.length) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (selectedResult === results.length-1) {
          setSelectedResult(0);
          return;
        }
        setSelectedResult(selectedResult + 1);
        // setInputValue(results[selectedResult].name)
        // console.log(selectedResult);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (selectedResult <= 0 ) {
          setSelectedResult(results.length-1);
          return;
        }
        setSelectedResult(selectedResult-1)
      } else if (e.key === 'Enter') {
        onEnterClick();
      }
      
    }
  }

  return (
    <div className="searchbar-container">
      <input 
      ref={inputRef}
      onChange={(e) => {
        filterResults(e);
        if (e.target.value === '') {
          return setSelectedResult(-1);
        }
        if (selectedResult > - 1) {
          setSelectedResult(0);
        }
      }} placeholder="Search pokemons"
      spellCheck={false}
      style={{borderRadius: hiddenResults === false ? '10px 10px 0 0' : '10px'}}
      onKeyDown={(e) => handleKeyPress(e)}
      />
      <div className="search-results" hidden={hiddenResults}>
        {results.map((result) => {
          return <h3 onClick={(e) => onResultClick(e)} 
          // onMouseOver={(e) => onResultHover(e)}
          className={`search-result ${results[selectedResult] && results[selectedResult].name === result.name ? 'selected' : ''}`}
          data-url={result.url} 
          key={result.url}
          // style={{background: results[selectedResult] && results[selectedResult].name === result.name ? 'orange' : 'rgb(161, 153, 138)'}}
          >
          {result.name}
          </h3>
        })}
      </div>
    </div>
  )
}

export default Searchbar;