import React from "react";
import './Pokedex.css'

const Pokedex = ({pokemonData}) => {

  const types = pokemonData.types;

  return (
    <div className="pokedex-wrapper">
      <h2 className="subcomponent-title">Pokedex data</h2>
      <table>
        <tbody>
          <tr className="pokedex-data">
            <th>
            Types : {types.map((type) => {
              const name = type.type.name;
              return <span key={name} className={`type type-${name}`}>{`${name[0].toUpperCase()}${name.slice(1)}`}</span>
            })}
            </th>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Pokedex;