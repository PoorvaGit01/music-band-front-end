import React, { useState, useEffect } from "react";
import { fetchBands, fetchUserCity } from "./services/bandService";
import BandList from "./components/BandList";
import LocationInput from "./components/LocationInput";

const App = () => {
  const [bands, setBands] = useState([]);
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");

  const getBandsForCity = async (city) => {
    try {
      const bandData = await fetchBands(city);
      setBands(bandData);
    } catch (err) {
      setError("Failed to fetch bands. Please try again.");
    }
  };

  const fetchUserLocation = async () => {
    const handleSuccess = async () => {
      try {
        const city = await fetchUserCity();
        setLocation(city);
        getBandsForCity(city);
      } catch (err) {
        setError("Failed to fetch city or bands.");
      }
    };
  
    const handleError = () => {
      setError("Geolocation access denied or unavailable.");
    };
  
    try {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async () => {
            await handleSuccess(); 
          },
        );
      } else {
        handleError(); 
      }
    } catch (err) {
      setError("Unexpected error while fetching location.");
    }
  };
  

  useEffect(() => {
    fetchUserLocation();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-center mb-4">Music Band Finder</h1>
      <LocationInput onSearch={getBandsForCity} />
      {error && <p className="text-red-500 text-center">{error}</p>}
      <BandList bands={bands} />
    </div>
  );
};

export default App;
