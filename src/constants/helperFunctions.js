import ReactGA from 'react-ga';

import {
  CAMERON_ACTIVE_CASES,
  CAMERON_DEFAULT_CASES,
  CAMERON_DEFAULT_DEATHS,
  CAMERON_DEFAULT_RECOVERIES,
  HIDALGO_ACTIVE_CASES,
  HIDALGO_DEFAULT_CASES,
  HIDALGO_DEFAULT_DEATHS,
  HIDALGO_DEFAULT_RECOVERIES,
  STARR_ACTIVE_CASES,
  STARR_DEFAULT_CASES,
  STARR_DEFAULT_DEATHS,
  STARR_DEFAULT_RECOVERIES,
  WILLACY_ACTIVE_CASES,
  WILLACY_DEFAULT_CASES,
  WILLACY_DEFAULT_DEATHS,
  WILLACY_DEFAULT_RECOVERIES,
} from './constants';

const numberWithCommas = (x) => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

const getCount = (obj, field) => obj[field] ? obj[field] : 0;

const updateCount = (obj, field) => field in obj ? obj[field] += 1 : obj[field] = 1;

const sendAnalytics = (category, action) => ReactGA.event({ category, action });

const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

const getToday = () => {
  const today = new Date();
  const dateTimeFormat = new Intl.DateTimeFormat('en', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  return dateTimeFormat.format(today);
}

const getUsefulData = (county) => { return getCoronaCases("getUsefulStats", county); }

// eslint-disable-next-line no-extend-native
Date.prototype.addDays = function(days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};

const getPluralCount = (count) => {
  if (count < 21) return `${count}th`;
  if (count === 21) return `${count}st`;
  if (count === 22) return `${count}nd`;
  if (count === 23) return `${count}rd`;
  if (count < 31) return `${count}th`;
}

const getDatesArr = (startDate, stopDate) => {
  let dateArray = [];
  let currentDate = startDate;
  const dateTimeFormat = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'numeric', day: '2-digit' });
  while (currentDate <= stopDate) {
    let date = dateTimeFormat.formatToParts(new Date(currentDate))
    dateArray.push(`${date[0]['value']}/${date[2]['value']}`);
    currentDate = currentDate.addDays(1);
  }
  return dateArray;
}

const getDatesObj = (startDate, stopDate) => {
  let dateObject = {};
  let currentDate = startDate;
  const dateTimeFormat = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'numeric', day: '2-digit' });
  while (currentDate <= stopDate) {
    let date = dateTimeFormat.formatToParts(new Date(currentDate))
    dateObject[`${date[0]['value']}/${date[2]['value']}`] = {};
    currentDate = currentDate.addDays(1);
  }
  return dateObject;
}

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
  let firstKey = Object.keys(obj1)[0];
  let secondKey = Object.keys(obj2)[0];

  if (obj1[firstKey] < obj2[secondKey]) return 1;
  else if (obj1[firstKey] > obj2[secondKey]) return -1;
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
  } else if (county === "starr") { // TODO: UPDATE THIS
    if (endpoint === "cases") return STARR_DEFAULT_CASES;
    else if (endpoint === "deaths") return STARR_DEFAULT_DEATHS;
    else if (endpoint === "recoveries") return STARR_DEFAULT_RECOVERIES;
  } else if (county === "willacy") {
    if (endpoint === "cases") return WILLACY_DEFAULT_CASES;
    else if (endpoint === "deaths") return WILLACY_DEFAULT_DEATHS;
    else if (endpoint === "recoveries") return WILLACY_DEFAULT_RECOVERIES;
  }
  return CAMERON_DEFAULT_CASES;
}

const getDefaultActiveCases = (county) => {
  if (county === "cameron") return CAMERON_ACTIVE_CASES;
  else if (county === "hidalgo") return HIDALGO_ACTIVE_CASES;
  else if (county === "starr") return STARR_ACTIVE_CASES;
  else if (county === "willacy") return WILLACY_ACTIVE_CASES;
  return CAMERON_ACTIVE_CASES;
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

const getAgeRangeIfValueIsNumberV2 = (age) => {
  if (isNaN(age)) return age;

  if (age === "" || age == null) return 0;

  if (age === -1) return "Unknown";
  else if (age <= 19) return "0 - 19";
  else if (age <= 29) return "20 - 29";
  else if (age <= 39) return "30 - 39";
  else if (age <= 49) return "40 - 49";
  else if (age <= 59) return "50 - 59";
  else if (age <= 69) return "60 - 69";
  else if (age >= 70) return "70+";
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

// let alreadyAlertedFlag = false;

const getCoronaData = async(endpoint, county, V2=false) => {
  console.log({V2});
  let coronaMap = {};
  let backendEndpoint = getEndpoint(endpoint);
  let countyData = await getCoronaCases(backendEndpoint, county);

  if (countyData['status'] !== 200) {
    sendAnalytics(`Error Retrieving${backendEndpoint} Data`, `${countyData['status']} error from ${JSON.stringify(countyData)}`);
    console.error('api call failed');
    console.error({ countyData });
    // if (alreadyAlertedFlag) alreadyAlertedFlag = false;
    // else { 
    //   alert('There was an error getting the latest data. Please try refreshing the page later.')
    //   alreadyAlertedFlag = true;
    // }
    return getDefaultCases(endpoint, county);
  }
  // {
  //   age: null,
  //   city: "",
  //   county: "Hidalgo",
  //   date: "04/23/2020",
  //   gender: "",
  //   transmission: ""
  // }

  countyData = countyData['cases'];

  // let coronaMap2 = {};
  countyData.forEach(data => {
    const date = data["date"].substr(1, 4);
    if (!(date in coronaMap)) coronaMap[date] = {};
    // if (!(date in coronaMap2)) coronaMap2[date] = {};

    updateCount(coronaMap[date], "count");
    for (let d in data) {
      if (d === "county") coronaMap[date]["county"] = data[d];
      else {
        if (V2 === true) updateCount(coronaMap[date], getAgeRangeIfValueIsNumberV2(data[d]));
        else  updateCount(coronaMap[date], getAgeRangeIfValueIsNumber(data[d]));
      }
    }
    // updateCount(coronaMap2[date], "count");
    // for (let d in data) {
    //   if (d === "county") coronaMap2[date]["county"] = data[d];
    //   else {
    //     // console.log({coronaMap2});
    //     // console.log({data})
    //     // console.log(data[d])
    //     // coronaMap2[date][data[d]] = null;
    //     updateCount(coronaMap2[date], getAgeRangeIfValueIsNumber(data[d]));
    //   }
    // }
  })
  // console.log({coronaMap2})
  // console.log({countyData})

  if (Object.keys(coronaMap).length === 0) {
    return getDefaultCases(endpoint, county);
  }

  if (county.toLowerCase() === "cameron") {
    if (backendEndpoint === "getRGVCoronaCases") {
      coronaMap["3/18"]["count"] = 0;
      delete coronaMap["3/18"]["0"];
    } else if (backendEndpoint === "getRGVCoronaDeaths") {
      coronaMap["4/05"]["count"] = 0;
      delete coronaMap["4/05"]["0"];
    } else if (backendEndpoint === "getRGVRecoveredCases") {
      coronaMap["4/02"]["count"] = 0;
      delete coronaMap["4/02"]["0"];
    }
  } else if (county.toLowerCase() === "hidalgo") {
    if (backendEndpoint === "getRGVCoronaCases") {
      coronaMap["3/20"]["count"] = 0;
      delete coronaMap["3/20"]["0"];
    } else if (backendEndpoint === "getRGVCoronaDeaths") {
      coronaMap["4/06"]["count"] = 0;
      delete coronaMap["4/06"]["0"];
    } else if (backendEndpoint === "getRGVRecoveredCases") {
      coronaMap["4/07"]["count"] = 0;
      delete coronaMap["4/07"]["0"];
    }
  } else if (county.toLowerCase() === "starr") {
    if (backendEndpoint === "getRGVCoronaCases") {
      coronaMap["3/25"]["count"] = 0;
      delete coronaMap["3/25"]["0"];
    } else if (backendEndpoint === "getRGVCoronaDeaths") {
      coronaMap["4/07"]["count"] = 0;
      delete coronaMap["4/07"]["0"];
    } else if (backendEndpoint === "getRGVRecoveredCases") {
      coronaMap["4/07"]["count"] = 0;
      delete coronaMap["4/07"]["0"];
    }
  } else if (county.toLowerCase() === "willacy") {
    if (backendEndpoint === "getRGVCoronaCases") {
      coronaMap["3/25"]["count"] = 0;
      delete coronaMap["3/25"]["0"];
    } else if (backendEndpoint === "getRGVCoronaDeaths") {
      coronaMap["4/03"]["count"] = 0;
      delete coronaMap["4/03"]["0"];
    } else if (backendEndpoint === "getRGVRecoveredCases") {
      coronaMap["4/16"]["count"] = 0;
      delete coronaMap["4/16"]["0"];
    }
  }

  // console.log({coronaMap})

  let countyCoronaData = Object.keys(coronaMap).sort().map(key => {
    // console.log(coronaMap[key]);
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
        "0 - 19": getCount(coronaMap[key], "0 - 19"),
        "20 - 29": getCount(coronaMap[key], "20 - 29"),
        "20 - 29": getCount(coronaMap[key], "20 - 29"),
        "30 - 39": getCount(coronaMap[key], "30 - 39"),
        "40 - 49": getCount(coronaMap[key], "40 - 49"),
        "50 - 59": getCount(coronaMap[key], "50 - 59"),
        "60 - 69": getCount(coronaMap[key], "60 - 69"),
        "70+": getCount(coronaMap[key], "70+"),
      },
      "Cities": {
        // Cameron
        "Harlingen": getCount(coronaMap[key], "Harlingen"),
        "Bayview": getCount(coronaMap[key], "Bayview"),
        "Brownsville": getCount(coronaMap[key], "Brownsville"),
        "Rancho Viejo": getCount(coronaMap[key], "Rancho Viejo"),
        "Rio Hondo": getCount(coronaMap[key], "Rio Hondo"),
        "Los Fresnos": getCount(coronaMap[key], "Los Fresnos"),
        "La Feria": getCount(coronaMap[key], "La Feria"),
        "San Benito": getCount(coronaMap[key], "San Benito"),
        "Laguna Vista": getCount(coronaMap[key], "Laguna Vista"),
        "Santa Rosa": getCount(coronaMap[key], "Santa Rosa"),
        "Port Isabel": getCount(coronaMap[key], "Port Isabel"),
        "Palm Valley": getCount(coronaMap[key], "Palm Valley"),
        "Olmito": getCount(coronaMap[key], "Olmito"),
        "Los Indios": getCount(coronaMap[key], "Los Indios"),
        "Combes": getCount(coronaMap[key], "Combes"),
        "Primera": getCount(coronaMap[key], "Primera"),
        "Indian Lake": getCount(coronaMap[key], "Indian Lake"),
        "Santa Maria": getCount(coronaMap[key], "Santa Maria"),
        "South Padre Island": getCount(coronaMap[key], "South Padre Island"),
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
        "Alton": getCount(coronaMap[key], "Alton"),
        // Starr
        "Rio Grande City": getCount(coronaMap[key], "Rio Grande City"),
        "Escobares": getCount(coronaMap[key], "Escobares"),
      },
    }
  })
  return countyCoronaData;
}

const getAllLatestCases = async() => {
  const defaultData = true;
  let [cameronData, hidalgoData, starrData, willacyData] = await Promise.all([
    getActiveCases("cameron", defaultData),
    getActiveCases("hidalgo", defaultData),
    getActiveCases("starr", defaultData),
    getActiveCases("willacy", defaultData)
  ]);

  // console.log({cameronData})
  // console.log({hidalgoData})
  // console.log({starrData})
  // console.log({willacyData})

  hidalgoData.unshift({Date: "3/19", Count: 0, Cases: 0, Deaths: 0, Recoveries: 0})
  hidalgoData.unshift({Date: "3/18", Count: 0, Cases: 0, Deaths: 0, Recoveries: 0})

  starrData.unshift({Date: "3/24", Count: 0, Cases: 0, Deaths: 0, Recoveries: 0})
  starrData.unshift({Date: "3/23", Count: 0, Cases: 0, Deaths: 0, Recoveries: 0})
  starrData.unshift({Date: "3/22", Count: 0, Cases: 0, Deaths: 0, Recoveries: 0})
  starrData.unshift({Date: "3/21", Count: 0, Cases: 0, Deaths: 0, Recoveries: 0})
  starrData.unshift({Date: "3/20", Count: 0, Cases: 0, Deaths: 0, Recoveries: 0})
  starrData.unshift({Date: "3/19", Count: 0, Cases: 0, Deaths: 0, Recoveries: 0})
  starrData.unshift({Date: "3/18", Count: 0, Cases: 0, Deaths: 0, Recoveries: 0})

  willacyData.unshift({Date: "3/24", Count: 0, Cases: 0, Deaths: 0, Recoveries: 0})
  willacyData.unshift({Date: "3/23", Count: 0, Cases: 0, Deaths: 0, Recoveries: 0})
  willacyData.unshift({Date: "3/22", Count: 0, Cases: 0, Deaths: 0, Recoveries: 0})
  willacyData.unshift({Date: "3/21", Count: 0, Cases: 0, Deaths: 0, Recoveries: 0})
  willacyData.unshift({Date: "3/20", Count: 0, Cases: 0, Deaths: 0, Recoveries: 0})
  willacyData.unshift({Date: "3/19", Count: 0, Cases: 0, Deaths: 0, Recoveries: 0})
  willacyData.unshift({Date: "3/18", Count: 0, Cases: 0, Deaths: 0, Recoveries: 0})

  hidalgoData.forEach((data, i) => {
    cameronData[i]["CountHidalgo"] = data['Count'];
    cameronData[i]["CasesHidalgo"] = data['Cases'];
    cameronData[i]["DeathsHidalgo"] = data['Deaths'];
    cameronData[i]["RecoveriesHidalgo"] = data['Recoveries'];
  })

  starrData.forEach((data, i) => {
    cameronData[i]["CountStarr"] = data['Count'];
    cameronData[i]["CasesStarr"] = data['Cases'];
    cameronData[i]["DeathsStarr"] = data['Deaths'];
    cameronData[i]["RecoveriesStarr"] = data['Recoveries'];
  })

  willacyData.forEach((data, i) => {
    cameronData[i]["CountWillacy"] = data['Count'];
    cameronData[i]["CasesWillacy"] = data['Cases'];
    cameronData[i]["DeathsWillacy"] = data['Deaths'];
    cameronData[i]["RecoveriesWillacy"] = data['Recoveries'];
  })

  return cameronData;
}

const getActiveCases = async (county, defaultData = true) => {
  if (defaultData) return getDefaultActiveCases(county);
  const [cases, deaths, recoveries] = await Promise.all([
    this.getLatestCoronaData("cases", county),
    this.getLatestCoronaData("deaths", county),
    this.getLatestCoronaData("recoveries", county)
  ]);

  let totalCases = 0;
  let firstDay = 18;
  if (county === "Hidalgo" || county === "hidalgo") firstDay = 20;
  if (county === "Starr" || county === "starr") firstDay = 25;
  if (county === "Willacy" || county === "willacy") firstDay = 25;

  let activeCases = getDatesObj(new Date(2020,2,firstDay,0,0,0,0), new Date());

  cases.forEach((c, i) => {
    if (i !== 0) totalCases += cases[i - 1]["Count"];
    activeCases[c["Date"]] = {"cases": c["Count"], "activeCases": c["Count"] + totalCases};
  });

  recoveries.forEach((recovery, i) => {
    if (recovery["Date"] in activeCases) {
      activeCases[recovery["Date"]]["recoveries"] = recovery["Count"];
      let flag = false;
      Object.keys(activeCases).forEach(activeCaseDate => {
        if (!flag && recovery["Date"] === activeCaseDate) flag = true;
        if (flag) activeCases[activeCaseDate]["activeCases"] -= recoveries[i]["Count"];
      })
    }
  });

  deaths.forEach((death, i) => {
    if (death["Date"] in activeCases) {
      activeCases[death["Date"]]["deaths"] = death["Count"];
      let flag = false;
      Object.keys(activeCases).forEach(activeCaseDate => {
        if (!flag && death["Date"] === activeCaseDate) flag = true;
        if (flag) activeCases[activeCaseDate]["activeCases"] -= deaths[i]["Count"];
      })
    }
  });

  let coronaData = Object.keys(activeCases).sort().map((key, i) => {
    let currentDay = activeCases[key];
    let dateArr = key.split("/");
    let currMonth = parseInt(dateArr[0]);
    let currDay = parseInt(dateArr[1]);
    let prevDay = currDay - 1;
    if ((currMonth === 4 || currMonth === 6) && currDay === 1) {
      currMonth -= 1;
      prevDay = 31;
    } else if (currMonth === 5 && currDay === 1) {
      currMonth -= 1;
      prevDay = 30;
    }

    if (prevDay < 10)
      prevDay = "0" + prevDay;
    let prevDate = `${currMonth}/${prevDay}`
    if (Object.keys(currentDay).length === 0) {
      currentDay["activeCases"] = activeCases[prevDate]["activeCases"];
      currentDay["cases"] = currentDay["deaths"] = currentDay["recoveries"] = 0;
    }

    let count = currentDay["activeCases"];
    let cases = currentDay["cases"];
    let deaths = currentDay["deaths"];
    let recoveries = currentDay["recoveries"];
    if (i !== 0) {
      if (isNaN(count)) {
        currentDay["activeCases"] = activeCases[prevDate]["activeCases"];
        count = currentDay["activeCases"];
      }
    }
    return {
      "Date": key,
      "Count": count,
      "Cases": "cases" in currentDay ? cases : 0,
      "Deaths": "deaths" in currentDay ? deaths : 0,
      "Recoveries": "recoveries" in currentDay ? recoveries : 0,
    }
  })
  return coronaData;
}

const getCoronaCases = async(endpoint, county) => {
  try {
    const resp = await fetch(`https://rgvcovid19backend.herokuapp.com/${endpoint}/${county}`, {
    // const resp = await fetch(`http://localhost:7555/${endpoint}/${county}`, {
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

const getSiteData = async(endpoint) => {
  try {
    const resp = await fetch(`https://rgvcovid19backend.herokuapp.com/${endpoint}`, {
    // const resp = await fetch(`http://localhost:7555/${endpoint}/${county}`, {
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
  getToday,
  getDatesArr,
  getDatesObj,
  getPluralCount,
  getDefaultActiveCases,
  getAllLatestCases,
  getSiteData,
  numberWithCommas,
  shallowCompare,
  getCoronaData,
  determineScreenState,
  getUsefulData,
  compare,
  sendAnalytics,
  scrollToTop,
  getDefaultCases,
};
