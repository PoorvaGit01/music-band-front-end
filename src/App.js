import React, { useState, useEffect } from "react";
import axios from "axios";
import BandList from "./components/BandList";
import LocationInput from "./components/LocationInput";

const App = () => {
  const [bands, setBands] = useState([]);
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");

  // Fetch bands for a given city
  const fetchBands = async (city) => {
    try {
      const response = await axios.get(
        `https://musicbrainz.org/ws/2/artist/?query=area:${city} AND begin:[${new Date().getFullYear() - 10} TO *]&fmt=json`
      );
      setBands(response.data.artists.slice(0, 50));
    } catch (err) {
      setError("Failed to fetch bands. Please try again.");
    }
  };

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
            fetchBands(city); // Fetch bands after getting user location
          },
          async () => {
            const geoResponse = await axios.get(
              `https://get.geojs.io/v1/ip/geo.json`
            );
            const city = geoResponse.data.city;
            setLocation(city);
            fetchBands(city); // Fetch bands after getting user location
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
      <BandList bands={bands} />
    </div>
  );
};

export default App;
