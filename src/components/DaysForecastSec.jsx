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

  const setImg_Class_dis = (avrg_Temp, weather) => {
    let img = FEW_CLOUDS_IMG;
    let imgClass = "few_cloud_img";
    let weatherDis = "few clouds";
    switch (true) {
      case avrg_Temp < 0:
        img = SNOW_IMG;
        imgClass = "snow_img";
        weatherDis = "Snow";
        break;
      case avrg_Temp >= 0 && avrg_Temp < 10:
        img = RAIN_IMG;
        imgClass = "rain_img";
        weatherDis = "Rain";
        break;
      case avrg_Temp >= 10 && avrg_Temp <= 15:
        img = CLOUD_IMG;
        imgClass = "cloud_img";
        weatherDis = "Clouds";
        break;
      case avrg_Temp > 20:
        img = SUN_IMG;
        imgClass = "sun_img";
        weatherDis = "Clear";
        break;
    }
    return { img, imgClass, weatherDis };
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

          const { img, imgClass, weatherDis } = setImg_Class_dis(
            Math.ceil(averageTemp - 273.15),
            inner_arr[0].weather[0]
          );
          return (
            <li key={i}>
              <p>{new Date(inner_arr[0].dt_txt).toDateString().slice(0, 4)}</p>
              <span>
                <img src={img} className={imgClass} />
                <h6>{weatherDis}</h6>
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
