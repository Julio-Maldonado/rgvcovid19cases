import React from 'react';
import ReactGA from 'react-ga';

import { DEFAULT_CASES, DEFAULT_DEATHS, DEFAULT_RECOVERIES, ENDPOINT_SINGULAR_MAP } from './constants';

const getCount = (obj, field) => obj[field] ? obj[field] : 0;

const updateCount = (obj, field) => field in obj ? obj[field] += 1 : obj[field] = 1;

const getEndpoint = (endpoint) => {
  if (endpoint === "cases") return "getRGVCoronaCases";
  else if (endpoint === "deaths") return "getRGVCoronaDeaths";
  else if (endpoint === "recoveries") return "getRGVRecoveredCases";
  return "getRGVCoronaCases";
}

const getAgeRangeIfValueIsNumber = (age) => {
  if (isNaN(age)) return age;

  if (age === "" || age == null) return 0;

  if (age <= 20) return "0 - 20";
  else if (age <= 40) return "21 - 40";
  else if (age <= 60) return "41 - 60";
  else if (age <= 80) return "61 - 80";
  else if (age > 80) return "81+";
}

const sendAnalytics = (category, action) => { ReactGA.event({ category, action }) }

const scrollToTop = () => { window.scrollTo({ top: 0, behavior: 'smooth' }); }

let prevLabel = "";
const CustomTooltip = ({ payload, label, active, category, endpoint }) => {
  if (active & payload !== null && 0 in payload) {
    payload = payload[0];
    if (payload.value === 1) endpoint = ENDPOINT_SINGULAR_MAP[endpoint];
    
    const sumOfCategory = Object.keys(payload["payload"][category]).reduce((acc, categoryKey) =>  {
      return acc + payload["payload"][category][categoryKey]
    }, 0)
    if (label !== prevLabel) {
      sendAnalytics(`Hovering Over Data Tooltop`, `User hovering over ${label} from ${prevLabel} for ${category} on ${endpoint}`);
      prevLabel = label;
    }
    return (
      <div className="custom-tooltip">
        <p className="label">{payload.value} {endpoint} on {label}</p>
        {/* <p className="intro">{category}</p> */}
        { category in payload["payload"] ? Object.keys(payload["payload"][category]).sort().filter((categoryKey, i) => {
          return payload["payload"][category][categoryKey] > 0;
        }).map((categoryKey, i) => {
            return (
              <p  key={i} className="category-stats">{categoryKey}: {payload["payload"][category][categoryKey]}</p>
            );
        }) : null}
        {
          category in payload["payload"] && sumOfCategory !== payload["payload"]["Count"] ?
          <p className="category-stats">Unknown: {payload.value - sumOfCategory}</p>
          : null
        }
      </div>
    );
  }

  return null;
}

const shallowEqual = (objA, objB) => {
  if (objA === objB) return true;

  if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) return false;

  var keysA = Object.keys(objA);
  var keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) return false;

  var bHasOwnProperty = hasOwnProperty.bind(objB);
  for (var i = 0; i < keysA.length; i++)
    if (!bHasOwnProperty(keysA[i]) || objA[keysA[i]] !== objB[keysA[i]])
      return false;

  return true;
}

const shallowCompare = (instance, nextProps, nextState) =>{
  return (
    !shallowEqual(instance.props, nextProps) ||
    !shallowEqual(instance.state, nextState)
  );
}

const getCameronCountyCoronaData = async(data) => {
  let coronaMap = {};
  let endpoint = getEndpoint(data);
  let cameronCountyData = await getCoronaCases(endpoint, "cameron");

  if (cameronCountyData['status'] !== 200) {
    sendAnalytics(`Error Retrieving${endpoint} Data`, `${cameronCountyData['status']} error from ${JSON.stringify(cameronCountyData)}`);
    console.error('api call failed');
    console.error({ cameronCountyData });
    alert('There was an error getting the latest data. Please try refreshing the page later.')
    return getDefaultCases(data);
  }

  cameronCountyData = cameronCountyData['cases'];
  cameronCountyData.forEach(data => {
    const date = data["date"].substr(1, 4);
    if (!(date in coronaMap)) coronaMap[date] = {}

    updateCount(coronaMap[date], "count")
    for (let d in data) updateCount(coronaMap[date], getAgeRangeIfValueIsNumber(data[d]))
  })

  if (endpoint === "getRGVCoronaCases") {
    coronaMap["3/18"]["count"] = 0;
    delete coronaMap["3/18"]["0"];
  } else if (endpoint === "getRGVCoronaDeaths") {
    coronaMap["4/05"]["count"] = 0;
    delete coronaMap["4/05"]["0"];
  } else if (endpoint === "getRGVRecoveredCases") {
    coronaMap["4/02"]["count"] = 0;
    delete coronaMap["4/02"]["0"];
  }

  let cameronCountyCoronaData = Object.keys(coronaMap).sort().map(key => {
    return {
      "Date": key,
      "Count": getCount(coronaMap[key], "count"),
      "Gender": {
        "Male": getCount(coronaMap[key], "Male"),
        "Female": getCount(coronaMap[key], "Female"),
      },
      "Transmission": {
        "Travel": getCount(coronaMap[key], "Travel"),
        "Community": getCount(coronaMap[key], "Community"),
        "Linked To Previous Case": getCount(coronaMap[key], "Link To Previous Case"),
      },
      "Ages": {
        "0 - 20": getCount(coronaMap[key], "0 - 20"),
        "21 - 40": getCount(coronaMap[key], "21 - 40"),
        "41 - 60": getCount(coronaMap[key], "41 - 60"),
        "61 - 80": getCount(coronaMap[key], "61 - 80"),
        "81+": getCount(coronaMap[key], "81+"),
      },
      "Cities": {
        "Harlingen": getCount(coronaMap[key], "Harlingen"),
        "Brownsville": getCount(coronaMap[key], "Brownsville"),
        "Rancho Viejo": getCount(coronaMap[key], "Rancho Viejo"),
        "Rio Hondo": getCount(coronaMap[key], "Rio Hondo"),
        "Los Fresnos": getCount(coronaMap[key], "Los Fresnos"),
        "La Feria": getCount(coronaMap[key], "La Feria"),
        "San Benito": getCount(coronaMap[key], "San Benito"),
        "Laguna Vista": getCount(coronaMap[key], "Laguna Vista"),
        "Santa Rosa": getCount(coronaMap[key], "Santa Rosa"),
        "Port Isabel": getCount(coronaMap[key], "Port Isabel"),
      },
    }
  })
  return cameronCountyCoronaData;
}

const determineScreenState = (width) => {
  if (width > 1500) return "wide";
  else if (width > 1200) return "full";
  else if (width > 900) return "pacman";
  else if (width > 700) return "half";
  return "mobile";
}

const determineXAxisPadding = (screenState) => {
  if (screenState === "mobile") return { left: 30, right: 30};
  return { left: 0, right: 0};
}

const getUsefulData = () => { return getCoronaCases("getUsefulStats", "cameron"); }

const getCoronaCases = async(endpoint, county) => {
  try {
    const resp = await fetch(`https://rgvcovid19backend.herokuapp.com/${endpoint}/${county}`, {
      mode: 'cors',
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    return resp.json();
  } catch (e) {
    console.error(e);
    return { success: false, e };
  }
}

const compare = (obj1, obj2) => {
  if (obj1[Object.keys(obj1)[0]] < obj2[Object.keys(obj2)[0]]) return 1;
  else if (obj1[Object.keys(obj1)[0]] > obj2[Object.keys(obj2)[0]]) return -1;
  return 0;
}

const getDefaultCases = (endpoint) => {
  if (endpoint === "cases") return DEFAULT_CASES;
  else if (endpoint === "deaths") return DEFAULT_DEATHS;
  else if (endpoint === "recoveries") return DEFAULT_RECOVERIES;
  return DEFAULT_CASES;
}

export {
  getCount,
  getAgeRangeIfValueIsNumber,
  updateCount,
  CustomTooltip,
  shallowCompare,
  getCameronCountyCoronaData,
  determineScreenState,
  determineXAxisPadding,
  getUsefulData,
  compare,
  sendAnalytics,
  scrollToTop,
  getDefaultCases,
};
