import { useEffect, useState } from "react";
import "./App.css";
import CurrentTempSec from "./components/CurrentTempSec";
import DaysForecastSec from "./components/DaysForecastSec";
import AirConditionsSec from "./components/AirConditionsSec";

function App() {
  const [loading, setLoading] = useState(true);
  const [cityName, setCityName] = useState("");
  const [weatherData, setWeatherData] = useState([]);

  const fetchWeatherData = async (cityName) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=22b66a2492e462c12e382d5cd409f6bb`
      );
      const data = await response.json();
      setWeatherData(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchWeatherData("karachi");
  }, []);
  return (
    <>
      {!loading ? (
        <div className="main_container">
          <div>
            <input
              type="text"
              placeholder="Enter country / city name"
              value={cityName}
              onChange={(e) => setCityName(e.target.value)}
            />
            <button
              disabled={!cityName}
              onClick={() => {
                setLoading(true);
                fetchWeatherData(cityName);
              }}
            >
              Search
            </button>
            <CurrentTempSec data={weatherData} />
            <AirConditionsSec data={weatherData} />
          </div>
          <div>
            <DaysForecastSec data={weatherData} />
          </div>
        </div>
      ) : (
        <div className="loading">
          <h1>Loading...</h1>
        </div>
      )}
    </>
  );
}

export default App;
