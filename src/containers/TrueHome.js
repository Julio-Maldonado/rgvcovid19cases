import React from 'react';

import CoronaChart from '../components/Home/CoronaChart';

import SideMenu from '../components/utility/SideMenu';
import Footer from '../components/utility/Footer';
import MyNavBar from '../components/utility/MyNavBar';

import Parser from 'rss-parser';

import {
  getToday,
  getDatesObj,
  getUsefulData,
  getSiteData,
  getCoronaData,
  getDefaultActiveCases,
  getPluralCount,
  determineScreenState,
  shallowCompare,
  sendAnalytics,
  scrollToTop,
  getFBPostTime,
  checkScreenSize,
  getAllActiveCases
} from '../constants/helperFunctions';

import { ENDPOINT_MAP, LAST_DAY_STATS_ORIGINAL, CITIES_MAP, RSS_ITEMS } from '../constants/constants';

import DEFAULT_CORONA_DATA from '../constants/DEFAULT_CORONA_DATA';

import FundClockProgress from "./custom_fundraiser";
import { isMobile, isAndroid, isIOS } from 'react-device-detect';

import './styles.css';

class Home extends React.Component {
  state = {
    county: this.props.county,
    coronaData: DEFAULT_CORONA_DATA,
    height: 0,
    width: 0,
    currentFund: 872,
    softcap: 1500,
    hardcap: 1500,
    milestonesData: [
      { text: "Start", cap: 0 },
      { text: "Current $872", cap: 872 },
      { text: "Goal $1500", cap: 1500 }
    ],
    totalDonors: 1,
    lastDayStatsCameron: {},
    lastDayStatsHidalgo: {},
    lastDayStatsStarr: {},
    lastDayStatsWillacy: {},
    feedUrl: "",
    feedItems: [],
    site_last_updated_at: 0
  }

  screenIsSuperLong = false; // not iphone X or 11

  componentDidMount() {
    window.addEventListener('resize', this.updateWindowDimensions);

    this.updateWindowDimensions();

    let { endpoint } = this.state;
    let { location } = this.props;

    if (location) {
      const urlPaths = this.props.location['pathname'].substr(1).split("/");
      let pathname = "";
      if (urlPaths.length === 1) pathname = "active";
      else pathname = urlPaths[1];

      if (pathname in ENDPOINT_MAP) endpoint = pathname;
      else if (!(endpoint in ENDPOINT_MAP)) endpoint = "active";
      else endpoint = "active";
    }

    this.updateStateEndpoint(endpoint);

    setTimeout(this.justMounted, 1000);

    if (checkScreenSize()) this.screenIsSuperLong = true;
    else this.screenIsSuperLong = false;

    setTimeout(this.updateWindowDimensions, 1000);

    this.icoFundRaising = setInterval(() => this.updateFundRaising(), 500);
  }

  updateFundRaising = () => {
    const { fundData } = this.state;
    let { currentFund, milestonesData, softcap, hardcap, site_last_updated_at } = this.state;

    if (fundData && fundData.length > 2 && 'name' in fundData[2]) {
      currentFund = fundData[2]['amount'];
      let goalFund = fundData[0]['amount'];
      hardcap = softcap = fundData[0]['amount'];
      milestonesData[1]['cap'] = currentFund;
      milestonesData[1]['text'] = `Current $${currentFund}`;
      milestonesData[2]['cap'] = goalFund;
      milestonesData[2]['text'] = `Goal $${goalFund}`;
      let totalDonors = fundData[1]['amount'];
      site_last_updated_at = fundData[3]['amount'];

      this.setState({ currentFund, milestonesData, softcap, hardcap, totalDonors, site_last_updated_at });
      clearInterval(this.icoFundRaising);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions); 
    clearInterval(this.icoFundRaising);
  }

  updateWindowDimensions = () => {
    let height = window.innerHeight;
    let width = window.innerWidth;

    if (Math.abs(this.state.height - window.innerHeight) < 100) height = this.state.height;

    if (height / width > 1.7 || checkScreenSize()) this.screenIsSuperLong = true;
    else this.screenIsSuperLong = false;

    this.setState({ width, height });
  }

  getLatestUsefulData = async (county) => {
    const usefulData = await getUsefulData(county);
    if (county === "cameron")
      this.setState({
        casesCountCameron: usefulData['cases']['count'] - 1,
        deathsCountCameron: usefulData['deaths']['count'] - 1,
        recoveriesCountCameron: usefulData['recoveries']['count'] - 1,
      });
    else if (county === "hidalgo")
      this.setState({
        casesCountHidalgo: usefulData['cases']['count'] - 1,
        deathsCountHidalgo: usefulData['deaths']['count'] - 1,
        recoveriesCountHidalgo: usefulData['recoveries']['count'] - 1,
      });
    else if (county === "starr")
      this.setState({
        casesCountStarr: usefulData['cases']['count'] - 1,
        deathsCountStarr: usefulData['deaths']['count'] - 1,
        recoveriesCountStarr: usefulData['recoveries']['count'] - 1,
      });
    else if (county === "willacy")
      this.setState({
        casesCountWillacy: usefulData['cases']['count'] - 1,
        deathsCountWillacy: usefulData['deaths']['count'] - 1,
        recoveriesCountWillacy: usefulData['recoveries']['count'] - 1,
      });
  }

  getAllLatestCases = async() => {
    // let defaultData = false;
    let defaultData = true;
    // this.printMetrics = false;
    this.printMetrics = true;
    let [cameronData, hidalgoData, starrData, willacyData] = await Promise.all([
      this.getActiveCases("cameron", defaultData),
      this.getActiveCases("hidalgo", defaultData),
      this.getActiveCases("starr", defaultData),
      this.getActiveCases("willacy", defaultData)
    ]);
    if (defaultData === false) {
      console.log({cameronData})
      console.log({hidalgoData})
      console.log({starrData})
      console.log({willacyData})
      return;
    }

    if (hidalgoData.length !== cameronData.length) {
      hidalgoData.unshift({Date: "3/19", Count: 0, Cases: 0, Deaths: 0, Recoveries: 0})
      hidalgoData.unshift({Date: "3/18", Count: 0, Cases: 0, Deaths: 0, Recoveries: 0})
    }

    if (starrData.length !== cameronData.length) {
      starrData.unshift({Date: "3/24", Count: 0, Cases: 0, Deaths: 0, Recoveries: 0})
      starrData.unshift({Date: "3/23", Count: 0, Cases: 0, Deaths: 0, Recoveries: 0})
      starrData.unshift({Date: "3/22", Count: 0, Cases: 0, Deaths: 0, Recoveries: 0})
      starrData.unshift({Date: "3/21", Count: 0, Cases: 0, Deaths: 0, Recoveries: 0})
      starrData.unshift({Date: "3/20", Count: 0, Cases: 0, Deaths: 0, Recoveries: 0})
      starrData.unshift({Date: "3/19", Count: 0, Cases: 0, Deaths: 0, Recoveries: 0})
      starrData.unshift({Date: "3/18", Count: 0, Cases: 0, Deaths: 0, Recoveries: 0})
    }

    if (willacyData.length !== cameronData.length) {
      willacyData.unshift({Date: "3/24", Count: 0, Cases: 0, Deaths: 0, Recoveries: 0})
      willacyData.unshift({Date: "3/23", Count: 0, Cases: 0, Deaths: 0, Recoveries: 0})
      willacyData.unshift({Date: "3/22", Count: 0, Cases: 0, Deaths: 0, Recoveries: 0})
      willacyData.unshift({Date: "3/21", Count: 0, Cases: 0, Deaths: 0, Recoveries: 0})
      willacyData.unshift({Date: "3/20", Count: 0, Cases: 0, Deaths: 0, Recoveries: 0})
      willacyData.unshift({Date: "3/19", Count: 0, Cases: 0, Deaths: 0, Recoveries: 0})
      willacyData.unshift({Date: "3/18", Count: 0, Cases: 0, Deaths: 0, Recoveries: 0})
    }

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

  justMounted = async () => {
    sendAnalytics(`True Home Just Mounted`, `Home website was just mounted`);

    console.log("hey");
    console.log("if you're reading this");
    console.log("you should definitely email me at julio.maldonado.guzman@gmail.com to help contribute to this project");

    // this.routeSite(this.state.county, endpoint);
    this.getLatestUsefulData("cameron");
    this.getLatestUsefulData("hidalgo");
    this.getLatestUsefulData("starr");
    this.getLatestUsefulData("willacy");

    // await Promise.all([
    //   this.getLatestUsefulData("cameron"),
    //   this.getLatestUsefulData("hidalgo"),
    //   this.getLatestUsefulData("starr"),
    //   this.getLatestUsefulData("willacy")
    // ]);
    // const coronaData = await this.getAllLatestCases();
    let activeCasesResponse = await getAllActiveCases('get');
    console.log({activeCasesResponse})
    const coronaData = activeCasesResponse['status'] === 400 ? activeCasesResponse['activeCases'] : DEFAULT_CORONA_DATA;

    this.setState({coronaData});
    const siteData = await getSiteData('getSiteData');
    if (siteData['status'] === 200) this.setState({ fundData: siteData['data'] })
    console.log({coronaData});

    let parser = {};
    let feed = {};

    if (!isMobile) {
      parser = new Parser();
      feed = await parser.parseURL('https://rss.app/feeds/oC1FkguURyVrIjQ3.xml');
    }

    let feedUrl = "";
    let feedItems = [];
    let filteredFeedItems = [];
    // feed = false;
    if (isMobile) {
      feedUrl = "https://scontent-syd2-1.xx.fbcdn.net/v/t1.0-1/p200x200/83673078_107766820993927_3770145121888083400_n.png?_nc_cat=102&_nc_sid=dbb9e7&_nc_ohc=ghvqlrsI3ScAX9uyheq&_nc_ht=scontent-syd2-1.xx&oh=974b14f8a6a147938473736e645f002a&oe=5F27DDA2";
      feed = RSS_ITEMS;
      feedItems = feed.items;
      filteredFeedItems = feedItems.filter(feedItem => feedItem.contentSnippet.includes("safe"))
      feedItems = filteredFeedItems.slice(0, Math.max(5, Math.min(5, filteredFeedItems.length)));
      if (isAndroid) {
        feedItems = feedItems.map(feedItem => {
          feedItem['link'] = `fb://page/106137601156849`;
          return feedItem;
        })
      } else if (isIOS) {
        feedItems = feedItems.map(feedItem => {
          feedItem['link'] = `fb://profile/106137601156849`;
          return feedItem;
        })
      }
    } else {
      feedUrl = feed.image.url;
      console.log({feed});
      feedItems = feed.items;
      filteredFeedItems = feedItems.filter(feedItem => feedItem.contentSnippet.includes("safe"));
      feedItems = filteredFeedItems.slice(0, Math.max(5, Math.min(5, filteredFeedItems.length)));
      const screenState = determineScreenState(this.state.width);
      if ((screenState === "wide" || screenState === "full" || screenState === "pacman")) {
        feedItems.forEach((feedItem, i) => {
          let content = feedItems[i].content;
          content = content.replace("width: 100%", "width: 50%");
          content = content.replace("<img src", '<div style="text-align: center;"><img src');
          content = content.replace("><div>", '></div><div>');
          feedItems[i].content = content;
        })
      }
    }

    this.setState({feedUrl, feedItems});
  }

  updateCountyStats = (county, statsToBeUpdated, apiData) => {
    const total = apiData["Count"];

    statsToBeUpdated["total"] = total;
    statsToBeUpdated["gender"]["male"] = apiData["Gender"]["Male"];
    statsToBeUpdated["gender"]["female"] = apiData["Gender"]["Female"];
    statsToBeUpdated["gender"]["unknown"] = total - statsToBeUpdated["gender"]["male"] - statsToBeUpdated["gender"]["female"];
    statsToBeUpdated["transmission"]["travel"] = apiData["Transmission"]["Travel"];
    statsToBeUpdated["transmission"]["community"] = apiData["Transmission"]["Community"]
    statsToBeUpdated["transmission"]["linkedToPreviousCase"] = apiData["Transmission"]["Linked To Previous Case"]
    statsToBeUpdated["transmission"]["unknown"] = total -  apiData["Transmission"]["Travel"] -apiData["Transmission"]["Community"] - apiData["Transmission"]["Linked To Previous Case"];
    statsToBeUpdated["ages"]["0 - 19"] = apiData["Ages"]["0 - 19"];
    statsToBeUpdated["ages"]["20 - 29"] = apiData["Ages"]["20 - 29"];
    statsToBeUpdated["ages"]["30 - 39"] = apiData["Ages"]["30 - 39"];
    statsToBeUpdated["ages"]["40 - 49"] = apiData["Ages"]["40 - 49"];
    statsToBeUpdated["ages"]["50 - 59"] = apiData["Ages"]["50 - 59"];
    statsToBeUpdated["ages"]["60 - 69"] = apiData["Ages"]["60 - 69"];
    statsToBeUpdated["ages"]["70+"] = apiData["Ages"]["70+"];
    statsToBeUpdated["ages"]["unknown"] = total - apiData["Ages"]["0 - 19"] - apiData["Ages"]["20 - 29"] - apiData["Ages"]["30 - 39"] - apiData["Ages"]["40 - 49"] - apiData["Ages"]["50 - 59"] - apiData["Ages"]["60 - 69"] - apiData["Ages"]["70+"];

    let cityCount = 0;
    CITIES_MAP[county].forEach(city => {
      statsToBeUpdated["cities"][city] = apiData["Cities"][city];
      cityCount += apiData["Cities"][city];
    })

    statsToBeUpdated["cities"]["unknown"] = total - cityCount;
  }

  updateAllStats = (allStats, dayStats) => {
    Object.keys(dayStats).forEach(dayStatsKey => {
      const dayStatValueType = typeof(dayStats[dayStatsKey]);
      const dayStatValue = dayStats[dayStatsKey];
      if (dayStatValueType === "number") {
        allStats[dayStatsKey] += dayStatValue;
      } else if (dayStatValueType === "object") {
        Object.keys(dayStatValue).forEach(dayStatInnerKey => {
          allStats[dayStatsKey][dayStatInnerKey] += dayStats[dayStatsKey][dayStatInnerKey];
        })
      }
    })
  }

  calculateLastXStats = (numOfDays, cases, county) => {
    let lastWeekCases = cases.slice(cases.length - numOfDays)
    let totalStats = JSON.parse(JSON.stringify(LAST_DAY_STATS_ORIGINAL))[county];
    lastWeekCases.forEach(dayCases => {
      let tempDayStats = JSON.parse(JSON.stringify(LAST_DAY_STATS_ORIGINAL))[county];
      this.updateCountyStats(county, tempDayStats, dayCases);
      this.updateAllStats(totalStats, tempDayStats);
    })
    return totalStats;
  }

  getActiveCases = async (county, defaultData = true) => {
    this.printMetrics = false;
    this.printMetrics = true;
    if (this.printMetrics === true) {
      const v2 = true;
      let [cases, deaths, recoveries] = await Promise.all([
        this.getLatestCoronaData("cases", county, v2),
        this.getLatestCoronaData("deaths", county, v2),
        this.getLatestCoronaData("recoveries", county, v2)
      ]);

      let lastDayCases = cases.slice(cases.length - 1)[0];
      const lastDayCasesDate = lastDayCases['Date'];
      // let lastDayDeaths = deaths.slice(deaths.length - 1)[0];
      // let lastDayRecoveries = recoveries.slice(recoveries.length - 1)[0];

      let lastDayStats = JSON.parse(JSON.stringify(LAST_DAY_STATS_ORIGINAL))[county];

      this.updateCountyStats(county, lastDayStats, lastDayCases);
      const consoleMap = {
        "linkedToPreviousCase": "a link to a previous case",
        "travel": "travel",
        "community": "community",
        "unknown": "unknown"
        // ""
      }
      const printLastDayFlag = false;
      // const printLastDayFlag = true;
      if (printLastDayFlag) {
        console.log(
          `${county[0].toUpperCase() + county.slice(1,county.length)} County update for ${lastDayCasesDate}: ${lastDayStats["total"]} new cases, ` +
          `${(lastDayStats["gender"][Object.keys(lastDayStats["gender"]).reduce((prev, current) => (lastDayStats["gender"][prev] > lastDayStats["gender"][current]) ? prev : current)] / lastDayStats["total"] * 100).toFixed(0)}% were ` +
          `${(Object.keys(lastDayStats["gender"]).reduce((prev, current) => (lastDayStats["gender"][prev] > lastDayStats["gender"][current]) ? prev : current))}, ` +
          `${(lastDayStats["transmission"][Object.keys(lastDayStats["transmission"]).reduce((prev, current) => (lastDayStats["transmission"][prev] > lastDayStats["transmission"][current]) ? prev : current)] / lastDayStats["total"] * 100).toFixed(0)}% were contracted through ` +
          `${consoleMap[(Object.keys(lastDayStats["transmission"]).reduce((prev, current) => (lastDayStats["transmission"][prev] > lastDayStats["transmission"][current]) ? prev : current))]}, and ` +
          `${(lastDayStats["ages"][Object.keys(lastDayStats["ages"]).reduce((prev, current) => (lastDayStats["ages"][prev] > lastDayStats["ages"][current]) ? prev : current)] / lastDayStats["total"] * 100).toFixed(0)}% were in the age range of ` +
          `${(Object.keys(lastDayStats["ages"]).reduce((prev, current) => (lastDayStats["ages"][prev] > lastDayStats["ages"][current]) ? prev : current))}.`
        )

        console.log(`gender percentages for ${county}`);
        console.log(Object.keys(lastDayStats["gender"]).map(genderKey => {return {[genderKey]: (lastDayStats["gender"][genderKey] / lastDayStats["total"] * 100).toFixed()}}));
        console.log(`city percentages for ${county}`);
        console.log(Object.keys(lastDayStats["cities"]).map(citiesKey => {return {[citiesKey]: (lastDayStats["cities"][citiesKey] / lastDayStats["total"] * 100).toFixed()}}));
        console.log(`transmission percentages for ${county}`);
        console.log(Object.keys(lastDayStats["transmission"]).map(transmissionKey => {return {[transmissionKey]: (lastDayStats['transmission'][transmissionKey] / lastDayStats["total"] * 100).toFixed()}}));
        console.log(`age range percentages for ${county}`);
        console.log(Object.keys(lastDayStats["ages"]).map(agesKey => {return {[agesKey]: (lastDayStats['ages'][agesKey] / lastDayStats["total"] * 100).toFixed()}}))

        console.log('\n');
      }

      // const printLastXDaysFlag = false;
      const printLastXDaysFlag = true;
      if (printLastXDaysFlag) {
        const numOfDays = 5;
        const lastXStats = this.calculateLastXStats(numOfDays, cases, county);

        console.log(
          `${county[0].toUpperCase() + county.slice(1,county.length)} County update for ${cases[cases.length - 7]['Date']} - ${cases[cases.length - 1]['Date']}: ${lastXStats["total"]} confirmed cases, ` +
          `${(lastXStats["gender"][Object.keys(lastXStats["gender"]).reduce((prev, current) => (lastXStats["gender"][prev] > lastXStats["gender"][current]) ? prev : current)] / lastXStats["total"] * 100).toFixed(0)}% were ` +
          `${(Object.keys(lastXStats["gender"]).reduce((prev, current) => (lastXStats["gender"][prev] > lastXStats["gender"][current]) ? prev : current))}, ` +
          `${(lastXStats["transmission"][Object.keys(lastXStats["transmission"]).reduce((prev, current) => (lastXStats["transmission"][prev] > lastXStats["transmission"][current]) ? prev : current)] / lastXStats["total"] * 100).toFixed(0)}% were contracted through ` +
          `${consoleMap[(Object.keys(lastXStats["transmission"]).reduce((prev, current) => (lastXStats["transmission"][prev] > lastXStats["transmission"][current]) ? prev : current))]}, and ` +
          `${(lastXStats["ages"][Object.keys(lastXStats["ages"]).reduce((prev, current) => (lastXStats["ages"][prev] > lastXStats["ages"][current]) ? prev : current)] / lastXStats["total"] * 100).toFixed(0)}% were in the age range of ` +
          `${(Object.keys(lastXStats["ages"]).reduce((prev, current) => (lastXStats["ages"][prev] > lastXStats["ages"][current]) ? prev : current))}.`
        );

        console.log(`gender percentages for ${county}`);
        console.log(Object.keys(lastXStats["gender"]).map(genderKey => {return {[genderKey]: (lastXStats["gender"][genderKey] / lastXStats["total"] * 100).toFixed()}}));
        console.log(`city percentages for ${county}`);
        console.log(Object.keys(lastXStats["cities"]).map(citiesKey => {return {[citiesKey]: (lastXStats["cities"][citiesKey] / lastXStats["total"] * 100).toFixed()}}));
        console.log(`transmission percentages for ${county}`);
        console.log(Object.keys(lastXStats["transmission"]).map(transmissionKey => {return {[transmissionKey]: (lastXStats['transmission'][transmissionKey] / lastXStats["total"] * 100).toFixed()}}));
        console.log(`age range percentages for ${county}`);
        console.log(Object.keys(lastXStats["ages"]).map(agesKey => {return {[agesKey]: (lastXStats['ages'][agesKey] / lastXStats["total"] * 100).toFixed()}}))

        console.log('\n');
      }

      // console.log({lastDayCases});
      // let lastWeekDeaths = deaths.slice(deaths.length - 7)
      // let lastWeekRecoveries = recoveries.slice(recoveries.length - 7)
      // console.log({cases});
      // console.log({deaths});
      // console.log({recoveries});
      // cases.forEach({

      // })
    }

    if (defaultData) return getDefaultActiveCases(county);
    const [cases, deaths, recoveries] = await Promise.all([
      this.getLatestCoronaData("cases", county),
      this.getLatestCoronaData("deaths", county),
      this.getLatestCoronaData("recoveries", county)
    ]);

    if (defaultData === false) {
      console.log(county);
      console.log({cases});
      console.log({deaths});
      console.log({recoveries});
    }

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
      } else if (currMonth === 7 && currDay === 1) {
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

  getLatestCoronaData = async(endpoint, county, V2=false) => {
    sendAnalytics(`Getting Latest ${endpoint} Data`, `User requesting latest ${county} data for ${endpoint} from ${this.state.endpoint} page`);

    if (!endpoint) endpoint = "active"

    if (!county) county = this.state.county;
    const coronaData = await getCoronaData(endpoint, county, V2);
    return coronaData;
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (shallowCompare(this, nextProps, nextState)) return true;

    return false;
  }

  updateStateEndpoint = (endpoint) => { endpoint in ENDPOINT_MAP ? this.setState({ endpoint }): this.setState({ endpoint: 'active'}); }

  navigateSideMenu = () => { this.setState({isOpen: !this.state.isOpen}); }

  aClick = async (endpoint, prevEndpoint, county) => {
    sendAnalytics(`A Click Nagivation`, `User navigated to ${endpoint} from ${prevEndpoint} for ${county}`);
    this.routeSite(county, endpoint);
    scrollToTop();
  }

  linkClick = async (endpoint, prevEndpoint, county) => {
    sendAnalytics(`Link Click Navigation`, `User navigated to ${endpoint} from ${prevEndpoint} for ${county}`);
    this.routeSite(county, endpoint);
    scrollToTop();
  }

  routeSite = (county, endpoint) => {
    if (!county || county === "") county = "cameron";
    this.updateStateEndpoint(county)
    // if (endpoint === "home") this.props.history.push(`/${endpoint}`);
    // else this.props.history.push(`/${county}/${endpoint}`);
    this.props.history.push(`/${county}/${endpoint}`);
  }

  render() {
    let { county } = this.state;
    const { coronaData, category, width, milestonesData, feedUrl, feedItems, site_last_updated_at } = this.state;

    const {
      casesCountCameron,
      deathsCountCameron,
      recoveriesCountCameron,
      casesCountHidalgo,
      deathsCountHidalgo,
      recoveriesCountHidalgo,
      casesCountStarr,
      deathsCountStarr,
      recoveriesCountStarr,
      casesCountWillacy,
      deathsCountWillacy,
      recoveriesCountWillacy,
    } = this.state;

    if (!county) county = "cameron";

    let { height } = this.state
    if (this.screenIsSuperLong) height = height * 0.8

    const screenState = determineScreenState(width);
    let endpoint = "home";

    return (
      <div className="App">
        <MyNavBar county={county} endpoint={endpoint} linkClick={this.linkClick} aClick={this.aClick}/>
        <div onClick={() => this.navigateSideMenu()}>
          <SideMenu
            right
            width={width}
            county={county}
            endpoint={endpoint}
            aClick={this.aClick}
            linkClick={this.linkClick}
            isOpen={this.state.isOpen}
          />
        </div>
        <div className="App-content">
        <h1>RGV COVID-19 Curves</h1>
        <h2>
          This graph shows the Cameron, Hidalgo, Starr, and Willacy County COVID-19 curves.
        </h2>
          <CoronaChart
            width={width}
            height={height}
            category={category}
            county={county}
            endpoint={endpoint}
            coronaData={coronaData}
            screenState={screenState}
          />
          <br/>
          <p>Last updated: {site_last_updated_at ? getFBPostTime(site_last_updated_at) : ''}</p>
          {
            deathsCountCameron && recoveriesCountCameron && deathsCountHidalgo && recoveriesCountHidalgo ?
            <div>
            <p>
              Cameron: {casesCountCameron - recoveriesCountCameron - deathsCountCameron},
              Hidalgo: {casesCountHidalgo - recoveriesCountHidalgo - deathsCountHidalgo},
              Starr: {casesCountStarr - recoveriesCountStarr - deathsCountStarr},
              Willacy: {casesCountWillacy - recoveriesCountWillacy - deathsCountWillacy}
            </p>
            </div>
              : null
          }
          <br/>
          {deathsCountCameron && recoveriesCountCameron && deathsCountHidalgo && recoveriesCountHidalgo ?
            <p>Numbers at a Glance</p>
            : null
          }
          {
            deathsCountCameron && recoveriesCountCameron && deathsCountHidalgo && recoveriesCountHidalgo ?
              <table className="home-table" align={"center"}>
                <thead>
                <tr>
                  <th></th>
                  <th>Cameron</th>
                  <th>Hidalgo</th>
                  <th>Starr</th>
                  <th>Willacy</th>
                </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Total Cases</td>
                    <td>{casesCountCameron}</td>
                    <td>{casesCountHidalgo}</td>
                    <td>{casesCountStarr}</td>
                    <td>{casesCountWillacy}</td>
                  </tr>
                  <tr>
                    <td>Total Recovered</td>
                    <td>{recoveriesCountCameron}</td>
                    <td>{recoveriesCountHidalgo}</td>
                    <td>{recoveriesCountStarr}</td>
                    <td>{recoveriesCountWillacy}</td>
                  </tr>
                  <tr>
                    <td>Total Deaths</td>
                    <td>{deathsCountCameron}</td>
                    <td>{deathsCountHidalgo}</td>
                    <td>{deathsCountStarr}</td>
                    <td>{deathsCountWillacy}</td>
                  </tr>
                  <tr>
                    <td>Death Rate</td>
                    <td>{(deathsCountCameron / casesCountCameron * 100).toFixed(1)}%</td>
                    <td>{(deathsCountHidalgo / casesCountHidalgo * 100).toFixed(1)}%</td>
                    <td>{(deathsCountStarr / casesCountStarr * 100).toFixed(1)}%</td>
                    <td>{(deathsCountWillacy / casesCountWillacy * 100).toFixed(1)}%</td>
                  </tr>
                  <tr>
                    <td>Recovery Rate</td>
                    <td>{(recoveriesCountCameron / casesCountCameron * 100).toFixed(1)}%</td>
                    <td>{(recoveriesCountHidalgo / casesCountHidalgo * 100).toFixed(1)}%</td>
                    <td>{(recoveriesCountStarr / casesCountStarr * 100).toFixed(1)}%</td>
                    <td>{(recoveriesCountWillacy / casesCountWillacy * 100).toFixed(1)}%</td>
                  </tr>
                </tbody>
              </table>
              : null
          }
          <br/>
          <br/>
          See more data on:
          {isMobile ? <br /> : null}
          <button className="my-button" onClick={e => {this.aClick("active", "home", "cameron");}}>
            Cameron County
          </button>
          {isMobile ? <br /> : null}
          <button className="my-button" onClick={e => {this.aClick("active", "home", "hidalgo");}}>
            Hidalgo County
          </button>
          {isMobile ? <br /> : null}
          <button className="my-button" onClick={e => {this.aClick("active", "home", "starr");}}>
            Starr County
          </button>
          {isMobile ? <br /> : null}
          <button className="my-button" onClick={e => {this.aClick("active", "home", "willacy");}}>
            Willacy County
          </button>
          <br/>
          <br/>
          <br/>
          {
            feedUrl && feedItems ?
            (
              <div>
                Latest Updates
                <br />
                <br />
                {
                  feedItems.map((item, i) => {
                    return (
                      <div key={`rss${i}`} className="rss-feed-post-container">
                        <div className="fb-post-profile-pic-container">
                          <a
                            className="fb-post-profile-pic"
                            href={item.link}
                            rel="noopener noreferrer"
                            target="_blank"
                          >
                            <img className="fb-post-img" src={feedUrl} />
                          </a>
                        </div>
                        <div className="fb-post-title-container">
                          <a
                            className="fb-post-title-text"
                            href={item.link}
                            rel="noopener noreferrer"
                            target="_blank"
                          >
                            <b>Rise RGV</b>
                          </a>
                          <a
                            className="fb-post-title-text"
                            href={item.link}
                            rel="noopener noreferrer"
                            target="_blank"
                          >
                            
                            <p>{getFBPostTime(item.pubDate)}</p>
                          </a>
                        </div>
                        {/* {item.contentSnippet} */}
                        {isMobile ?
                            <a
                              className="fb-post-title-text"
                              href={item.link}
                              rel="noopener noreferrer"
                              target="_blank"
                            >
                              <div dangerouslySetInnerHTML={{__html: item.content}} />
                            </a>
                            : <div dangerouslySetInnerHTML={{__html: item.content}} />
                          }
                      </div>
                  )})
                }
                <br/>
                <br/>
                <br/>
              </div>
            ) : null
          }
          <p>The Food Bank of the RGV is supporting our community through this pandemic. That's why I started <a rel="noopener noreferrer" target="_blank" href="https://secure.givelively.org/donate/food-bank-of-the-rio-grande-valley-inc/julio-maldonado-1">this fundraiser</a> to support them.</p>
          <FundClockProgress
            icoProgress={true}
            currentFund={this.state.currentFund}
            softcap={this.state.softcap}
            hardcap={this.state.hardcap}
            milestones={milestonesData}
            milestoneLineColor={"#fff"}
            // progressColor={"warning"} //bootstrap default colors: 'warning', 'info', 'success', ..etc
            icoClockStyle={{ backgroundColor: "#ddd" }}
            icoClockFlipStyle={{ backgroundColor: "#ddd" }}
            icoClockFlipTextStyle={{ color: "#fff" }}
            unitLabelContainerStyle={{ width: width * 0.9, backgroundColor: "#87CEEB", textAlign: 'center', justifyContent: 'center', alignItems: 'center', alignContent: 'center', margin: 'auto' }}
          />
          <p>
            All donations go directly to the Food Bank of the RGV.<br />
            <a rel="noopener noreferrer" target="_blank" href="https://secure.givelively.org/donate/food-bank-of-the-rio-grande-valley-inc/julio-maldonado-1">Be the {getPluralCount(this.state.totalDonors + 1)} donor</a>
          </p>
          <Footer
            county={county}
            endpoint={endpoint}
            aClick={this.aClick}
            linkClick={this.linkClick}
          />
        </div>
      </div>
    );
  }
}

export default Home;
