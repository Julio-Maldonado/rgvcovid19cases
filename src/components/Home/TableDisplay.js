import React from 'react';

import { CATEGORY_MAP } from '../../constants/constants';

import './styles.css';

const TableDisplay = ({ confirmedCasesName, endpoint, count, arrayData, align, column1 }) => {
  if (!arrayData || arrayData.length === 0 || endpoint !== confirmedCasesName.toLowerCase()) return null;

  let data = [];

  let unknownKeyIndex = -1;
  Object.keys(arrayData).forEach((aData, i) => {
    const key = Object.keys(arrayData[i])[0];
    if ("Unknown" === key || "" === key) unknownKeyIndex = i;
    else data.push(arrayData[i]);
  });

  if (unknownKeyIndex !== -1) data.push(arrayData[unknownKeyIndex]);

  return (
    <div>
      {
        count && endpoint === confirmedCasesName.toLowerCase() ?
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
                data.filter(obj => {
                  var key = Object.keys(obj)[0];
                  if (column1 === "Cities") return key !== "null";
                  else if (column1 === "Ages") return key !== "0";
                  else if (column1 === "Gender") return key !== "null";
                  else if (column1 === "Transmission") return key !== "null";
                  else return true;
                }).map((obj, i) => {
                  var key = Object.keys(obj)[0];
                  let count = obj[key];
                  if (!key) key = "Unknown";
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
