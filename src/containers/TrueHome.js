import React from 'react';

import CoronaChart from '../components/Home/CoronaChart';

import SideMenu from '../components/utility/SideMenu';
import Footer from '../components/utility/Footer';
import MyNavBar from '../components/utility/MyNavBar';

import {
  getDatesObj,
  getUsefulData,
  getCoronaData,
  determineScreenState,
  shallowCompare,
  compare,
  sendAnalytics,
  scrollToTop,
  getDefaultCases,
} from '../constants/helperFunctions';

import { ENDPOINT_MAP } from '../constants/constants';

import './styles.css';

let getDefaultCase = () => {
  let cameronData = getDefaultCases("active", "cameron");
  let hidalgoData = getDefaultCases("active", "hidalgo");

  hidalgoData.unshift({Date: "3/19", Count: 0, Cases: 0, Deaths: 0, Recoveries: 0})
  hidalgoData.unshift({Date: "3/18", Count: 0, Cases: 0, Deaths: 0, Recoveries: 0})
  hidalgoData.forEach((data, i) => {
    cameronData[i]["CountHidalgo"] = data['Count'];
    cameronData[i]["CasesHidalgo"] = data['Cases'];
    cameronData[i]["DeathsHidalgo"] = data['Deaths'];
    cameronData[i]["RecoveriesHidalgo"] = data['Recoveries'];
  })
  let coronaData = cameronData;
  return coronaData;
}

class Home extends React.Component {
  state = {
    county: this.props.county,
    coronaData: getDefaultCase(),
    height: 0,
    width: 0,
  }

  screenIsSuperLong = false; // not iphone X or 11

  componentDidMount() {
    window.addEventListener('resize', this.updateWindowDimensions);

    this.updateWindowDimensions();
    this.updateStateEndpoint(this.props.location['pathname'].substr(1));

    setTimeout(this.justMounted, 1000);

    if (this.checkScreenSize()) this.screenIsSuperLong = true;
    else this.screenIsSuperLong = false;

    setTimeout(this.updateWindowDimensions, 1000);
  }

  checkScreenSize = () => {
    let iPhone = /iPhone/.test(navigator.userAgent) && !window.MSStream;
    let aspect = window.screen.width / window.screen.height;
    if (iPhone && aspect.toFixed(3) === "0.462") return true;

    return false;
  }

  componentWillUnmount() { window.removeEventListener('resize', this.updateWindowDimensions); }

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
        // usefulRecoveriesData: usefulData['recoveries']['cities'],
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
        // usefulRecoveriesData: usefulData['recoveries']['cities'],
      });
  }

  getAllLatestCases = async() => {
    let cameronData = await this.getActiveCases("cameron");
    let hidalgoData = await this.getActiveCases("hidalgo");

    hidalgoData.unshift({Date: "3/19", Count: 0, Cases: 0, Deaths: 0, Recoveries: 0})
    hidalgoData.unshift({Date: "3/18", Count: 0, Cases: 0, Deaths: 0, Recoveries: 0})
    
    hidalgoData.forEach((data, i) => {
      cameronData[i]["CountHidalgo"] = data['Count'];
      cameronData[i]["CasesHidalgo"] = data['Cases'];
      cameronData[i]["DeathsHidalgo"] = data['Deaths'];
      cameronData[i]["RecoveriesHidalgo"] = data['Recoveries'];
    })
    let coronaData = cameronData;
    return coronaData;
  }

  justMounted = async () => {
    sendAnalytics(`True Home Just Mounted`, `Home website was just mounted`);

    console.log("hey");
    console.log("if you're reading this");
    console.log("you should definitely email me at julio.maldonado.guzman@gmail.com to help contribute to this project");

    // this.routeSite(this.state.county, endpoint);
    const coronaData = await this.getAllLatestCases();
    this.getLatestUsefulData("cameron");
    this.getLatestUsefulData("hidalgo");
    this.setState({coronaData});
  }

  getActiveCases = async (county) => {
    const [cases, deaths, recoveries] = await Promise.all([
      this.getLatestCoronaData("cases", county),
      this.getLatestCoronaData("deaths", county),
      this.getLatestCoronaData("recoveries", county)
    ]);

    let totalCases = 0;
    let firstDay = 18;
    if (county === "Hidalgo" || county === "hidalgo") firstDay = 20;

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
      let prevDay =  parseInt(dateArr[1]) - 1;
      if (prevDay < 10)
        prevDay = "0" + prevDay;
      let prevDate = `${dateArr[0]}/${prevDay}`
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
    if (endpoint === "home") this.props.history.push(`/${endpoint}`);
    else this.props.history.push(`/${county}/${endpoint}`);
  }

  render() {
    let { county } = this.state;
    const { coronaData, category, width } = this.state;
    const {
      casesCountCameron,
      deathsCountCameron,
      recoveriesCountCameron,
      casesCountHidalgo,
      deathsCountHidalgo,
      recoveriesCountHidalgo,
      // usefulRecoveriesData
    } = this.state;

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
        <h1>RGV COVID-19 Curve</h1>
        <h2>
          This graph shows the Cameron County and Hidalgo County COVID-19 curve.
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
                </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Active Cases</td>
                    <td>{casesCountCameron - recoveriesCountCameron - deathsCountCameron}</td>
                    <td>{casesCountHidalgo - recoveriesCountHidalgo - deathsCountHidalgo}</td>
                  </tr>
                  <tr>
                    <td>Total Cases</td>
                    <td>{casesCountCameron}</td>
                    <td>{casesCountHidalgo}</td>
                  </tr>
                  <tr>
                    <td>Total Recovered</td>
                    <td>{recoveriesCountCameron}</td>
                    <td>{recoveriesCountHidalgo}</td>
                  </tr>
                  <tr>
                    <td>Total Deaths</td>
                    <td>{deathsCountCameron}</td>
                    <td>{deathsCountHidalgo}</td>
                  </tr>
                  <tr>
                    <td>Death Rate</td>
                    <td>{(deathsCountCameron / casesCountCameron * 100).toFixed(1)}%</td>
                    <td>{(deathsCountHidalgo / casesCountHidalgo * 100).toFixed(1)}%</td>
                  </tr>
                  <tr>
                    <td>Recovery Rate</td>
                    <td>{(recoveriesCountCameron / casesCountCameron * 100).toFixed(1)}%</td>
                    <td>{(recoveriesCountHidalgo / casesCountHidalgo * 100).toFixed(1)}%</td>
                  </tr>
                </tbody>
              </table>
              : null
          }
          <br/>
          See more data on: 
          <button className="my-button" onClick={e => {this.aClick("active", "home", "cameron");}}>
            Cameron County
          </button>
          <button className="my-button" onClick={e => {this.aClick("active", "home", "hidalgo");}}>
            Hidalgo County
          </button>
          <br/>
          <br/>
          <p>How has the RGV responded to COVID-19? How can we recover? How can we open up again?</p>
          <div onClick={() => sendAnalytics(`Clicking Survey Link`, `User pressed survey link from ${endpoint} page`)}>
            <p>
              Fill out <a href="https://qfreeaccountssjc1.az1.qualtrics.com/jfe/form/SV_bmcINjXL5EUEbUF">this survey</a> to let us know what you think.
            </p>
          </div>
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
