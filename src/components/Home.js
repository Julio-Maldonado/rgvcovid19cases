import React from 'react';
import ReactGA from 'react-ga';

import Header from './Header';
import CoronaChart from './CoronaChart';
import RefreshButton from './RefreshButton';
import SideMenu from './SideMenu';
import TableDisplay from './TableDisplay';
import Footer from './Footer';
import MyNavBar from './MyNavBar';

import { getUsefulData, getCameronCountyCoronaData, determineScreenState, shallowCompare, compare } from '../constants/helperFunctions';

import { DEFAULT_CASES, ENDPOINT_MAP } from '../constants/constants';

import '../index.css';
import './App.css';

class Home extends React.Component {
  state = {
    coronaData: DEFAULT_CASES,
    category: "Cities",
    height: 0,
    width: 0,
    endpoint: "",
  }

  componentDidMount()  {
    this.updateEndpoint(this.props.location['pathname'].substr(1))
    setTimeout(this.justMounted, 1000);
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  updateEndpoint = (endpoint) => { endpoint in ENDPOINT_MAP ? this.setState({ endpoint }): this.setState({ endpoint: 'cases'}); };

  componentWillUnmount() { window.removeEventListener('resize', this.updateWindowDimensions); }

  updateWindowDimensions = () => {
    let height = window.innerHeight;
    if (Math.abs(this.state.height - window.innerHeight) < 100)
      height = this.state.height;
    this.setState({ width: window.innerWidth, height })
  }

  justMounted = async () => {
    let {endpoint} = this.state;
    let {location} = this.props;

    if (location) {
      let pathname = location['pathname'];
      pathname = pathname.substr(1);
      
      if (pathname in ENDPOINT_MAP)
        endpoint = pathname;
      else if (!(endpoint in ENDPOINT_MAP))
        endpoint = "cases";
      else
        endpoint = "cases";
    }
    this.getLatestConfirmedCases(endpoint);
    const usefulData = await getUsefulData();

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
    ReactGA.event({
      category: `Getting Latest ${endpoint} Data`,
      action: `User requesting latest data for ${endpoint} from ${this.state.endpoint} page`,
    });
    if (!endpoint)
      endpoint = "cases"
    else 
      this.updateEndpoint(endpoint);

    const cameronCountyCoronaData = await getCameronCountyCoronaData(endpoint);
    this.setState({ coronaData: cameronCountyCoronaData });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  updateCategory = (category) => {
    this.setState({ category });
    ReactGA.event({
      category: "Update Category",
      action: `User pressed the ${category} from ${this.state.endpoint} page`,
    });
  };

  shouldComponentUpdate(nextProps, nextState) {
    if (shallowCompare(this, nextProps, nextState)) {
      return true;
    }
    return false;
  }

  navigateSideMenu = () => { this.setState({isOpen: !this.state.isOpen}); }

  navClick = (endpoint) => {
    ReactGA.event({
      category: "Nav Click",
      action: `User navigated to ${endpoint}`,
    });
    if (
      this.state.isOpen &&
      this.endpoint === this.props.location['pathname'].substr(1) &&
      endpoint !== this.state.endpoint &&
      endpoint in ENDPOINT_MAP
    ) {
      this.getLatestConfirmedCases(endpoint);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  render() {
    const {coronaData, category, height, width, endpoint} = this.state;
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

    const screenState = determineScreenState(width);
    this.endpoint = this.props.location['pathname'].substr(1);
    return (
      <div className="App">
        <MyNavBar navClick={this.navClick}/>
        <div onClick={() => this.navigateSideMenu()}>
          <SideMenu
            right
            width={width}
            navClick={this.navClick}
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
              <p id="p">Confirmed Recoveries: {recoveriesCount}</p> 
              : null
          }
          <RefreshButton
            endpoint={endpoint}
            navClick={this.navClick}
            refreshData={this.getLatestConfirmedCases}
          />
          <Footer 
            navClick={this.navClick}
          />
        </div>
      </div>
    );
  }
}

export default Home;
