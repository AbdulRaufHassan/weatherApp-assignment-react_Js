import React from "react";
import "../App.css";
import SUN_IMG from "../assets/images/sun_img.webp";
import CLOUD_IMG from "../assets/images/cloud_img.png";
import RAIN_IMG from "../assets/images/rain_img.png";
import FEW_CLOUDS_IMG from "../assets/images/sun_cloud_img.png";
import MOON_IMG from "../assets/images/moon_img.webp";

function DaysForecastSec({ data }) {

  const unsorted_forecast_arr = data.list.reduce((accumulator, current) => {
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

  let averageTempArr = []
  unsorted_forecast_arr.forEach((inner_arr) => {
    let totalTemp = 0;
    inner_arr.forEach((forecast) => {
      totalTemp += forecast.main.temp;
    });
    averageTempArr.push(totalTemp / inner_arr.length)
  });

  // const setWeatherImg = (v) => {
  //   let img;
  //   let imgClass;
  //   let weather = v.weather[0].icon;
  //   switch (weather) {
  //     case "01d":
  //       img = SUN_IMG;
  //       imgClass = "sun_img";
  //       break;
  //     case "01n":
  //     case "02n":
  //       img = MOON_IMG;
  //       break;
  //     case "02d":
  //     case "03d":
  //     case "04d":
  //       img = CLOUD_IMG;
  //       imgClass = "cloud_img";
  //       break;
  //     case "09d":
  //     case "10d":
  //       img = RAIN_IMG;
  //       imgClass = "rain_img";
  //       break;
  //     default:
  //       img = FEW_CLOUDS_IMG;
  //       imgClass = "few_cloud_img";
  //       break;
  //   }
  //   return { img, imgClass };
  // };
  return (
    <section className="fiveDays_forecast_sec">
      <h1>5-DAYS FORECAST</h1>
      <ul>
        {averageTempArr.map((averg_temp, i) => {
          // const { img, imgClass } = setWeatherImg(v);
          return (
            <li key={i}>
              <p>{new Date(unsorted_forecast_arr[i][0].dt_txt).toDateString().slice(0, 4)}</p>
              <span>
                <img src={SUN_IMG} className="sun_img"/>
                <h6>Suuny</h6>
              </span>
              <h6>{Math.ceil(averg_temp - 273.15)}°c</h6>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default DaysForecastSec;
