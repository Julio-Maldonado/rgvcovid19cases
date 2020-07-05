import React from 'react';

import { HashLink as Link } from 'react-router-hash-link';
// import { FacebookIcon, FacebookShareButton } from 'react-share';

import MyNavBar from '../components/utility/MyNavBar';
import SideMenu from '../components/utility/SideMenu';

import { sendAnalytics, scrollToTop } from '../constants/helperFunctions';

class About extends React.Component {
  state = { width: 0 }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() { window.removeEventListener('resize', this.updateWindowDimensions); }

  updateWindowDimensions = () => { this.setState({ width: window.innerWidth, height: window.innerHeight }) }

  aClick = (endpoint, prevEndpoint) => {
    sendAnalytics(`A Click Nagivation`,`User navigated to ${endpoint} from ${prevEndpoint}`);
  }

  linkClick = (endpoint, prevEndpoint) => {
    sendAnalytics(`Link Click Navigation`, `User navigated to ${endpoint} from ${prevEndpoint}`);
    scrollToTop();
  }

  render() {
    const {width} = this.state;
    let county = "Cameron";
    // let endpoint = "cases";
    if (this.props.location.state) {
      county = this.props.location.state.county;
      // endpoint = this.props.location.state.endpoint;
    }
    return (
      <div className="App">
        <MyNavBar endpoint="about" county={county} linkClick={this.linkClick} aClick={this.aClick}/>
        <div onClick={() => this.setState({isOpen: !this.state.isOpen})}>
          <SideMenu
            right
            width={width}
            county={county}
            endpoint="about"
            aClick={this.aClick}
            linkClick={this.linkClick}
            isOpen={this.state.isOpen}
          />
        </div>
        <div className="App-content">
          <h1 id="h1">About This Site</h1>
          <div className="margin-content">
            <br />
            <p>This website was set up for Cameron County, Hidalgo County, Starr County, and Willacy County to closely monitor coronavirus cases and see our curve during this pandemic.</p>
            <br />
            <p>All of this data was obtained from the official Press Releases by each county.</p>
            <br />
            {/* <p>Future updates can be suggested by anybody reading this.</p>
            <br /> */}
            <p>Future updates can be suggested by anybody reading this. If you want to contribute to this project, gather data, have ideas for updates, or have inquiries, email <a href="mailto:julio.maldonado.guzman@gmail.com">julio.maldonado.guzman@gmail.com</a>.</p>
            <br />
            <p>If you need resources, check out our <Link onClick={() => this.linkClick("resources", "about")} smooth to="/resources">resources</Link> page.</p>
            <br />
            {/* <FacebookShareButton url="https://julio-maldonado.github.io/rgvcovid19cases/"> */}
            {/* <button className="my-button">
              <Link onClick={() => this.linkClick("cases", "about")} smooth to={`/${county}/cases`}>
                View Confirmed Cases
              </Link>
            </button>
            <button className="my-button">
              <Link onClick={() => this.linkClick("recoveries", "about")} smooth to={`/${county}/recoveries`}>
                View Confirmed Recoveries
              </Link>
            </button>
            <button className="my-button">
              <Link onClick={() => this.linkClick("deaths", "about")} smooth to={`/${county}/deaths`}>
                View Confirmed Deaths
              </Link>
            </button> */}
            {/* <br />
            <br /> */}
            <p>Consider donating to the Food Bank of the Rio Grande Valley as we get through this pandemic.</p>
            <p>
              <a rel="noopener noreferrer" target="_blank" href="https://secure.givelively.org/donate/food-bank-of-the-rio-grande-valley-inc/julio-maldonado-1">Donate here</a>
            </p>
            {/* <p>Share this site on {` `}
              <FacebookShareButton onShareWindowClose={() => sendAnalytics("Facebook Share", `Website shared to Facebook`)} url="https://rgvcovid19cases.com/" >
                <FacebookIcon
                  size={30}
                  round={true}
                />
              </FacebookShareButton>
            </p> */}
            <p>This website is maintained and updated daily by <a rel="noopener noreferrer" target="_blank" href="https://www.facebook.com/risergv">Rise RGV</a>.</p>
            <br />
            <br />
          </div>
        </div>
      </div>
    );
  }
}

export default About;
