import React from "react";
import './Error.css';
import { Routes } from "../../constants/constants";

const Error = ({setRoute, setAddedToFavorites, clearData}) => {
  return (
    <div className="error-container">
      <h1 className="error-header">Ooooops!</h1>
      <h2 className="error-message">We couldn't find what you were looking for...</h2>
      <div className="error-btns-container">
        <button className="error-btn" onClick={() => {
          clearData();
          setAddedToFavorites(false);
          setRoute('search');
          }}
          >Back to search</button>
        <button className="error-btn" onClick={() => {
          clearData();
          setAddedToFavorites(false);
          setRoute(Routes.Favorites);
        }}
        >Back to favorites</button>
      </div>
    </div>
  )
}

export default Error;