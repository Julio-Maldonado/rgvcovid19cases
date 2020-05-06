import React from 'react';

import { sendAnalytics } from '../../constants/helperFunctions';
import { ENDPOINT_SINGULAR_MAP } from '../../constants/constants';

import "./styles.css";

let prevLabel = "";

const CustomTooltip = ({ payload, label, active, category, endpoint }) => {
  if (active && payload !== null && 0 in payload) {
    payload = payload[0];

    const sumOfCategory = Object.keys(payload["payload"][category]).reduce((acc, categoryKey) =>  {
      return acc + payload["payload"][category][categoryKey]
    }, 0);

    if (payload.value === 1) endpoint = ENDPOINT_SINGULAR_MAP[endpoint];

    if (label !== prevLabel) {
      sendAnalytics(`Hovering Over Data Tooltip`, `User hovering over ${label} from ${prevLabel} for ${category} category on ${endpoint} endpoint`);
      prevLabel = label;
    }

    return (
      <div className="custom-tooltip">
        <p className="label">{payload.value} {endpoint} on {label}</p>
        {/* <p className="intro">{category}</p> */}
        { 
          category in payload["payload"] ? Object.keys(payload["payload"][category]).sort().filter((categoryKey, i) => {
            return payload["payload"][category][categoryKey] > 0;
          }).map((categoryKey, i) => {
              return (
                <p key={i} className="category-stats">{categoryKey}: {payload["payload"][category][categoryKey]}</p>
              );
          }) : null
        }
        {
          category in payload["payload"] && sumOfCategory !== payload["payload"]["Count"] && sumOfCategory !== 0 ?
          <p className="category-stats">Unknown: {payload.value - sumOfCategory}</p>
          : null
        }
      </div>
    );
  }

  return null;
}

export default CustomTooltip;
