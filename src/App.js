import React, { useState, useEffect } from "react";
import LocationInput from "./components/LocationInput";

const App = () => {
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");

  // Get user's location from browser or GeoJS API
  const fetchUserLocation = async () => {
    try {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            const geoResponse = await axios.get(
              `https://get.geojs.io/v1/ip/geo.json`
            );
            const city = geoResponse.data.city;
            setLocation(city);
          },
          async () => {
            const geoResponse = await axios.get(
              `https://get.geojs.io/v1/ip/geo.json`
            );
            const city = geoResponse.data.city;
            setLocation(city);
          }
        );
      }
    } catch (err) {
      setError("Unable to fetch user location.");
    }
  };

  useEffect(() => {
    fetchUserLocation();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-center mb-4">Music Band Finder</h1>
      <LocationInput onSearch={fetchBands} />
      {error && <p className="text-red-500 text-center">{error}</p>}
    </div>
  );
};

export default App;
