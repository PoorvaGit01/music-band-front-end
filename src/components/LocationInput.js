import React, { useState } from "react";

const LocationInput = ({ onSearch }) => {
  const [city, setCity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim) {
      onSearch(city);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex justify-center mb-4">
      <input
        type="text"
        className="border rounded-l px-4 py-2 w-64 focus:outline-none"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600"
      >
        Search
      </button>
    </form>
  );
};

export default LocationInput;
