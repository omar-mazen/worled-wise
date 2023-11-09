import { createContext, useContext, useEffect, useReducer } from "react";
const CitiesContext = createContext();
const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: "",
};
function cityReducer(state, action) {
  switch (action.type) {
    case "loading": {
      return { ...state, isLoading: true, error: "" };
    }
    case "cities/loaded": {
      return { ...state, isLoading: false, cities: action.payload };
    }
    case "city/loaded": {
      return {
        ...state,
        currentCity: action.payload,
        isLoading: false,
      };
    }
    case "city/created": {
      return {
        ...state,
        cities: [...state.cities, action.payload],
        isLoading: false,
        currentCity: action.payload,
      };
    }
    case "city/deleted": {
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => action.payload != city.id),
      };
    }
    case "rejected": {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    }
    default:
      throw new Error("unknown action");
  }
}
function CitiesProvider({ children }) {
  const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(
    cityReducer,
    initialState
  );
  useEffect(function () {
    async function fetchCities() {
      try {
        dispatch({ type: "loading" });
        const res = await fetch("http://localhost:8000/cities");
        const cities = await res.json();
        dispatch({ type: "cities/loaded", payload: cities });
      } catch (error) {
        dispatch({ type: "rejected", payload: error.message });
      }
    }
    fetchCities();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  async function getCity(id) {
    try {
      dispatch({ type: "loading" });
      const res = await fetch(`http://localhost:8000/cities/${id}`);
      const currentCity = await res.json();
      dispatch({ type: "city/loaded", payload: currentCity });
    } catch (error) {
      dispatch({ type: "rejected", payload: error.message });
    }
  }
  async function createCity(city) {
    try {
      dispatch;
      await fetch(`http://localhost:8000/cities/`, {
        method: "POST",
        body: JSON.stringify(city),
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      dispatch({ type: "rejected", payload: error.message });
    } finally {
      dispatch({ type: "city/created", payload: city });
    }
  }
  async function deleteCity(id) {
    try {
      dispatch({ type: "loading" });
      await fetch(`http://localhost:8000/cities/${id}`, { method: "DELETE" });
    } catch (error) {
      dispatch({ type: "rejected", payload: error.message });
    } finally {
      dispatch({ type: "city/deleted", payload: id });
    }
  }
  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("Cities context use outside cities provider");
  return context;
}
// eslint-disable-next-line react-refresh/only-export-components
export { CitiesProvider, useCities };
