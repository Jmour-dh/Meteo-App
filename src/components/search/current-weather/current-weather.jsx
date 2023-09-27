import React from "react";
import styles from "./current-weather.module.scss";

const CurrentWeather = ({data}) => {
  return (
    <div className={styles.weather}>
      <div className={styles.top}>
        <div>
          <p className={styles.city}>{data.city}</p>
          <p className={styles.weatherDescription}>{data.weather[0].description}</p>
        </div>
        <img src={`icons/${data.weather[0].icon}.png`} alt="weather" className={styles.weatherIcon} />
      </div>
      <div className={styles.bottom}>
        <p className={styles.temperature}>{Math.round(data.main.temp)}°C</p>
        <div className={styles.details} >
          <div className={styles.paramRow}>
            <span className={styles.paramLabel}>Détails</span>
          </div>
          <div className={styles.paramRow}>
            <span className={styles.paramLabel}>Ressemble à</span>
            <span className={styles.paramValue}>{Math.round(data.main.feels_like)}°C</span>
          </div>
          <div className={styles.paramRow}>
            <span className={styles.paramLabel}>Vent</span>
            <span className={styles.paramValue}>{data.wind.speed} m/s</span>
          </div>
          <div className={styles.paramRow}>
            <span className={styles.paramLabel}>Humidité</span>
            <span className={styles.paramValue}>{data.main.humidity}%</span>
          </div>
          <div className={styles.paramRow}>
            <span className={styles.paramLabel}>Pression</span>
            <span className={styles.paramValue}>{data.main.pressure} hPa</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
