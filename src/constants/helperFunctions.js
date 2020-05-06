import ReactGA from 'react-ga';

import {
  CAMERON_DEFAULT_CASES,
  CAMERON_DEFAULT_DEATHS,
  CAMERON_DEFAULT_RECOVERIES,
  HIDALGO_DEFAULT_CASES,
  HIDALGO_DEFAULT_DEATHS,
  HIDALGO_DEFAULT_RECOVERIES,
} from './constants';

const getCount = (obj, field) => obj[field] ? obj[field] : 0;

const updateCount = (obj, field) => field in obj ? obj[field] += 1 : obj[field] = 1;

const sendAnalytics = (category, action) => ReactGA.event({ category, action });

const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

const getUsefulData = (county) => { return getCoronaCases("getUsefulStats", county); }

const getEndpoint = (endpoint) => {
  if (endpoint === "cases") return "getRGVCoronaCases";
  else if (endpoint === "deaths") return "getRGVCoronaDeaths";
  else if (endpoint === "recoveries") return "getRGVRecoveredCases";
  return "getRGVCoronaCases";
}

const determineScreenState = (width) => {
  if (width > 1500) return "wide";
  else if (width > 1200) return "full";
  else if (width > 900) return "pacman";
  else if (width > 700) return "half";
  return "mobile";
}

const compare = (obj1, obj2) => {
  if (obj1[Object.keys(obj1)[0]] < obj2[Object.keys(obj2)[0]]) return 1;
  else if (obj1[Object.keys(obj1)[0]] > obj2[Object.keys(obj2)[0]]) return -1;
  return 0;
}

const getDefaultCases = (endpoint, county) => {
  county = county.toLowerCase();
  if (county === "cameron") {
    if (endpoint === "cases") return CAMERON_DEFAULT_CASES;
    else if (endpoint === "deaths") return CAMERON_DEFAULT_DEATHS;
    else if (endpoint === "recoveries") return CAMERON_DEFAULT_RECOVERIES;
  } else if (county === "hidalgo") {
    if (endpoint === "cases") return HIDALGO_DEFAULT_CASES;
    else if (endpoint === "deaths") return HIDALGO_DEFAULT_DEATHS;
    else if (endpoint === "recoveries") return HIDALGO_DEFAULT_RECOVERIES;
  }
  return CAMERON_DEFAULT_CASES;
}

const getAgeRangeIfValueIsNumber = (age) => {
  if (isNaN(age)) return age;

  if (age === "" || age == null) return 0;

  if (age === -1) return "Unknown";
  else if (age <= 20) return "0 - 20";
  else if (age <= 40) return "21 - 40";
  else if (age <= 60) return "41 - 60";
  else if (age <= 80) return "61 - 80";
  else if (age > 80) return "81+";
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

const getCameronCountyCoronaData = async(data, county) => {
  let coronaMap = {};
  let endpoint = getEndpoint(data);
  let cameronCountyData = await getCoronaCases(endpoint, county);

  if (cameronCountyData['status'] !== 200) {
    sendAnalytics(`Error Retrieving${endpoint} Data`, `${cameronCountyData['status']} error from ${JSON.stringify(cameronCountyData)}`);
    console.error('api call failed');
    console.error({ cameronCountyData });
    alert('There was an error getting the latest data. Please try refreshing the page later.')
    return getDefaultCases(data, county);
  }

  cameronCountyData = cameronCountyData['cases'];
  cameronCountyData.forEach(data => {
    const date = data["date"].substr(1, 4);
    if (!(date in coronaMap)) coronaMap[date] = {}

    updateCount(coronaMap[date], "count")
    for (let d in data) updateCount(coronaMap[date], getAgeRangeIfValueIsNumber(data[d]))
  })

  if (Object.keys(coronaMap).length === 0) {
    return getDefaultCases(data, county);
  }

  if (county.toLowerCase() === "cameron") {
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
  }

  if (county.toLowerCase() === "hidalgo") {
    if (endpoint === "getRGVCoronaCases") {
      coronaMap["3/20"]["count"] = 0;
      delete coronaMap["3/20"]["0"];
    } else if (endpoint === "getRGVCoronaDeaths") {
      coronaMap["4/06"]["count"] = 0;
      delete coronaMap["4/06"]["0"];
    } else if (endpoint === "getRGVRecoveredCases") {
      coronaMap["4/07"]["count"] = 0;
      delete coronaMap["4/07"]["0"];
    }
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
        // Cameron
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
        // Hidalgo
        "Hidalgo": getCount(coronaMap[key], "Hidalgo"),
        "Edcouch": getCount(coronaMap[key], "Edcouch"),
        "Elsa": getCount(coronaMap[key], "Elsa"),
        "San Juan": getCount(coronaMap[key], "San Juan"),
        "Mercedes": getCount(coronaMap[key], "Mercedes"),
        "Alamo": getCount(coronaMap[key], "Alamo"),
        "McAllen": getCount(coronaMap[key], "McAllen"),
        "Edinburg": getCount(coronaMap[key], "Edinburg"),
        "Palmview": getCount(coronaMap[key], "Palmview"),
        "La Joya": getCount(coronaMap[key], "La Joya"),
        "Mission": getCount(coronaMap[key], "Mission"),
        "Pharr": getCount(coronaMap[key], "Pharr"),
        "Donna": getCount(coronaMap[key], "Donna"),
        "Weslaco": getCount(coronaMap[key], "Weslaco"),
      },
    }
  })
  return cameronCountyCoronaData;
}

const getCoronaCases = async(endpoint, county) => {
  try {
    // const resp = await fetch(`https://rgvcovid19backend.herokuapp.com/${endpoint}/${county}`, {
    const resp = await fetch(`http://localhost:7555/${endpoint}/${county}`, {
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

export {
  shallowCompare,
  getCameronCountyCoronaData,
  determineScreenState,
  getUsefulData,
  compare,
  sendAnalytics,
  scrollToTop,
  getDefaultCases,
};
