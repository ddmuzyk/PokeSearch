import React, {useState} from "react";
import './Sprites.css';

const Sprites = ({pokemonData}) => {

  const [spriteUrls, setSpriteUrls] = useState({})
  const sprites = pokemonData.sprites;
  
  const extractImageUrls = (obj) => {
    const imageUrls = [];
  
    Object.entries(obj).forEach(([key, value]) => {
      if (typeof value === 'object' && value !== null) {
        imageUrls.push(...extractImageUrls(value)); // Recursive call for nested objects
      } else if (typeof value === 'string' && value.startsWith('http') && !value.includes('generation')) {
        imageUrls.push(value);
      }
    });
  
    return imageUrls; 
  }

  const imgUrls = extractImageUrls(sprites);

  if (imgUrls.length) return (
    <div className="sprites-wrapper">
      <span className="sprites-title-container">
        <h2 className="subcomponent-title" id="sprites-title">Sprites</h2>
      </span>
      <div className="sprites-container">
        {imgUrls.map((url) => {
          return (
            <div className="sprite-img-container" key={url}>
              <img className="sprite-img" src={url}></img>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Sprites;