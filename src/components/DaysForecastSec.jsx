import React from "react";
import "../App.css";
import SUN_IMG from "../assets/images/sun_img.webp";
import CLOUD_IMG from "../assets/images/cloud_img.png";
import RAIN_IMG from "../assets/images/rain_img.png";
import FEW_CLOUDS_IMG from "../assets/images/sun_cloud_img.png";
import SNOW_IMG from "../assets/images/snow_img.webp";

function DaysForecastSec({ data }) {
  const forecastByDay = data.list.reduce((accumulator, current) => {
    if (
      current.dt_txt.split(" ")[0] != new Date().toISOString().slice(0, 10) &&
      accumulator.length > 0 &&
      current.dt_txt.split(" ")[0] ==
        accumulator[accumulator.length - 1][0].dt_txt.split(" ")[0]
    ) {
      accumulator[accumulator.length - 1].push(current);
    } else if (
      current.dt_txt.split(" ")[0] != new Date().toISOString().slice(0, 10)
    ) {
      accumulator.push([current]);
    }
    return accumulator;
  }, []);

  const setImg_Class_dis = (weather) => {
    let img = FEW_CLOUDS_IMG;
    let imgClass = "few_cloud_img";
    switch (weather.main) {
      case "Snow":
        img = SNOW_IMG;
        imgClass = "snow_img";
        break;
      case "Rain":
        img = RAIN_IMG;
        imgClass = "rain_img";
        break;
      case "Clouds" && weather.discription != "few clouds":
        img = CLOUD_IMG;
        imgClass = "cloud_img";
        break;
      case "Clear":
        img = SUN_IMG;
        imgClass = "sun_img";
        break;
    }
    return { img, imgClass };
  };

  return (
    <section className="fiveDays_forecast_sec">
      <h1>5-DAYS FORECAST</h1>
      <ul>
        {forecastByDay.map((inner_arr, i) => {
          let totalTemp = inner_arr.reduce(
            (acc, cur) => acc + cur.main.temp,
            0
          );
          let averageTemp = totalTemp / inner_arr.length;
          let weather = inner_arr[0].weather[0];

          const { img, imgClass } = setImg_Class_dis(weather);
          return (
            <li key={i}>
              <p>{new Date(inner_arr[0].dt_txt).toDateString().slice(0, 4)}</p>
              <span>
                <img src={img} className={imgClass} />
                <h6>{weather.main}</h6>
              </span>
              <h6>{Math.ceil(averageTemp - 273.15)}°c</h6>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default DaysForecastSec;
