import React from 'react';

import PWAPrompt from 'react-ios-pwa-prompt';
// import { isMobile, isIOS, } from 'react-device-detect';

import Header from '../components/Home/Header';
import CoronaChart from '../components/Home/CoronaChart';
import TableDisplay from '../components/Home/TableDisplay';
import RefreshButton from '../components/Home/RefreshButton';
import CategorySwitch from '../components/Home/CategorySwitch';

import SideMenu from '../components/utility/SideMenu';
import Footer from '../components/utility/Footer';
import MyNavBar from '../components/utility/MyNavBar';

import {
  getUsefulData,
  getCameronCountyCoronaData,
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
    this.updateEndpoint(this.props.location['pathname'].substr(1));
    setTimeout(this.justMounted, 1000);
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
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

  updateEndpoint = (endpoint) => { endpoint in ENDPOINT_MAP ? this.setState({ endpoint }): this.setState({ endpoint: 'cases'}); };

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
    console.log("hey");
    console.log("if you're reading this");
    console.log("you should definitely email me at julio.maldonado.guzman@gmail.com to help contribute to this project");
    let {endpoint} = this.state;
    let {location} = this.props;
    

    if (location) {
      let pathname = location['pathname'];
      pathname = pathname.substr(1).split("/")[1];

      if (pathname in ENDPOINT_MAP) endpoint = pathname;
      else if (!(endpoint in ENDPOINT_MAP)) endpoint = "cases";
      else endpoint = "cases";
    }
    
    this.getLatestConfirmedCases(endpoint, this.state.county);
    this.getLatestUsefulData(this.state.county);
  }

  getLatestConfirmedCases = async(endpoint, county) => {
    sendAnalytics(`Getting Latest ${endpoint} Data`, `User requesting latest ${county} data for ${endpoint} from ${this.state.endpoint} page`);
    if (!endpoint) endpoint = "cases"
    else this.updateEndpoint(endpoint);

    if (!county) county = this.state.county;

    const cameronCountyCoronaData = await getCameronCountyCoronaData(endpoint, county);
    this.routeSite(county, endpoint);
    this.setState({ coronaData: cameronCountyCoronaData });
    scrollToTop();
  }

  updateCategory = (category) => {
    this.setState({ category });
    sendAnalytics("Update Category", `User pressed the ${category} from ${this.state.endpoint} page`);
  };

  shouldComponentUpdate(nextProps, nextState) {
    if (shallowCompare(this, nextProps, nextState)) return true;

    return false;
  }

  navigateSideMenu = () => { this.setState({isOpen: !this.state.isOpen}); }

  aClick = (endpoint, prevEndpoint, county) => {
    sendAnalytics(`A Click Nagivation`, `User navigated to ${endpoint} from ${prevEndpoint} for ${county}`);
    if (
      this.state.isOpen &&
      this.endpoint === this.props.location['pathname'].substr(1) &&
      endpoint !== this.state.endpoint &&
      endpoint in ENDPOINT_MAP
    ) {
      this.getLatestConfirmedCases(endpoint, this.state.county);
      scrollToTop();
    }
  }

  linkClick = (endpoint, prevEndpoint, county) => {
    sendAnalytics(`Link Click Navigation`, `User navigated to ${endpoint} from ${prevEndpoint} for ${county}`);
    if (endpoint in ENDPOINT_MAP) this.getLatestConfirmedCases(endpoint, this.state.county);
    scrollToTop();
  }

  handleAddToHomescreenClick = () => {
    alert(`
      1. Open Share menu
      2. Tap on "Add to Home Screen" button`
    );
  };

  updateCounty = (county) => {
    this.setState({ county });
    this.getLatestConfirmedCases(this.state.endpoint, county);
    this.getLatestUsefulData(county);
    this.props.history.push(`/${county}`);
    sendAnalytics("Update County", `User pressed the ${county} from ${this.state.endpoint} page`);
  }

  routeSite = (county, endpoint) => this.props.history.push(`/${county}/${endpoint}`);

  render() {
    let { county, endpoint } = this.state;
    const { coronaData, category, width } = this.state;
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
    this.endpoint = this.props.location['pathname'].substr(1);

    if (this.props.location['pathname'].substr(1) === "home") {
      county = "cameron";
      endpoint = "cases";
    }

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
          {
            deathsCount && recoveriesCount ?
              <div>
                <p>Recovery rate: {(recoveriesCount / casesCount * 100).toFixed(1)}%</p>
                <p>Death rate: {(deathsCount / casesCount * 100).toFixed(1)}%</p>
              </div>
            : null
          }
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
            refreshData={this.getLatestConfirmedCases}
          />
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
          <PWAPrompt delay={10000} />
        </div>
      </div>
    );
  }
}

export default Home;
