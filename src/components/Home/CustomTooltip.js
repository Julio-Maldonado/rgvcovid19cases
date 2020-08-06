import React from 'react';

import { isMobile } from 'react-device-detect';

import { sendAnalytics } from '../../constants/helperFunctions';
import { ENDPOINT_SINGULAR_MAP } from '../../constants/constants';

import "./styles.css";

let prevLabel = "";

const getNumber = (number) => number && Number.isInteger(number) ? number.toLocaleString() : number;

const CustomTooltip = ({ payload, label, active, category, endpoint, width }) => {
  if (active && payload !== null && 0 in payload) {
    payload = payload[0];
    if (endpoint === "active")
      return (
        <div className="custom-tooltip">
          <p className="label">{payload.value} active cases on {label}</p>
          {
            "Cases" in payload["payload"] && payload["payload"]["Cases"] > 0 ?
              <p className="category-stats">New Cases: {getNumber(payload["payload"]["Cases"])}</p>
              : null
          }
          {
            "Deaths" in payload["payload"] && payload["payload"]["Deaths"] > 0 ?
              <p className="category-stats">New Deaths: {getNumber(payload["payload"]["Deaths"])}</p>
              : null
          }
          {
            "Recoveries" in payload["payload"] && payload["payload"]["Recoveries"] > 0 ?
              <p className="category-stats">New Recoveries: {getNumber(payload["payload"]["Recoveries"])}</p>
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
            <p className="label">{label}: Total in the RGV - {getNumber(payload.value + payload['payload']['CountHidalgo'] + payload['payload']['CountStarr'] + payload['payload']['CountWillacy'])}; Cameron - {getNumber(payload.value)}, Hidalgo - {getNumber(payload['payload']['CountHidalgo'])}, Starr - {getNumber(payload['payload']['CountStarr'])}, Willacy - {getNumber(payload['payload']['CountWillacy'])}</p>
            {
              "Cases" in payload["payload"] && payload["payload"]["Cases"] > 0 ?
                <p className="category-stats">New Cases in Cameron: {getNumber(payload["payload"]["Cases"])}</p>
                : null
            }
            {
              "Deaths" in payload["payload"] && payload["payload"]["Deaths"] > 0 ?
                <p className="category-stats">New Deaths in Cameron: {getNumber(payload["payload"]["Deaths"])}</p>
                : null
            }
            {
              "Recoveries" in payload["payload"] && payload["payload"]["Recoveries"] > 0 ?
                <p className="category-stats">New Recoveries in Cameron: {getNumber(payload["payload"]["Recoveries"])}</p>
                : null
            }
            {
              "Cases" in payload["payload"] && payload["payload"]["CasesHidalgo"] > 0 ?
                <p className="category-stats">New Cases in Hidalgo: {getNumber(payload["payload"]["CasesHidalgo"])}</p>
                : null
            }
            {
              "Deaths" in payload["payload"] && payload["payload"]["DeathsHidalgo"] > 0 ?
                <p className="category-stats">New Deaths in Hidalgo: {getNumber(payload["payload"]["DeathsHidalgo"])}</p>
                : null
            }
            {
              "Recoveries" in payload["payload"] && payload["payload"]["RecoveriesHidalgo"] > 0 ?
                <p className="category-stats">New Recoveries in Hidalgo: {getNumber(payload["payload"]["RecoveriesHidalgo"])}</p>
                : null
            }
            {
              "Cases" in payload["payload"] && payload["payload"]["CasesStarr"] > 0 ?
                <p className="category-stats">New Cases in Starr: {getNumber(payload["payload"]["CasesStarr"])}</p>
                : null
            }
            {
              "Deaths" in payload["payload"] && payload["payload"]["DeathsStarr"] > 0 ?
                <p className="category-stats">New Deaths in Starr: {getNumber(payload["payload"]["DeathsStarr"])}</p>
                : null
            }
            {
              "Recoveries" in payload["payload"] && payload["payload"]["RecoveriesStarr"] > 0 ?
                <p className="category-stats">New Recoveries in Starr: {getNumber(payload["payload"]["RecoveriesStarr"])}</p>
                : null
            }
            {
              "Cases" in payload["payload"] && payload["payload"]["CasesWillacy"] > 0 ?
                <p className="category-stats">New Cases in Willacy: {getNumber(payload["payload"]["CasesWillacy"])}</p>
                : null
            }
            {
              "Deaths" in payload["payload"] && payload["payload"]["DeathsWillacy"] > 0 ?
                <p className="category-stats">New Deaths in Willacy: {getNumber(payload["payload"]["DeathsWillacy"])}</p>
                : null
            }
            {
              "Recoveries" in payload["payload"] && payload["payload"]["RecoveriesWillacy"] > 0 ?
                <p className="category-stats">New Recoveries in Willacy: {getNumber(payload["payload"]["RecoveriesWillacy"])}</p>
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
            <p className="label">{label}: Active Cases in the RGV: {getNumber(payload.value + payload['payload']['CountHidalgo'] + payload['payload']['CountStarr'] + payload['payload']['CountWillacy'])}</p>
            <p className="category-stats">Cameron: {getNumber(payload.value)}</p>
            <p className="category-stats">Hidalgo: {getNumber(payload['payload']['CountHidalgo'])}</p>
            <p className="category-stats">Starr: {getNumber(payload['payload']['CountStarr'])}</p>
            <p className="category-stats">Willacy: {getNumber(payload['payload']['CountWillacy'])}</p>
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
          <p className="label">{getNumber(payload.value)} {endpoint} on {label}</p>
          {
            category in payload["payload"] ? Object.keys(payload["payload"][category]).sort().filter((categoryKey, i) => {
              return payload["payload"][category][categoryKey] > 0;
            }).map((categoryKey, i) => {
                return (
                  <p key={i} className="category-stats">{categoryKey}: {getNumber(payload["payload"][category][categoryKey])}</p>
                );
            }) : null
          }
          {
            category in payload["payload"] && sumOfCategory !== payload["payload"]["Count"] && sumOfCategory !== 0 ?
            <p className="category-stats">Unknown: {getNumber(payload.value - sumOfCategory)}</p>
            : null
          }
        </div>
      );
    }
  }

  return null;
}

export default CustomTooltip;
