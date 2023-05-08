import React from "react";
import './Pokedex.css'

const Pokedex = ({pokemonData}) => {

  const types = pokemonData.types;
  const height = String(pokemonData.height);
  const weight = String(pokemonData.weight);
  let abilities = pokemonData.abilities;
  let notUnique = [];
  {for (let item of abilities) {
    notUnique.push(item.ability.name);
  }}
  let uniObj = {};
  {for (let item of notUnique) {
    if (!uniObj[item]) {
      uniObj[item] = true;
    }
  }}
  abilities = Object.keys(uniObj);

  return (
    <div className="pokedex-wrapper">
      <h2 className="subcomponent-title" id="subcomponent-title">Pokedex data</h2>
      <table className="pokedex-table">
        <tbody className="pokedex-container">
          <tr className="pokedex-data ">
            <td className="type-data">
            {types.length === 1 ? 'Type' : 'Types'} : 
            </td>
            {types.map((type) => {
              const name = type.type.name;
              return <td key={name} className={`type type-${name}`}>
                <span className="poke-type">{`${name[0].toUpperCase()}${name.slice(1)}`}</span>
              </td>
            })}
          </tr>
          <tr className="pokedex-data">
            <td className="type-data">Height : </td>
            <td className="data-value" id="data-value">{`${height/10} m`}</td>
          </tr>
          <tr className="pokedex-data">
            <td className="type-data">Weight :</td>
            <td className="data-value" id="data-value">{`${weight/10} kg`}</td>
          </tr>
          <tr className="pokedex-data">
            <td className="type-data">
              {abilities.length === 1 ? "Ability :" : 'Abilities :'} 
            </td>
            <td>
              <ol>
                {abilities.map((ability) => {
                  return <li className="data-value" id="data-value" key={ability}>{`${ability[0].toUpperCase()}${ability.slice(1)}`}</li>
                })}
              </ol>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Pokedex;