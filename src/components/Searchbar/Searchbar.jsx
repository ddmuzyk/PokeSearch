import React, {useState} from "react";
import './Searchbar.css';


const Searchbar = ({results, hiddenResults, filterResults, inputValue, onResultClick}) => {

  return (
    <div className="searchbar-container">
      <input onChange={(e) => filterResults(e)} placeholder="Search for your favorite pokemon!"
      style={{borderRadius : hiddenResults === false ? '10px 10px 0 0' : '10px'}}
      />
      <div className="search-results" hidden={hiddenResults}>
        {results.map((result) => {
          return <h3 onClick={(e) => onResultClick(e)} className="search-result" data-url={result.url} key={result.url}>{result.name}</h3>
        })}
      </div>
    </div>
  )
}

export default Searchbar;