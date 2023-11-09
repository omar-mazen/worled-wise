/* eslint-disable no-unused-vars */
//import styles from "./cityItem.module.css";
import { useCities } from "../contexts/CitiesContext";
import styles from "./cityItem.module.css";
import { Link } from "react-router-dom";
export default function cityItem({ city }) {
  const {
    emoji,
    cityName,
    date,
    id,
    position: { lat, lng },
  } = city;
  const formatDate = (date) =>
    new Intl.DateTimeFormat("en", {
      day: "numeric",
      month: "long",
      year: "numeric",
      weekday: "long",
    }).format(new Date(date));

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { currentCity, deleteCity } = useCities();
  function deleteHandler(e) {
    e.preventDefault();
    deleteCity(id);
  }
  return (
    <li>
      <Link
        className={`${styles.cityItem} ${
          currentCity.id == id ? styles["cityItem--active"] : ""
        }`}
        to={`${id}?lat=${lat}&lng=${lng}`}
      >
        <span className={styles.emoji}>{emoji}</span>
        <span className={styles.name}>{cityName}</span>
        <span className={styles.date}>{formatDate(date)}</span>
        <span className={styles.deleteBtn} onClick={deleteHandler}>
          ❌
        </span>
      </Link>
    </li>
  );
}
