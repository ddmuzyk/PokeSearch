import React from "react";
import './ToggleSwitch.css';

const ToggleSwitch = () => {
  return (
    <div className="switch-container">
      <label className="switch">
        <input onClick={() => console.log('click')} type="checkbox"></input>
        <span className="slider round"></span>
      </label>
    </div>
  )
}

export default ToggleSwitch;