/* eslint-disable react/prop-types */
import styles from "./CountryList.module.css";
import CountryItem from "./CountryItem";
import { useCities } from "../contexts/CitiesContext";
export default function CountryList() {
  const { cities } = useCities();
  return (
    <div className={styles.countryList}>
      {cities.map((country) => (
        <CountryItem country={country} key={country} />
      ))}
    </div>
  );
}
