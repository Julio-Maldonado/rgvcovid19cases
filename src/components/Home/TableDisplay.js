import React from 'react';

import {CATEGORY_MAP} from '../../constants/constants';

const TableDisplay = ({confirmedCasesName, endpoint, count, arrayData, align, column1}) => {
  return (
    <div>
      { count && endpoint === confirmedCasesName.toLowerCase() ?
          <p>Confirmed {confirmedCasesName}: {count}</p> 
          : null
      }
      {
        arrayData && endpoint === confirmedCasesName.toLowerCase() ?
        <table align={align}>
          <thead>
          <tr>
            <th>{CATEGORY_MAP[column1]}</th>
            <th>Count</th>
          </tr>
          </thead>
            {
              arrayData.filter(obj => {
                var key = Object.keys(obj)[0];
                if (column1 === "Cities")
                  return key !== "null";
                else if (column1 === "Ages")
                  return key !== "0";
                else if (column1 === "Gender")
                  return key !== "null";
                else if (column1 === "Transmission")
                  return key !== "null";
                else
                  return true;
              }).map((obj, i) => {
                var key = Object.keys(obj)[0];
                let count = obj[key];
                if (!key)
                  key = "Unknown";
                return (
                  <tbody key={"body" + count + i}>
                  <tr key={"tr" + key + i}>
                    <td>{key}</td>
                    <td>{count}</td>
                  </tr>
                  </tbody>
                );
              })
            }
        </table>
        : null
      }
      <br />
  </div>
  );
}

export default TableDisplay;
