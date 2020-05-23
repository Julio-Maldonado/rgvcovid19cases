import React from 'react';

import { ENDPOINT_MAP } from '../../constants/constants';

const Header = ({ endpoint, county, updateCounty }) => {
  const data = ENDPOINT_MAP[endpoint];
  if (endpoint === "active") endpoint += " cases";
  return (
    <div>
      <h1>{county} County COVID-19 {data}</h1>
      <h2>
        This graph shows the COVID-19 {endpoint} in {county} County since the beginning.
      </h2>
      <div>
        <i>Select a County to view: {` `}</i>
        <select value={county} onChange={e => updateCounty(e.target.value)}>
          <option value="Cameron">Cameron</option>
          <option value="Hidalgo">Hidalgo</option>
        </select>
      </div>
      <br />
    </div>
  );
};

export default Header;
