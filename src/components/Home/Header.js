import React from 'react';

import { ENDPOINT_MAP } from '../../constants/constants';

const Header = ({ endpoint, category, updateCategory }) => {
  const data = ENDPOINT_MAP[endpoint];
  return (
    <div>
      <h1>Cameron County Covid-19 {data}</h1>
      <h2>
        This graph shows the Covid-19 {endpoint} in Cameron County since the beginning.
      </h2>
      <div>
        <i>Select a category to view:{` `}</i>
        <select value={category} onChange={e => updateCategory(e.target.value)}>
          <option value="Cities">Cities</option>
          <option value="Ages">Ages</option>
          <option value="Gender">Gender</option>
          <option value="Transmission">Transmission</option>
        </select>
      </div>
      <br />
    </div>
  );
};

export default Header;
