import styles from "./App.module.scss";
import Search from "./components/search/Search";
import CurrentWeather from "./components/search/current-weather/current-weather";
import { WEATHER_API_URL, WEATHER_API_KEY } from "./api";
import { useState } from "react";
import Forecast from "./components/search/forecast/Forecast";


function App() {
  const [currentWeather, setCurrentWeather] = useState(null)
  const [forcecast, setForcecast] = useState(null)

  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");
    
    const currentWeatherFetch = fetch (`${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`)
    const forcecastFetch = fetch (`${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`)  

   Promise.all([currentWeatherFetch, forcecastFetch])
   .then(async (response) => {
    const weatherResponse = await response[0].json();
    const forcecastResponse = await response[1].json();
    setCurrentWeather({city: searchData.label,...weatherResponse});
    setForcecast({city: searchData.label,...forcecastResponse});
   })
   .catch((err) => console.log(err))
  };


  console.log(forcecast);

  return (
    <div className={styles.container}>
      <Search onSearchChange={handleOnSearchChange} />
      {currentWeather && <CurrentWeather data={currentWeather} />}
      {forcecast && <Forecast data={forcecast} />}
    </div>
  );
}

export default App;
