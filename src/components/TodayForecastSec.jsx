import React from "react";
import "../App.css";
import SUN_IMG from "../assets/images/sun_img.png";

function TodayForecastSec({data}) {
  const today = new Date().toISOString().slice(0, 10);
  const todayForecastList = data.list.filter((item) =>
    item.dt_txt.includes(today)
  );
  return (
    <section className="todayForecast_sec">
      <h1>TODAY'S FORECAST</h1>
      <ul>
        {todayForecastList?.map((v, i) => (
          <li key={i}>
            <h6>6:00 AM</h6>
            <img src={SUN_IMG} />
            <h5>{Math.floor((v.main.temp) - 273.15)}°C</h5>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default TodayForecastSec;
