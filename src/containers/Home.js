import React from 'react';

import PWAPrompt from 'react-ios-pwa-prompt';

import Header from '../components/Home/Header';
import CoronaChart from '../components/Home/CoronaChart';
import TableDisplay from '../components/Home/TableDisplay';
import RefreshButton from '../components/Home/RefreshButton';
import CategorySwitch from '../components/Home/CategorySwitch';

import SideMenu from '../components/utility/SideMenu';
import Footer from '../components/utility/Footer';
import MyNavBar from '../components/utility/MyNavBar';

import {
  getToday,
  getDatesObj,
  getUsefulData,
  getCoronaData,
  getSiteData,
  numberWithCommas,
  determineScreenState,
  shallowCompare,
  compare,
  sendAnalytics,
  scrollToTop,
  getDefaultCases,
} from '../constants/helperFunctions';

import { ENDPOINT_MAP } from '../constants/constants';

import './styles.css';

class Home extends React.Component {
  state = {
    county: this.props.county,
    coronaData: getDefaultCases(this.endpoint, this.props.county),
    category: "Cities",
    height: 0,
    width: 0,
    endpoint: "",
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

  updateStateEndpoint = (endpoint) => { endpoint in ENDPOINT_MAP ? this.setState({ endpoint }): this.setState({ endpoint: 'active'}); };

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

    this.setState({
      casesCount: usefulData['cases']['count'] - 1,
      cityCasesData: usefulData['cases']['cities'].sort(compare),
      ageCasesData: usefulData['cases']['ages'].sort(compare),
      transmissionCasesData: usefulData['cases']['transmission'].sort(compare),
      genderCasesData: usefulData['cases']['gender'].sort(compare),
      deathsCount: usefulData['deaths']['count'] - 1,
      cityDeathsData: usefulData['deaths']['cities'].sort(compare),
      ageDeathsData: usefulData['deaths']['ages'].sort(compare),
      transmissionDeathsData: usefulData['deaths']['transmission'].sort(compare),
      genderDeathsData: usefulData['deaths']['gender'].sort(compare),
      recoveriesCount: usefulData['recoveries']['count'] - 1,
      // usefulRecoveriesData: usefulData['recoveries']['cities'],
    });
  }

  justMounted = async () => {
    sendAnalytics(`Just Mounted`, `Home website was just mounted`);

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

    if (endpoint === "active") {
      this.routeSite(this.state.county, endpoint);
      this.setActiveCases(this.state.county);
      this.getLatestUsefulData(this.state.county);
      scrollToTop();
    } else {
      this.routeSite(this.state.county, endpoint);
      const coronaData = await this.getLatestCoronaData(endpoint, this.state.county);
      this.setState({ coronaData });
      scrollToTop();
      this.getLatestUsefulData(this.state.county);
    }

    const siteData = await getSiteData('getSiteData');
    if (siteData['status'] === 200) this.setState({ fundData: siteData['data'] })
  }

  setActiveCases = async (county) => {
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

    // cases.forEach((c, i) => {
    //   if (i !== 0) totalCases += cases[i - 1]["Count"];
    //   activeCases[c["Date"]] = {"cases": c["Count"], "activeCases": c["Count"] + totalCases};
    // });
    cases.forEach((c, i) => {
      if (i !== 0) totalCases += cases[i - 1]["Count"];
      activeCases[c["Date"]] = {"cases": c["Count"], "activeCases": c["Count"] + totalCases};
      let flag = false;
      Object.keys(activeCases).forEach(activeCaseDate => {
        if (!flag && c["Date"] === activeCaseDate) {
          flag = true;
        }
        if (flag) {
          // activeCases[activeCaseDate]["activeCases"] = cases[i]["Count"];
          activeCases[activeCaseDate]["activeCases"] = totalCases + c["Count"];
        }
      })
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
      if (Object.keys(currentDay).length === 0 && i !== 0) {
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
    this.setState({ coronaData });
  }

  getLatestCoronaData = async(endpoint, county) => {
    sendAnalytics(`Getting Latest ${endpoint} Data`, `User requesting latest ${county} data for ${endpoint} from ${this.state.endpoint} page`);

    if (!endpoint) endpoint = "active"

    if (!county) county = this.state.county;
    const coronaData = await getCoronaData(endpoint, county);
    return coronaData;
  }

  updateCategory = (category) => {
    this.setState({ category });
    sendAnalytics("Update Category", `User pressed the ${category} from ${this.state.endpoint} page`);
  };

  shouldComponentUpdate(nextProps, nextState) {
    if (shallowCompare(this, nextProps, nextState)) return true;

    return false;
  }

  navigateSideMenu = () => this.setState({isOpen: !this.state.isOpen});

  aClick = async (endpoint, prevEndpoint, county) => {
    sendAnalytics(`A Click Nagivation`, `User navigated to ${endpoint} from ${prevEndpoint} for ${county}`);
    if (
      this.state.isOpen &&
      this.endpoint === this.props.location['pathname'].substr(1) &&
      endpoint !== this.state.endpoint &&
      endpoint in ENDPOINT_MAP
    ) {
      if (endpoint) this.updateStateEndpoint(endpoint);
      this.routeSite(county, endpoint);
      const coronaData = await this.getLatestCoronaData(endpoint, this.state.county);
      this.setState({ coronaData });
      scrollToTop();
    }
  }

  linkClick = async (endpoint, prevEndpoint, county) => {
    sendAnalytics(`Link Click Navigation`, `User navigated to ${endpoint} from ${prevEndpoint} for ${county}`);
    if (endpoint in ENDPOINT_MAP) {
      if (endpoint) this.updateStateEndpoint(endpoint);
      this.routeSite(county, endpoint);
      if (endpoint === "active") this.setActiveCases(county);
      else {
        const coronaData = await this.getLatestCoronaData(endpoint, this.state.county);
        this.setState({ coronaData });
      }
    }
    scrollToTop();
  }

  updateCounty = async (county) => {
    sendAnalytics(`Update County`, `User updating to ${county}`);
    this.setState({ county });
    if (this.state.endpoint) this.updateStateEndpoint(this.state.endpoint);
    this.routeSite(county, this.state.endpoint);
    if (this.state.endpoint === "active"){
      this.setActiveCases(county);
      this.getLatestUsefulData(county);
      scrollToTop();
    } else {
      const coronaData = await this.getLatestCoronaData(this.state.endpoint, county);
      this.setState({ coronaData });
      scrollToTop();
      this.getLatestUsefulData(county);
      this.props.history.push(`/${county}`);
      sendAnalytics("Update County", `User pressed the ${county} from ${this.state.endpoint} page`);
    }
  }

  refreshData = async(endpoint, county) => {
    sendAnalytics(`User Clicked Refresh Button`, `User requested ${endpoint} data for ${county}`);
    this.routeSite(county, endpoint);
    this.updateStateEndpoint(endpoint);
    if (endpoint === "active") {
      this.setActiveCases(county);
      this.getLatestUsefulData(county);
      scrollToTop();
    } else {
      const coronaData = await this.getLatestCoronaData(endpoint, county);
      this.setState({ coronaData });
      scrollToTop();
    }
  }

  routeSite = (county, endpoint) => {
    this.updateStateEndpoint(endpoint);
    this.props.history.push(`/${county}/${endpoint}`);
  }

  render() {
    let { county, endpoint } = this.state;
    const { coronaData, category, width, fundData } = this.state;
    const {
      casesCount,
      cityCasesData,
      ageCasesData,
      transmissionCasesData,
      genderCasesData,
      deathsCount,
      cityDeathsData,
      ageDeathsData,
      transmissionDeathsData,
      genderDeathsData,
      recoveriesCount,
      // usefulRecoveriesData
    } = this.state;

    let usefulCasesData = [];
    let usefulDeathsData = [];
    if (category === "Cities") {
      usefulCasesData = cityCasesData;
      usefulDeathsData = cityDeathsData;
    } else if (category === "Ages") {
      usefulCasesData = ageCasesData;
      usefulDeathsData = ageDeathsData;
    } else if (category === "Gender") {
      usefulCasesData = genderCasesData;
      usefulDeathsData = genderDeathsData;
    } else if (category === "Transmission") {
      usefulCasesData = transmissionCasesData;
      usefulDeathsData = transmissionDeathsData;
    }
    let { height } = this.state
    if (this.screenIsSuperLong) height = height * 0.8

    const screenState = determineScreenState(width);
    const urlPaths = this.props.location['pathname'].substr(1).split("/");
    if (urlPaths.length === 1) { this.endpoint = "active"; county = this.state.county; }
    else this.endpoint = urlPaths[1];

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
          <Header
            county={county}
            endpoint={endpoint}
            updateCounty={this.updateCounty}
          />
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
          <p>Latest data as of {getToday()} for {county[0].toUpperCase() + county.substr(1)} County</p>
          {
            casesCount && deathsCount && recoveriesCount ?
              <p>Active Cases: {casesCount - deathsCount - recoveriesCount}</p>
              : null
          }
          {
            endpoint === "active" && casesCount && deathsCount && recoveriesCount ?
              <table className="home-table" align={"center"}>
                <thead>
                <tr>
                  <th></th>
                  <th>{county[0].toUpperCase() + county.substr(1)}</th>
                </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Total Cases</td>
                    <td>{casesCount}</td>
                  </tr>
                  <tr>
                    <td>Total Recovered</td>
                    <td>{recoveriesCount}</td>
                  </tr>
                  <tr>
                    <td>Total Deaths</td>
                    <td>{deathsCount}</td>
                  </tr>
                  <tr>
                    <td>Death Rate</td>
                    <td>{(deathsCount / casesCount * 100).toFixed(1)}%</td>
                  </tr>
                  <tr>
                    <td>Recovery Rate</td>
                    <td>{(recoveriesCount / casesCount * 100).toFixed(1)}%</td>
                  </tr>
                </tbody>
              </table>
              : null
          }
          {
            endpoint === "home" && casesCount && deathsCount && recoveriesCount ?
              <div>
                <p>Recovery rate: {(recoveriesCount / casesCount * 100).toFixed(1)}%</p>
                <p>Death rate: {(deathsCount / casesCount * 100).toFixed(1)}%</p>
                <p>Active cases: {casesCount - recoveriesCount - deathsCount}</p>
              </div>
            : null
          }
          {/* {
            endpoint === "active" ?
              <div>
                <p>Total Recoveries: {recoveriesCount}</p>
                <p>Total Deaths: {deathsCount}</p>
              </div>
            : null
          } */}
          <TableDisplay
            count={casesCount}
            endpoint={endpoint}
            arrayData={usefulCasesData}
            align="center"
            column1={category}
            confirmedCasesName="Cases"
          />
          <TableDisplay
            count={deathsCount}
            endpoint={endpoint}
            arrayData={usefulDeathsData}
            align="center"
            column1={category}
            confirmedCasesName="Deaths"
          />
          {
            recoveriesCount && endpoint === "recoveries" ?
              <p>Confirmed Recoveries: {recoveriesCount}</p>
              : null
          }
          <CategorySwitch
            category={category}
            county={county}
            endpoint={endpoint}
            updateCategory={this.updateCategory}
          />
          < br/>
          <RefreshButton
            county={county}
            endpoint={endpoint}
            aClick={this.aClick}
            linkClick={this.linkClick}
            refreshData={this.refreshData}
          />
          <p>The Food Bank of the RGV is supporting our community through this pandemic. That's why I started this <a href="https://secure.givelively.org/donate/food-bank-of-the-rio-grande-valley-inc/julio-maldonado-1">fundraiser</a> to support them.</p>
          <p>Fundraiser Goal: {fundData && fundData.length > 0 && 'goal' in fundData[0] ? `$${numberWithCommas(fundData[0]['goal'])}` : "$2,500"}</p>
          <p>Funds Raised: {fundData && fundData.length > 2 && 'total_raised' in fundData[2] ? `$${numberWithCommas(fundData[2]['total_raised'])}` : "$142"}</p>
          <p>Total Donors: {fundData && fundData.length > 1 && 'donors' in fundData[1] ? `${numberWithCommas(fundData[1]['donors'])}` : "6"}</p>
          <p>
            <a href="https://secure.givelively.org/donate/food-bank-of-the-rio-grande-valley-inc/julio-maldonado-1">Donate here</a>
          </p>
          <Footer
            county={county}
            endpoint={endpoint}
            aClick={this.aClick}
            linkClick={this.linkClick}
          />
          <PWAPrompt delay={10000} />
        </div>
      </div>
    );
  }
}

export default Home;
