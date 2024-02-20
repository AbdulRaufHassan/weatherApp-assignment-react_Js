import React from "react";
import "../App.css";
import SUN_IMG from "../assets/images/sun_img.webp";
import RAIN_IMG from "../assets/images/rain_img.png";
import FEW_CLOUDS_IMG from "../assets/images/sun_cloud_img.png";
import MOON_IMG from "../assets/images/moon_img.webp";
import SNOW_IMG from "../assets/images/snow_img.webp";

function CurrentTempSec({ data }) {
  let weather = data.list[0].weather[0];
  let img;
  let imgClass;
  const currentTime = new Date().getTime() / 1000;
  if (currentTime > data.city.sunrise && currentTime < data.city.sunset) {
    switch (true) {
      case weather.main == "Snow":
        img = SNOW_IMG;
        imgClass = "snow_img";
        break;
      case weather.main == "Rain":
        img = RAIN_IMG;
        imgClass = "rain_img";
        break;
      case weather.main == "Clear":
        img = SUN_IMG;
        imgClass = "sun_img";
        break;
      default:
        img = FEW_CLOUDS_IMG;
        imgClass = "few_cloud_img";
        break;
    }
  } else {
    img = MOON_IMG;
    imgClass = "moon_img";
  }

  return (
    <section className="current_temp_section">
      <div>
        <h1>{data.city.name}</h1>
        <p>Chance of rain: {Math.floor(data.list[0].pop * 100)}%</p>
        <h1>{Math.ceil(data.list[0].main.temp - 273.15)}°c</h1>
        <h6>{data.list[0].weather[0].main}</h6>
      </div>
      <div>
        <img src={img} className={imgClass} />
      </div>
    </section>
  );
}

export default CurrentTempSec;
