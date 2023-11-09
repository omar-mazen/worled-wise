/* eslint-disable no-unused-vars */
import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";
import {
  MapContainer,
  Marker,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useGeolocation } from "../hooks/useGeoLocation.js";
import { useCities } from "../contexts/CitiesContext";
import { useEffect, useState } from "react";
import Button from "./Button.jsx";
import useUrlPosition from "../hooks/useUrlPosition";
import User from "./User.jsx";
import Spinner from "./Spinner.jsx";
export default function Map() {
  const [mapPosition, setMapPosition] = useState([26, 30]);
  const [lat, lng] = useUrlPosition();
  const { cities, isLoading } = useCities();
  const {
    isLoading: geoPositionLoading,
    position: geoPosition,
    getPosition: getGeoPosition,
  } = useGeolocation();
  const navigate = useNavigate();
  useEffect(
    function () {
      if (lat && lng) setMapPosition([lat, lng]);
    },
    [lat, lng]
  );
  useEffect(
    function () {
      if (geoPosition) {
        setMapPosition([geoPosition.lat, geoPosition.lng]);
        navigate(`form?lat=${geoPosition.lat}&lng=${geoPosition.lng}`);
      }
    },
    [geoPosition]
  );
  return (
    <div className={styles.mapContainer}>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <User />
          <Button type={"position"} onClick={getGeoPosition}>
            {geoPosition
              ? geoPositionLoading
                ? "loading..."
                : "to your poisition"
              : "get your position"}
          </Button>
          <MapContainer
            center={mapPosition}
            zoom={6}
            scrollWheelZoom={true}
            className={styles.map}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {cities.map((city) => (
              <Marker
                key={city.id}
                position={[city.position.lat, city.position.lng]}
              ></Marker>
            ))}
            <ChangeCenter position={mapPosition} />
            <DetectClick />
          </MapContainer>
        </>
      )}
    </div>
  );
}
function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
}
function DetectClick() {
  const navigate = useNavigate();
  useMapEvents({
    click: (e) => {
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    },
  });
}
