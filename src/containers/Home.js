import React from 'react';

import Header from '../components/Home/Header';
import CoronaChart from '../components/Home/CoronaChart';
import RefreshButton from '../components/Home/RefreshButton';
import SideMenu from '../components/utility/SideMenu';
import TableDisplay from '../components/Home/TableDisplay';
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

import '../index.css';
import '../components/App.css';

class Home extends React.Component {
  state = {
    coronaData: getDefaultCases(this.endpoint),
    category: "Cities",
    height: 0,
    width: 0,
    endpoint: "",
  }

  screenIsSuperLong = false; // not iphone X or 11

  componentDidMount() {
    this.updateEndpoint(this.props.location['pathname'].substr(1));
    setTimeout(this.justMounted, 1000);
    window.addEventListener('resize', this.updateWindowDimensions);
    if (this.checkScreenSize())
      this.screenIsSuperLong = true;
    else
      this.screenIsSuperLong = false;
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

  justMounted = async () => {
    sendAnalytics(`Just Mounted`, `Home website was just mounted`);
    console.log("hey");
    console.log("if you're reading this");
    console.log("you should definitely email me at julio.maldonado.guzman@gmail.com to help contribute to this project");
    let {endpoint} = this.state;
    let {location} = this.props;

    if (location) {
      let pathname = location['pathname'];
      pathname = pathname.substr(1);

      if (pathname in ENDPOINT_MAP) endpoint = pathname;
      else if (!(endpoint in ENDPOINT_MAP)) endpoint = "cases";
      else endpoint = "cases";
    }
    this.getLatestConfirmedCases(endpoint);
    const usefulData = await getUsefulData();
    console.log({usefulData})

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

  getLatestConfirmedCases = async(endpoint) => {
    sendAnalytics(`Getting Latest ${endpoint} Data`, `User requesting latest data for ${endpoint} from ${this.state.endpoint} page`);
    if (!endpoint) endpoint = "cases"
    else this.updateEndpoint(endpoint);

    const cameronCountyCoronaData = await getCameronCountyCoronaData(endpoint);
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

  aClick = (endpoint, prevEndpoint) => {
    sendAnalytics(`A Click Nagivation`, `User navigated to ${endpoint} from ${prevEndpoint}`);
    if (
      this.state.isOpen &&
      this.endpoint === this.props.location['pathname'].substr(1) &&
      endpoint !== this.state.endpoint &&
      endpoint in ENDPOINT_MAP
    ) {
      this.getLatestConfirmedCases(endpoint);
      scrollToTop();
    }
  }

  linkClick = (endpoint, prevEndpoint) => {
    sendAnalytics(`Link Click Navigation`, `User navigated to ${endpoint} from ${prevEndpoint}`);
    if (endpoint in ENDPOINT_MAP) this.getLatestConfirmedCases(endpoint);
    scrollToTop();
  }

  render() {
    const { coronaData, category, width, endpoint } = this.state;
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
    return (
      <div className="App">
        <MyNavBar endpoint={endpoint} linkClick={this.linkClick} aClick={this.aClick}/>
        <div onClick={() => this.navigateSideMenu()}>
          <SideMenu
            right
            width={width}
            endpoint={endpoint}
            aClick={this.aClick}
            linkClick={this.linkClick}
            isOpen={this.state.isOpen}
          />
        </div>
        <div className="App-content">
          <Header
            endpoint={endpoint}
            category={category}
            updateCategory={this.updateCategory}
          />
          <CoronaChart
            width={width}
            height={height}
            category={category}
            endpoint={endpoint}
            coronaData={coronaData}
            screenState={screenState}
          />
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
          {
            deathsCount && recoveriesCount ?
              <div>
                <p>Recovery rate: {(recoveriesCount / casesCount * 100).toFixed(3)}%</p>
                <p>Death rate: {(deathsCount / casesCount * 100).toFixed(3)}%</p>
              </div>
            : null
          }
          <RefreshButton
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
