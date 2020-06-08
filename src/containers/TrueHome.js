import React from 'react';

import CoronaChart from '../components/Home/CoronaChart';

import SideMenu from '../components/utility/SideMenu';
import Footer from '../components/utility/Footer';
import MyNavBar from '../components/utility/MyNavBar';

import {
  getToday,
  getDatesObj,
  getUsefulData,
  getSiteData,
  getCoronaData,
  getDefaultActiveCases,
  // numberWithCommas,
  getPluralCount,
  determineScreenState,
  shallowCompare,
  compare,
  sendAnalytics,
  scrollToTop,
} from '../constants/helperFunctions';

import { ENDPOINT_MAP } from '../constants/constants';

import DEFAULT_CORONA_DATA from '../constants/DEFAULT_CORONA_DATA';

import './styles.css';

// import FundClockProgress from "react-fundraising-countdown";
import FundClockProgress from "./custom_fundraiser";
import { isMobile } from 'react-device-detect';

// let milestonesData = [
//   {
//     text: "Start",
//     cap: 0
//   },
//   {
//     text: "Current $213",
//     cap: 213
//   },
//   {
//     text: "Goal $2,500",
//     cap: 500
//   }
// ];


class Home extends React.Component {
  state = {
    county: this.props.county,
    coronaData: DEFAULT_CORONA_DATA,
    height: 0,
    width: 0,
    currentFund: 150,
    softcap: 500,
    hardcap: 500,
    milestonesData: [
      {
        text: "Start",
        cap: 0
      },
      {
        text: "Current $213",
        cap: 213
      },
      {
        text: "Goal $500",
        cap: 500
      }
    ],
    totalDonors: 1
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

    if (this.checkScreenSize()) this.screenIsSuperLong = true;
    else this.screenIsSuperLong = false;

    setTimeout(this.updateWindowDimensions, 1000);

    this.icoFundRaising = setInterval(() => this.updateFundRaising(), 500);
  }

  updateFundRaising() {
    const { fundData } = this.state;
    let { currentFund, milestonesData, softcap, hardcap } = this.state;

    if (fundData && fundData.length > 2 && 'name' in fundData[2]) {
      currentFund = fundData[2]['amount'];
      let goalFund = fundData[0]['amount'];
      hardcap = softcap = fundData[0]['amount'];
      milestonesData[1]['cap'] = currentFund;
      milestonesData[1]['text'] = `Current $${currentFund}`;
      milestonesData[2]['cap'] = goalFund;
      milestonesData[2]['text'] = `Goal $${goalFund}`;
      let totalDonors = fundData[1]['amount'];

      this.setState({ currentFund, milestonesData, softcap, hardcap, totalDonors });
      clearInterval(this.icoFundRaising);
    }
  }

  checkScreenSize = () => {
    let iPhone = /iPhone/.test(navigator.userAgent) && !window.MSStream;
    let aspect = window.screen.width / window.screen.height;
    if (iPhone && aspect.toFixed(3) === "0.462") return true;

    return false;
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions); 
    clearInterval(this.icoFundRaising);
  }

  updateWindowDimensions = () => {
    let height = window.innerHeight;
    let width = window.innerWidth;
    if (Math.abs(this.state.height - window.innerHeight) < 100) height = this.state.height;

    if (height / width > 1.7 || this.checkScreenSize()) this.screenIsSuperLong = true;
    else this.screenIsSuperLong = false;

    this.setState({ width, height })
  }

  getLatestUsefulData = async (county) => {
    const usefulData = await getUsefulData(county);
    if (county === "cameron")
      this.setState({
        casesCountCameron: usefulData['cases']['count'] - 1,
        cityCasesDataCameron: usefulData['cases']['cities'].sort(compare),
        ageCasesDataCameron: usefulData['cases']['ages'].sort(compare),
        transmissionCasesDataCameron: usefulData['cases']['transmission'].sort(compare),
        genderCasesDataCameron: usefulData['cases']['gender'].sort(compare),
        deathsCountCameron: usefulData['deaths']['count'] - 1,
        cityDeathsDataCameron: usefulData['deaths']['cities'].sort(compare),
        ageDeathsDataCameron: usefulData['deaths']['ages'].sort(compare),
        transmissionDeathsDataCameron: usefulData['deaths']['transmission'].sort(compare),
        genderDeathsDataCameron: usefulData['deaths']['gender'].sort(compare),
        recoveriesCountCameron: usefulData['recoveries']['count'] - 1,
      });
    else if (county === "hidalgo")
      this.setState({
        casesCountHidalgo: usefulData['cases']['count'] - 1,
        cityCasesDataHidalgo: usefulData['cases']['cities'].sort(compare),
        ageCasesDataHidalgo: usefulData['cases']['ages'].sort(compare),
        transmissionCasesDataHidalgo: usefulData['cases']['transmission'].sort(compare),
        genderCasesDataHidalgo: usefulData['cases']['gender'].sort(compare),
        deathsCountHidalgo: usefulData['deaths']['count'] - 1,
        cityDeathsDataHidalgo: usefulData['deaths']['cities'].sort(compare),
        ageDeathsDataHidalgo: usefulData['deaths']['ages'].sort(compare),
        transmissionDeathsDataHidalgo: usefulData['deaths']['transmission'].sort(compare),
        genderDeathsDataHidalgo: usefulData['deaths']['gender'].sort(compare),
        recoveriesCountHidalgo: usefulData['recoveries']['count'] - 1,
      });
    else if (county === "starr")
      this.setState({
        casesCountStarr: usefulData['cases']['count'] - 1,
        cityCasesDataStarr: usefulData['cases']['cities'].sort(compare),
        ageCasesDataStarr: usefulData['cases']['ages'].sort(compare),
        transmissionCasesDataStarr: usefulData['cases']['transmission'].sort(compare),
        genderCasesDataStarr: usefulData['cases']['gender'].sort(compare),
        deathsCountStarr: usefulData['deaths']['count'] - 1,
        cityDeathsDataStarr: usefulData['deaths']['cities'].sort(compare),
        ageDeathsDataStarr: usefulData['deaths']['ages'].sort(compare),
        transmissionDeathsDataStarr: usefulData['deaths']['transmission'].sort(compare),
        genderDeathsDataStarr: usefulData['deaths']['gender'].sort(compare),
        recoveriesCountStarr: usefulData['recoveries']['count'] - 1,
      });
    else if (county === "willacy")
      this.setState({
        casesCountWillacy: usefulData['cases']['count'] - 1,
        cityCasesDataWillacy: usefulData['cases']['cities'].sort(compare),
        ageCasesDataWillacy: usefulData['cases']['ages'].sort(compare),
        transmissionCasesDataWillacy: usefulData['cases']['transmission'].sort(compare),
        genderCasesDataWillacy: usefulData['cases']['gender'].sort(compare),
        deathsCountWillacy: usefulData['deaths']['count'] - 1,
        cityDeathsDataWillacy: usefulData['deaths']['cities'].sort(compare),
        ageDeathsDataWillacy: usefulData['deaths']['ages'].sort(compare),
        transmissionDeathsDataWillacy: usefulData['deaths']['transmission'].sort(compare),
        genderDeathsDataWillacy: usefulData['deaths']['gender'].sort(compare),
        recoveriesCountWillacy: usefulData['recoveries']['count'] - 1,
      });
  }

  getAllLatestCases = async() => {
    const defaultData = true;
    let [cameronData, hidalgoData, starrData, willacyData] = await Promise.all([
      this.getActiveCases("cameron", defaultData),
      this.getActiveCases("hidalgo", defaultData),
      this.getActiveCases("starr", defaultData),
      this.getActiveCases("willacy", defaultData)
    ]);

    // console.log({cameronData})
    // console.log({hidalgoData})
    // console.log({starrData})
    // console.log({willacyData})
    // return;

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
    const coronaData = await this.getAllLatestCases();
    this.setState({coronaData});
    const siteData = await getSiteData('getSiteData');
    if (siteData['status'] === 200) this.setState({ fundData: siteData['data'] })
    console.log({coronaData})
  }

  getActiveCases = async (county, defaultData = true) => {
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

  getLatestCoronaData = async(endpoint, county) => {
    sendAnalytics(`Getting Latest ${endpoint} Data`, `User requesting latest ${county} data for ${endpoint} from ${this.state.endpoint} page`);

    if (!endpoint) endpoint = "active"

    if (!county) county = this.state.county;
    const coronaData = await getCoronaData(endpoint, county);
    return coronaData;
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (shallowCompare(this, nextProps, nextState)) return true;

    return false;
  }

  updateStateEndpoint = (endpoint) => { endpoint in ENDPOINT_MAP ? this.setState({ endpoint }): this.setState({ endpoint: 'active'}); };

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
    const { coronaData, category, width, milestonesData } = this.state;
    // console.log({fundData})
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
          <p>Active Cases as of {getToday()}</p>
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
            <p>Stats at a Glance</p>
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
          <p>The Food Bank of the RGV is supporting our community through this pandemic. That's why I started <a rel="noopener noreferrer" target="_blank" href="https://secure.givelively.org/donate/food-bank-of-the-rio-grande-valley-inc/julio-maldonado-1">this fundraiser</a> to support them.</p>
          {/* <p>Fundraiser Goal: {fundData && fundData.length > 0 && 'name' in fundData[0] ? `$${numberWithCommas(fundData[0]['amount'])}` : "$2,500"}</p>
          <p>Funds Raised: {fundData && fundData.length > 2 && 'name' in fundData[2] ? `$${numberWithCommas(fundData[2]['amount'])}` : "$142"}</p>
          <p>Total Donors: {fundData && fundData.length > 1 && 'name' in fundData[1] ? `${numberWithCommas(fundData[1]['amount'])}` : "6"}</p> */}
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
            unitLabelContainerStyle={{ backgroundColor: "#87CEEB", textAlign: 'center', justifyContent: 'center', alignItems: 'center', alignContent: 'center', margin: 'auto' }}
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
          {/* <PWAPrompt delay={10000} /> */}
        </div>
      </div>
    );
  }
}

export default Home;
