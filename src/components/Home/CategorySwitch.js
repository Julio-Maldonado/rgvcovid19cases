import React from 'react';

const CategorySwitch = ({ category, county, endpoint, updateCategory }) => {
  if (endpoint === "recoveries") return null;
  if (endpoint === "active") return null;
  // if (county === "Hidalgo") return null;

  return (
    <div>
      <i id="i">Select a category to view:{` `}</i>
      <select id="select" value={category} onChange={e => updateCategory(e.target.value)}>
        <option value="Ages">Ages</option>
        <option value="Cities">Cities</option>
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
