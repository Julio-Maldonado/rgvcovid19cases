import React from 'react';

import { isMobile } from 'react-device-detect';

import { sendAnalytics } from '../../constants/helperFunctions';
import { ENDPOINT_SINGULAR_MAP } from '../../constants/constants';

import "./styles.css";

let prevLabel = "";

const CustomTooltip = ({ payload, label, active, category, endpoint, width }) => {
  if (active && payload !== null && 0 in payload) {
    payload = payload[0];
    if (endpoint === "active")
      return (
        <div className="custom-tooltip">
          <p className="label">{payload.value} active cases on {label}</p>
          {
            "Cases" in payload["payload"] && payload["payload"]["Cases"] > 0 ?
              <p className="category-stats">New Cases: {payload["payload"]["Cases"]}</p>
              : null
          }
          {
            "Deaths" in payload["payload"] && payload["payload"]["Deaths"] > 0 ?
              <p className="category-stats">New Deaths: {payload["payload"]["Deaths"]}</p>
              : null
          }
          {
            "Recoveries" in payload["payload"] && payload["payload"]["Recoveries"] > 0 ?
              <p className="category-stats">New Recoveries: {payload["payload"]["Recoveries"]}</p>
              : null
          }
          {/* {
            category in payload["payload"] && sumOfCategory !== payload["payload"]["Count"] && sumOfCategory !== 0 ?
            <p className="category-stats">Unknown: {payload.value - sumOfCategory}</p>
            : null
          } */}
        </div>
      );
    else if (endpoint === "home") {
      if (!isMobile && width > 800) {
        return (
          <div className="custom-tooltip">
            <p className="label">{label}: Cameron - {payload.value}, Hidalgo - {payload['payload']['CountHidalgo']}, Starr - {payload['payload']['CountStarr']}, Willacy - {payload['payload']['CountWillacy']}</p>
            {
              "Cases" in payload["payload"] && payload["payload"]["Cases"] > 0 ?
                <p className="category-stats">New Cases in Cameron: {payload["payload"]["Cases"]}</p>
                : null
            }
            {
              "Deaths" in payload["payload"] && payload["payload"]["Deaths"] > 0 ?
                <p className="category-stats">New Deaths in Cameron: {payload["payload"]["Deaths"]}</p>
                : null
            }
            {
              "Recoveries" in payload["payload"] && payload["payload"]["Recoveries"] > 0 ?
                <p className="category-stats">New Recoveries in Cameron: {payload["payload"]["Recoveries"]}</p>
                : null
            }
            {
              "Cases" in payload["payload"] && payload["payload"]["CasesHidalgo"] > 0 ?
                <p className="category-stats">New Cases in Hidalgo: {payload["payload"]["CasesHidalgo"]}</p>
                : null
            }
            {
              "Deaths" in payload["payload"] && payload["payload"]["DeathsHidalgo"] > 0 ?
                <p className="category-stats">New Deaths in Hidalgo: {payload["payload"]["DeathsHidalgo"]}</p>
                : null
            }
            {
              "Recoveries" in payload["payload"] && payload["payload"]["RecoveriesHidalgo"] > 0 ?
                <p className="category-stats">New Recoveries in Hidalgo: {payload["payload"]["RecoveriesHidalgo"]}</p>
                : null
            }
            {
              "Cases" in payload["payload"] && payload["payload"]["CasesStarr"] > 0 ?
                <p className="category-stats">New Cases in Starr: {payload["payload"]["CasesStarr"]}</p>
                : null
            }
            {
              "Deaths" in payload["payload"] && payload["payload"]["DeathsStarr"] > 0 ?
                <p className="category-stats">New Deaths in Starr: {payload["payload"]["DeathsStarr"]}</p>
                : null
            }
            {
              "Recoveries" in payload["payload"] && payload["payload"]["RecoveriesStarr"] > 0 ?
                <p className="category-stats">New Recoveries in Starr: {payload["payload"]["RecoveriesStarr"]}</p>
                : null
            }
            {
              "Cases" in payload["payload"] && payload["payload"]["CasesWillacy"] > 0 ?
                <p className="category-stats">New Cases in Willacy: {payload["payload"]["CasesWillacy"]}</p>
                : null
            }
            {
              "Deaths" in payload["payload"] && payload["payload"]["DeathsWillacy"] > 0 ?
                <p className="category-stats">New Deaths in Willacy: {payload["payload"]["DeathsWillacy"]}</p>
                : null
            }
            {
              "Recoveries" in payload["payload"] && payload["payload"]["RecoveriesWillacy"] > 0 ?
                <p className="category-stats">New Recoveries in Willacy: {payload["payload"]["RecoveriesWillacy"]}</p>
                : null
            }
            {/* {
              category in payload["payload"] && sumOfCategory !== payload["payload"]["Count"] && sumOfCategory !== 0 ?
              <p className="category-stats">Unknown: {payload.value - sumOfCategory}</p>
              : null
            } */}
          </div>
        );
      } else {
        return (
          <div className="custom-tooltip">
            <p className="label">{label}: Active Cases in the RGV: {payload.value + payload['payload']['CountHidalgo'] + payload['payload']['CountStarr'] + payload['payload']['CountWillacy']}</p>
            <p className="category-stats">Cameron: {payload.value}</p>
            <p className="category-stats">Hidalgo: {payload['payload']['CountHidalgo']}</p>
            <p className="category-stats">Starr: {payload['payload']['CountStarr']}</p>
            <p className="category-stats">Willacy: {payload['payload']['CountWillacy']}</p>
          </div>
        );
      }
    } else {
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
  }

  return null;
}

export default CustomTooltip;
