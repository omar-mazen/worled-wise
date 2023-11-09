import { useEffect, useState } from "react";
import styles from "./Form.module.css";
import Button from "./Button";
import ButtonBack from "./ButtonBack";
import useUrlPosition from "../hooks/useUrlPosition";
import Spinner from "../components/Spinner";
import Message from "./Message";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useCities } from "../contexts/CitiesContext";
import { useNavigate } from "react-router-dom";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const [cityName, setCityName] = useState("");
  const [isGeoLoading, setIsGeoLoading] = useState(false);
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [emoji, setEmoji] = useState();
  const [lat, lng] = useUrlPosition();
  const [error, setError] = useState();
  const { createCity } = useCities();
  const navigate = useNavigate();
  useEffect(
    function () {
      async function fetchCity() {
        try {
          setError("");
          setIsGeoLoading(true);
          const res = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`
          );
          const cities = await res.json();
          if (!cities.countryCode)
            throw new Error(
              "That dosn't seem to be a city. Click somewhere else"
            );
          setCityName(cities.city || cities.loacality || "");
          setEmoji(convertToEmoji(cities.countryCode));
        } catch (err) {
          setError(err.message);
        } finally {
          setIsGeoLoading(false);
        }
      }
      fetchCity();
    },
    [lat, lng]
  );
  function addHandle(e) {
    e.preventDefault();
    if (!(lat && lng)) return;
    createCity({
      cityName,
      country,
      emoji,
      date,
      notes,
      position: {
        lat,
        lng,
      },
    });
    navigate("/app/cities");
  }
  if (isGeoLoading) return <Spinner />;
  if (error) return <Message message={error}></Message>;
  return (
    <form className={styles.form}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <DatePicker
          id="date"
          selected={date}
          onChange={(date) => setDate(date)}
          dateFormat="dd/MM/yyyy"
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type={"primary"} onClick={addHandle}>
          Add
        </Button>
        <ButtonBack navigate={"/app"} />
      </div>
    </form>
  );
}

export default Form;
