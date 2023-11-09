/* eslint-disable react/prop-types */
import styles from "./CityList.module.css";
import Spinner from "./Spinner.jsx";
import CityItem from "./CityItem";
import Message from "./Message";
import { useCities } from "../contexts/CitiesContext";
export default function CityList() {
  const { cities, isLoading } = useCities();
  return (
    <>
      {isLoading === true ? (
        <Spinner />
      ) : cities.length > 0 ? (
        <ul className={styles.cityList}>
          {cities.map((city) => (
            <CityItem city={city} key={`${city.id}-${city.cityName}`} />
          ))}
        </ul>
      ) : (
        <Message
          message={"Add your first city by clicking on a city on the map"}
        />
      )}
    </>
  );
}
