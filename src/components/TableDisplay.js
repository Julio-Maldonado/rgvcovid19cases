import React from 'react';

import {CATEGORY_MAP} from '../constants/constants';

const TableDisplay = ({confirmedCasesName, count, arrayData, align, column1}) => {
  return (
    <div>
      { count ?
          <p id="p">Confirmed {confirmedCasesName}: {count}</p> 
          : null
      }
      {
        arrayData ?
        <table align={align}>
          <thead>
          <tr>
            <th>{CATEGORY_MAP[column1]}</th>
            <th>Count</th>
          </tr>
          </thead>
            {
              arrayData.map((obj, i) => {
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
