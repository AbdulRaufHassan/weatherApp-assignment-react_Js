import React from "react";
import "../App.css";
import { FaRegEye, FaShower, FaThermometerThreeQuarters, FaWind } from "react-icons/fa";
import { WiSunrise } from "react-icons/wi";
import { TbSunset2 } from "react-icons/tb";

function AirConditionsSec({ data }) {
  let sunSet = new Date(data.city.sunset * 1000).toTimeString().slice(0,5)
  let sunRise = new Date(data.city.sunrise * 1000).toTimeString().slice(0,5)
  return (
    <>
      <section className="airConditions_section">
        <h1>AIR CONDITIONS</h1>
        <ul>
          <li>
            <FaThermometerThreeQuarters className="icon" />
            <div>
              <h6>REAL FEEL</h6>
              <span>{Math.ceil((data.list[0].main.feels_like) - 273.15)}°c</span>
            </div>
          </li>
          <li>
            <FaWind className="icon" />
            <div>
              <h6>WIND</h6>
              <span>{(data.list[0].wind.speed * 3.6).toFixed(2)} km/h</span>
            </div>
          </li>
          <li>
            <FaShower className="icon" />
            <div>
              <h6>HUMIDITY</h6>
              <span>{Math.floor(data.list[0].main.humidity)}%</span>
            </div>
          </li>
          <li>
            <FaRegEye className="icon" />
            <div>
              <h6>VISIBILTITY</h6>
              <span>{Math.floor(data.list[0].visibility / 1000)} km</span>
            </div>
          </li>
          <li>
            <WiSunrise  className="icon" />
            <div>
              <h6>SUNSET</h6>
              <span>{sunSet}</span>
            </div>
          </li>
          <li>
            <TbSunset2  className="icon" />
            <div>
              <h6>SUNRISE</h6>
              <span>{sunRise}</span>
            </div>
          </li>
        </ul>
      </section>
    </>
  );
}

export default AirConditionsSec;
