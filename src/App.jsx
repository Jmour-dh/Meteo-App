import styles from "./App.module.scss";
import Search from "./components/search/Search";
import CurrentWeather from "./components/search/current-weather/current-weather";
import { WEATHER_API_URL, WEATHER_API_KEY } from "./api";
import { useState } from "react";
import Forecast from "./components/search/forecast/Forecast";
import axios from 'axios';


function App() {
  const [currentWeather, setCurrentWeather] = useState(null)
  const [forcecast, setForcecast] = useState(null)

  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");
    const lang = 'fr';
    const currentWeatherFetch = axios.get(`${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric&lang=${lang}`);
    const forcecastFetch = axios.get(`${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric&lang=${lang}`);
  
    axios.all([currentWeatherFetch, forcecastFetch])
      .then(axios.spread((weatherResponse, forcecastResponse) => {
        setCurrentWeather({ city: searchData.label, ...weatherResponse.data });
        setForcecast({ city: searchData.label, ...forcecastResponse.data });
      }))
      .catch((error) => console.error(error));
  };
  




  return (
    <div className={styles.container}>
      <Search onSearchChange={handleOnSearchChange} />
      {currentWeather && <CurrentWeather data={currentWeather} />}
      {forcecast && <Forecast data={forcecast} />}
    </div>
  );
}

export default App;
