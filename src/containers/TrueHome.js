import React from 'react';

import CoronaChart from '../components/Home/CoronaChart';

import SideMenu from '../components/utility/SideMenu';
import Footer from '../components/utility/Footer';
import MyNavBar from '../components/utility/MyNavBar';

import RiseRGVImage from './rise_rgv_pfp.png';

import {
  getUsefulData,
  getSiteData,
  getPluralCount,
  determineScreenState,
  shallowCompare,
  sendAnalytics,
  scrollToTop,
  getFBPostTime,
  checkScreenSize,
  getAllActiveCases,
  getFBPosts,
  getToday
} from '../constants/helperFunctions';

import { ENDPOINT_MAP, LAST_DAY_STATS_ORIGINAL, CITIES_MAP, RSS_ITEMS } from '../constants/constants';

import DEFAULT_CORONA_DATA from '../constants/DEFAULT_CORONA_DATA';

import FundClockProgress from './custom_fundraiser';
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
    site_last_updated_at: 0,
    cameron_total_tested: 0,
    hidalgo_total_tested: 0,
    starr_total_tested: 0,
    willacy_total_tested: 0,
    rgv_hospitalized_total: 0,
    rgv_ICU_total: 0,
    rgv_beds_available: 0,
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
    let {
      currentFund,
      milestonesData,
      softcap,
      hardcap,
      site_last_updated_at,
      cameron_total_tested,
      hidalgo_total_tested,
      starr_total_tested,
      willacy_total_tested,
      rgv_hospitalized_total,
      rgv_ICU_total,
      rgv_beds_available
     } = this.state;

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
      cameron_total_tested = fundData[4]['amount'];
      hidalgo_total_tested = fundData[5]['amount'];
      starr_total_tested = fundData[6]['amount'];
      willacy_total_tested = fundData[7]['amount'];
      rgv_hospitalized_total = fundData[8]['amount'];
      rgv_ICU_total = fundData[9]['amount'];
      rgv_beds_available = fundData[10]['amount'];

      this.setState({
        currentFund, milestonesData, softcap, hardcap, totalDonors, site_last_updated_at, cameron_total_tested, hidalgo_total_tested, starr_total_tested, willacy_total_tested, rgv_hospitalized_total, rgv_ICU_total, rgv_beds_available
      });
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

  getAgeCountFromUsefulDataObject = (ageString, usefulDataObject)  => {
    console.log({usefulDataObject})
    console.log(usefulDataObject.ages.find(c => 
      Object.keys(c)[0] === ageString
    ))
    return usefulDataObject.ages.find(c => 
        Object.keys(c)[0] === ageString
      ) ? usefulDataObject.ages.find(c => 
        Object.keys(c)[0] === ageString
      )[ageString] : 0;
  }

  getLatestUsefulData = async (county) => {
    const usefulData = await getUsefulData(county);
    console.log(county)
    console.log({usefulData})
    if (county === "cameron")
      this.setState({
        casesCountCameron: usefulData['cases']['count'] - 1,
        deathsCountCameron: usefulData['deaths']['count'] - 1,
        recoveriesCountCameron: usefulData['recoveries']['count'] - 1,
        olderCasesCountCameron: this.getAgeCountFromUsefulDataObject('70 - 79', usefulData['cases']) + this.getAgeCountFromUsefulDataObject('80 - 89', usefulData['cases']) + this.getAgeCountFromUsefulDataObject('90+', usefulData['cases']),
        olderDeathsCountCameron: this.getAgeCountFromUsefulDataObject('70 - 79', usefulData['deaths']) + this.getAgeCountFromUsefulDataObject('80 - 89', usefulData['deaths']) + this.getAgeCountFromUsefulDataObject('90+', usefulData['deaths'])
      });
    else if (county === "hidalgo")
      this.setState({
        casesCountHidalgo: usefulData['cases']['count'] - 1,
        deathsCountHidalgo: usefulData['deaths']['count'] - 1,
        recoveriesCountHidalgo: usefulData['recoveries']['count'] - 1,
        olderCasesCountHidalgo: this.getAgeCountFromUsefulDataObject('70 - 79', usefulData['cases']) + this.getAgeCountFromUsefulDataObject('80 - 89', usefulData['cases']) + this.getAgeCountFromUsefulDataObject('90+', usefulData['cases']),
        olderDeathsCountHidalgo: this.getAgeCountFromUsefulDataObject('70 - 79', usefulData['deaths']) + this.getAgeCountFromUsefulDataObject('80 - 89', usefulData['deaths']) + this.getAgeCountFromUsefulDataObject('90+', usefulData['deaths'])
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

    let activeCasesResponse = await getAllActiveCases('get');
    const coronaData = activeCasesResponse['status'] === 400 ? activeCasesResponse['activeCases'] : DEFAULT_CORONA_DATA;

    this.setState({coronaData});
    const siteData = await getSiteData('getSiteData');
    if (siteData['status'] === 200) this.setState({ fundData: siteData['data'] })

    getFBPosts().then(res => {
      let feedUrl = "https://www.facebook.com/risergv";
      let feedItems = [];
      let filteredFeedItems = [];
      feedItems = res.items;
      filteredFeedItems = feedItems.filter(feedItem => feedItem.content_html.includes('safe'));
      feedItems = filteredFeedItems.slice(0, Math.max(3, Math.min(3, filteredFeedItems.length)));

      feedItems.forEach((item, i) => {
        let content_html = feedItems[i].content_html;
        let postContent = content_html.substr(content_html.indexOf('</a><p>') + 4);

        const screenState = determineScreenState(this.state.width);
        if ((screenState === "wide" || screenState === "full" || screenState === "pacman") && !isMobile) {
          postContent = postContent.replace('width=\"500\"', "width= '50%'");
        } else {
          postContent = postContent.replace('width=\"500\"', "width= '100%'");
        }

        let RISE_RGV_URL = `https://www.facebook.com/risergv`;

        if (isMobile) {
          if (isAndroid) {
            RISE_RGV_URL = `fb://page/106137601156849`;
          } else if (isIOS) {
            RISE_RGV_URL = `fb://profile/106137601156849`;
          }
        }

        feedItems[i]['link'] = RISE_RGV_URL;

        postContent = postContent.substr(0, postContent.indexOf('href=') + 5) + RISE_RGV_URL + ' rel="noopener noreferrer" target="_blank" ' + postContent.substr(postContent.indexOf('><img'));

        postContent = postContent.replace('<img src', '<div style="text-align: center;"><img src');
        postContent = postContent.replace('/></a>', '></div></a>');

        const heightSubstring = postContent.substr(postContent.indexOf('height'), postContent.indexOf('caption') - postContent.indexOf('height'));
        if (heightSubstring.length < 15) {
          postContent = postContent.replace(heightSubstring, '');
        }

        feedItems[i]['contentHTML'] = postContent;
      })
      this.setState({feedUrl, feedItems});
    })
  }

  updateCountyStats = (county, statsToBeUpdated, apiData) => {
    const total = apiData['Count'];

    statsToBeUpdated['total'] = total;
    statsToBeUpdated['gender']['male'] = apiData['Gender']['Male'];
    statsToBeUpdated['gender']['female'] = apiData['Gender']['Female'];
    statsToBeUpdated['gender']['unknown'] = total - statsToBeUpdated['gender']['male'] - statsToBeUpdated['gender']['female'];
    statsToBeUpdated['transmission']['travel'] = apiData['Transmission']['Travel'];
    statsToBeUpdated['transmission']['community'] = apiData['Transmission']['Community']
    statsToBeUpdated['transmission']['linkedToPreviousCase'] = apiData['Transmission']['Linked To Previous Case']
    statsToBeUpdated['transmission']['unknown'] = total -  apiData['Transmission']['Travel'] -apiData['Transmission']['Community'] - apiData['Transmission']['Linked To Previous Case'];
    statsToBeUpdated['ages']['0 - 19'] = apiData['Ages']['0 - 19'];
    statsToBeUpdated['ages']['20 - 29'] = apiData['Ages']['20 - 29'];
    statsToBeUpdated['ages']['30 - 39'] = apiData['Ages']['30 - 39'];
    statsToBeUpdated['ages']['40 - 49'] = apiData['Ages']['40 - 49'];
    statsToBeUpdated['ages']['50 - 59'] = apiData['Ages']['50 - 59'];
    statsToBeUpdated['ages']['60 - 69'] = apiData['Ages']['60 - 69'];
    statsToBeUpdated['ages']['70+'] = apiData['Ages']['70+'];
    statsToBeUpdated['ages']['unknown'] = total - apiData['Ages']['0 - 19'] - apiData['Ages']['20 - 29'] - apiData['Ages']['30 - 39'] - apiData['Ages']['40 - 49'] - apiData['Ages']['50 - 59'] - apiData['Ages']['60 - 69'] - apiData['Ages']['70+'];

    let cityCount = 0;
    CITIES_MAP[county].forEach(city => {
      statsToBeUpdated['cities'][city] = apiData['Cities'][city];
      cityCount += apiData['Cities'][city];
    })

    statsToBeUpdated['cities']['unknown'] = total - cityCount;
  }

  updateAllStats = (allStats, dayStats) => {
    Object.keys(dayStats).forEach(dayStatsKey => {
      const dayStatValueType = typeof(dayStats[dayStatsKey]);
      const dayStatValue = dayStats[dayStatsKey];
      if (dayStatValueType === 'number') {
        allStats[dayStatsKey] += dayStatValue;
      } else if (dayStatValueType === 'object') {
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
    this.updateStateEndpoint(county);
    this.props.history.push(`/${county}/${endpoint}`);
  }

  getNumber = (number) => number && Number.isInteger(number) ? number.toLocaleString() : '';

  render() {
    let { county } = this.state;
    const { coronaData, category, width, milestonesData, feedUrl, feedItems, site_last_updated_at, cameron_total_tested, hidalgo_total_tested, starr_total_tested, willacy_total_tested, rgv_hospitalized_total, rgv_ICU_total, rgv_beds_available } = this.state;

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
      olderCasesCountHidalgo,
      olderDeathsCountHidalgo,
      olderCasesCountCameron,
      olderDeathsCountCameron
    } = this.state;

    if (!county) county = "cameron";

    let { height } = this.state
    if (this.screenIsSuperLong) height = height * 0.8

    const screenState = determineScreenState(width);
    let endpoint = "home";

    console.log({olderCasesCountHidalgo})
    console.log({olderDeathsCountHidalgo})

    console.log({olderCasesCountCameron})
    console.log({olderDeathsCountCameron})

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
          This graph shows the COVID-19 active curves for Cameron, Hidalgo, Starr, and Willacy County and is updated daily.
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
          Active Cases
          <div className='split-screen'>
            <div className='half-pane'>
              Cameron: {this.getNumber(casesCountCameron - recoveriesCountCameron - deathsCountCameron)}
            </div>
            <div className='half-pane'>
              Hidalgo: {this.getNumber(casesCountHidalgo - recoveriesCountHidalgo - deathsCountHidalgo)}
            </div>
          </div>
          <div className='split-screen'>
            <div className='half-pane'>
              Starr: {this.getNumber(casesCountStarr - recoveriesCountStarr - deathsCountStarr)}
            </div>
            <div className='half-pane'>
              Willacy: {this.getNumber(casesCountWillacy - recoveriesCountWillacy - deathsCountWillacy)}
            </div>
          </div>
          <br/>
          <br/>
          <br/>
          <p>Lated Data as of {getToday()}</p>
          {deathsCountCameron && recoveriesCountCameron && deathsCountHidalgo && recoveriesCountHidalgo ?
            <p>COVID-19 Data for 70+ residents of Cameron and Hidalgo</p>
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
                    <td>70+ Confirmed Deaths</td>
                    <td>{this.getNumber(olderDeathsCountCameron)}</td>
                    <td>{this.getNumber(olderDeathsCountHidalgo)}</td>
                  </tr>
                  <tr>
                    <td>70+ Positive Cases</td>
                    <td>{this.getNumber(olderCasesCountCameron)}</td>
                    <td>{this.getNumber(olderCasesCountHidalgo)}</td>
                  </tr>
                  <tr>
                    <td>70+ Death Rate</td>
                    <td>{(olderDeathsCountCameron / olderCasesCountCameron * 100).toFixed(1)}%</td>
                    <td>{(olderDeathsCountHidalgo / olderCasesCountHidalgo * 100).toFixed(1)}%</td>
                  </tr>
                </tbody>
              </table>
              : null
          }
          <br/>
          <br/>
          <br/>
          {deathsCountCameron && recoveriesCountCameron && deathsCountHidalgo && recoveriesCountHidalgo ?
            <p>COVID-19 Data for all 4 counties</p>
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
                    <td>Total Tested</td>
                    <td>{this.getNumber(cameron_total_tested)}</td>
                    <td>{this.getNumber(hidalgo_total_tested)}</td>
                    <td>{this.getNumber(starr_total_tested)}</td>
                    <td>{this.getNumber(willacy_total_tested)}</td>
                  </tr>
                  <tr>
                    <td>Total Positive Cases</td>
                    <td>{this.getNumber(casesCountCameron)}</td>
                    <td>{this.getNumber(casesCountHidalgo)}</td>
                    <td>{this.getNumber(casesCountStarr)}</td>
                    <td>{this.getNumber(casesCountWillacy)}</td>
                  </tr>
                  <tr>
                    <td>Total Recovered</td>
                    <td>{this.getNumber(recoveriesCountCameron)}</td>
                    <td>{this.getNumber(recoveriesCountHidalgo)}</td>
                    <td>{this.getNumber(recoveriesCountStarr)}</td>
                    <td>{this.getNumber(recoveriesCountWillacy)}</td>
                  </tr>
                  <tr>
                    <td>Total Deaths</td>
                    <td>{this.getNumber(deathsCountCameron)}</td>
                    <td>{this.getNumber(deathsCountHidalgo)}</td>
                    <td>{this.getNumber(deathsCountStarr)}</td>
                    <td>{this.getNumber(deathsCountWillacy)}</td>
                  </tr>
                </tbody>
              </table>
              : null
          }
          <br/>
          <br/>
          <br/>
          {deathsCountCameron && recoveriesCountCameron && deathsCountHidalgo && recoveriesCountHidalgo ?
            <p>Critical Rates for all 4 Counties</p>
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
                    <td>Positivity Rate</td>
                    <td>{(casesCountCameron / cameron_total_tested * 100).toFixed(1)}%</td>
                    <td>{(casesCountHidalgo / hidalgo_total_tested * 100).toFixed(1)}%</td>
                    <td>{(casesCountStarr / starr_total_tested * 100).toFixed(1)}%</td>
                    <td>{(casesCountWillacy / willacy_total_tested * 100).toFixed(1)}%</td>
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
          {/* {
            rgv_ICU_total && rgv_beds_available && rgv_hospitalized_total ?
            <p>Hospital Data</p>
            : null
          }
          {
            rgv_ICU_total && rgv_beds_available && rgv_hospitalized_total ?
              <table className="home-table" align={"center"}>
                <thead>
                <tr>
                  <th></th>
                  <th>Total</th>
                </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Total Hospitalized</td>
                    <td>{rgv_hospitalized_total.toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td>Total in ICU</td>
                    <td>{rgv_ICU_total.toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td>Total Beds Available</td>
                    <td>{rgv_beds_available.toLocaleString()}</td>
                  </tr>
                </tbody>
              </table>
              : null
          } */}
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
                            <img className="fb-post-img" src={RiseRGVImage} />
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
                            
                            <p>{getFBPostTime(item.date_modified)}</p>
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
                              <div dangerouslySetInnerHTML={{__html: item.contentHTML}} />
                            </a>
                            : <div dangerouslySetInnerHTML={{__html: item.contentHTML}} />
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
