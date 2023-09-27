import React from "react";
import styles from "./Forecast.module.scss";
import {
  Accordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
} from "react-accessible-accordion";

const WEEK_DAYS = [
  "Lundi",
  "Mardi",
  "Mercredi",
  "Jeudi",
  "Vendredi",
  "Samedi",
  "Dimanche",
];

const Forecast = ({ data }) => {
  const dayInAWeek = new Date().getDay();
  const forecastDays = WEEK_DAYS.slice(dayInAWeek, WEEK_DAYS.length).concat(
    WEEK_DAYS.slice(0, dayInAWeek)
  );

  return (
    <>
      <label className={styles.title}>Quotidiennement</label>
      <Accordion allowZeroExpanded>
        {data.list.splice(0, 7).map((item, idx) => (
          <AccordionItem key={idx}>
            <AccordionItemHeading>
              <AccordionItemButton>
                <div className={styles.dailyItem}>
                  <img
                    alt="weather"
                    className={styles.iconSmall}
                    src={`icons/${item.weather[0].icon}.png`}
                  />
                  <label className={styles.day}> {forecastDays[idx]} </label>
                  <label className={styles.description}>
                    {" "}
                    {item.weather[0].description}{" "}
                  </label>
                  <label className={styles.minMax}>
                    {" "}
                    {Math.round(item.main.temp_min)} °C /{" "}
                    {Math.round(item.main.temp_max)}
                  </label>
                </div>
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
            <div className={styles.dailyDetailsGrid}>
                <div className={styles.dailyDetailsGridItem}>
                  <label>Pression:</label>
                  <label>{item.main.pressure}</label>
                </div>
                <div className={styles.dailyDetailsGridItem}>
                  <label>Humidité:</label>
                  <label>{item.main.humidity}</label>
                </div>
                <div className={styles.dailyDetailsGridItem}>
                  <label>Nuages:</label>
                  <label>{item.clouds.all}%</label>
                </div>
                <div className={styles.dailyDetailsGridItem}>
                  <label>Vitesse du vent:</label>
                  <label>{item.wind.speed} m/s</label>
                </div>
                <div className={styles.dailyDetailsGridItem}>
                  <label>Niveau de la mer:</label>
                  <label>{item.main.sea_level}m</label>
                </div>
                <div className={styles.dailyDetailsGridItem}>
                  <label>Ressemble à:</label>
                  <label>{item.main.feels_like}°C</label>
                </div>
              </div>
            </AccordionItemPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  );
};

export default Forecast;
