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
      } else if (typeof value === 'string' && value.startsWith('http')) {
        imageUrls.push(value); // Adding the image URL to the array
      }
    });
  
    return imageUrls; // Return the accumulated image URLs
  }

  const imgUrls = extractImageUrls(sprites);
  

  // {for (let item of Object.keys(sprites)) {
  //   console.log(sprites[item])
  // }}

  return (
    <div className="sprites-container">
      {imgUrls.map((url) => {
        return (
          <img className="sprite-img" key={url} src={url}></img>
        )
      })}
    </div>
  )
}

export default Sprites;