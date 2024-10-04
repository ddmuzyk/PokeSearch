import React, {useRef} from "react";
import './Searchbar.css';
import { Keys } from "../../constants/constants";


const Searchbar = ({results, hiddenResults, filterResults, onResultClick, selectedResult, setSelectedResult, onEnterClick}) => {

  const inputRef = useRef(null);

  const handleKeyPress = (e) => {
    if (e.key === Keys.ArrowDown || e.key === Keys.ArrowUp) {
      e.preventDefault();
    }
    if (results.length) {
      if (e.key === Keys.ArrowDown) {
        e.preventDefault();
        if (selectedResult === results.length-1) {
          setSelectedResult(0);
          return;
        }
        setSelectedResult(selectedResult + 1);
      } else if (e.key === Keys.ArrowUp) {
        e.preventDefault();
        if (selectedResult <= 0 ) {
          setSelectedResult(results.length-1);
          return;
        }
        setSelectedResult(selectedResult-1)
      } else if (e.key === Keys.Enter) {
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
          className={`search-result ${results[selectedResult] && results[selectedResult].name === result.name ? 'selected' : ''}`}
          data-url={result.url} 
          key={result.url}
          >
          {result.name}
          </h3>
        })}
      </div>
    </div>
  )
}

export default Searchbar;