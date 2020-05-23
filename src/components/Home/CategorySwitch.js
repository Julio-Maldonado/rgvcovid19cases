import React from 'react';

const CategorySwitch = ({ category, county, endpoint, updateCategory }) => {
  if (county === "Hidalgo" && (endpoint === "recoveries" || endpoint === "active")) return null;
  
  return (
    <div>
      <i id="i">Select a category to view:{` `}</i>
      <select id="select" value={category} onChange={e => updateCategory(e.target.value)}>
        <option value="Cities">Cities</option>
        <option value="Ages">Ages</option>
        <option value="Gender">Gender</option>
        {
          county !== "Hidalgo" ?
            <option value="Transmission">Transmission</option>
            : null
        }
      </select>
    </div>
  );
};

export default CategorySwitch;
