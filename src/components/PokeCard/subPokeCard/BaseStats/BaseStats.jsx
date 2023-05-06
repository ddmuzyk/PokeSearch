import React from "react";
import './BaseStats.css'

const BaseStats = ({pokemonData}) => {
  return (
    <div className="base-stats-wrapper">
      <h2 className="subcomponent-title">Base stats</h2>
      <table>
        <tbody className="base-stats-container">
          {pokemonData.stats.map((item) => {
            const stat = item.stat.name;
            const baseStat = item.base_stat;
            return (
            
            <tr className="base-stat" key={stat}>
              <th className="base-stat-item" >{stat !== 'hp' ? `${stat[0].toUpperCase()}${stat.slice(1)}` : stat.toUpperCase()} : <span className="pokefont">{baseStat}</span></th>
              {/* <td className="barchart-container">
                <div className="barchart" id={`${stat}`} style={{width: `${baseStat/255 * 100}%`}}></div>
              </td> */}
            </tr>

            )
            
          })}
        </tbody>
      </table>
    </div>
  )
}

export default BaseStats;