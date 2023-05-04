import React from "react";
import './BaseStats.css'

const BaseStats = ({pokemonData}) => {
  return (
    <div>
      <h1>Base stats</h1>
      <table>
        <tbody>
          {pokemonData.stats.map((item) => {
            return (
            <tr className="base-stat" key={item.stat.name}>
              <th className="base-stat-item" >{item.stat.name.toUpperCase()} : {item.base_stat}</th>
              <th className="barchart"></th>
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