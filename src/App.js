import "./App.css";
import Search from "./components/search/search";
import { WEATHER_API_KEY, WEATHER_API_URL } from "./api";

import CurrentWeather from "./components/current-weather/current-weather";
import { useState } from "react";
function App() {
  const [currentweather, setCurrentweather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const handleOnsearchChange = (searchdata) => {
    const [lat, lon] = searchdata.value.split("");

    const CurrentWeather = fetch(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}`
    );
    const forecastFetch = fetch(
      `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}`
    );
    Promise.all([CurrentWeather, forecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();
        setCurrentweather({ city: searchdata.label, ...weatherResponse });
        setForecast({ city: searchdata.label, ...forecastResponse });
      })
      .catch((err) => console.log(err));
  };
  console.log(currentweather);
  console.log(forecast);
  return (
    <div className="container">
      <Search onSearchChange={handleOnsearchChange} />
      {currentweather && <CurrentWeather data={currentweather} />}
    </div>
  );
}

export default App;
