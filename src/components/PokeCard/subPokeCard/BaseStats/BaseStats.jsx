import React from "react";
import './BaseStats.css'

const BaseStats = ({pokemonData}) => {
  return (
    <div>
      <h1>Base stats</h1>
      <table>
        <tbody>
          {pokemonData.stats.map((item) => {
            const pokeName = item.stat.name;
            const baseStat = item.base_stat;
            return (
            <tr className="base-stat" key={pokeName}>
              <th className="base-stat-item" >{pokeName.toUpperCase()} : {baseStat}</th>
              <td className="barchart-container">
                {/* 255 is the highest possible base stat */}
                <div className="barchart" id={`${pokeName}`} style={{width: `${baseStat/255 * 100}%`}}></div>
              </td>
            </tr>

            )
            
          })}
        </tbody>
      </table>
      {/* <h3>HP : {pokemonData.stats[0].base_stat}</h3>
      <h3>Height : {pokemonData.height}</h3>
      <h3>Attack : {pokemonData.stats[1].base_stat}</h3>
      <h3>Defense : {pokemonData.stats[2].base_stat}</h3>
      <h3>Speed : {pokemonData.stats[5].base_stat}</h3> */}
    </div>
  )
}

export default BaseStats;