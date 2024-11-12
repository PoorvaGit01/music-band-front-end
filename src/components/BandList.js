// src/components/BandList.js
import React from "react";

const BandList = ({ bands }) => {
  if (bands.length === 0) {
    return <p className="text-center">No bands found.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {bands.map((band) => (
        <div
          key={band.id}
          className="border p-4 rounded shadow hover:shadow-lg"
        >
          <h3 className="font-bold">{band.name}</h3>
          {band["life-span"]?.begin && (
            <p>Founded: {band["life-span"].begin}</p>
          )}
          {band.area?.name && <p>Location: {band.area.name}</p>}
        </div>
      ))}
    </div>
  );
};

export default BandList;
