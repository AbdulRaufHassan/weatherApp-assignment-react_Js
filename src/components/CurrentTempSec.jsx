import React from "react";
import "../App.css";
import SUN_IMG from "../assets/images/sun_img.webp";
import CLOUD_IMG from "../assets/images/cloud_img.png";
import RAIN_IMG from "../assets/images/rain_img.png";
import FEW_CLOUDS_IMG from "../assets/images/sun_cloud_img.png";
import MOON_IMG from "../assets/images/moon_img.webp";

function CurrentTempSec({ data }) {
  let img;
  let imgClass;
  let weather = data.list[0].weather[0].icon;
  switch (weather) {
    case "01d":
      img = SUN_IMG;
      imgClass = "sun_img";
      break;
    case "01n":
    case "02n":
    case "03n":
      img = MOON_IMG;
      imgClass = "moon_img";
      break;
    case "02d":
    case "03d":
    case "04d":
      img = CLOUD_IMG;
      imgClass = "cloud_img";
      break;
    case "09d":
    case "10d":
      img = RAIN_IMG;
      imgClass = "rain_img";
      break;
    default:
      img = FEW_CLOUDS_IMG;
      imgClass = "few_cloud_img";
      break;
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