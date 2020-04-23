import React from 'react';
import ReactGA from 'react-ga';

import SideMenu from './SideMenu';
import RGVResources from './RGVResources';
import PressReleases from './PressReleases';
import MyNavBar from './MyNavBar';
import Footer from './Footer';

import { ENDPOINT_MAP } from '../constants/constants';

import './App.css';

class Resources extends React.Component {
  state = { width: 0 }

  componentDidMount()  {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() { window.removeEventListener('resize', this.updateWindowDimensions); }

  updateWindowDimensions = () => { this.setState({ width: window.innerWidth, height: window.innerHeight }) }

  navClick = (endpoint) => {
    if (
      this.state.isOpen &&
      this.endpoint === this.props.location['pathname'].substr(1) &&
      endpoint !== this.state.endpoint &&
      endpoint in ENDPOINT_MAP
    )
      this.getLatestConfirmedCases(endpoint);
  }

  linkClick = (endpoint) => {
    ReactGA.event({
      category: `${endpoint} Click`,
      action: `User navigated to ${endpoint}`,
    });
    // this.getLatestConfirmedCases(endpoint);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  render() {
    const {width} = this.state;
    return (
      <div className="App">
        <MyNavBar navClick={this.navClick}/>
        <div onClick={() => this.setState({isOpen: !this.state.isOpen})}>
          <SideMenu
            right
            width={width}
            navClick={this.navClick}
            isOpen={this.state.isOpen}
          />
        </div>
        <div className="App-content">
          <h1 id="h1">Resources</h1>
          <div>
            <br />
            <p id="p">Here are some resources for the RGV during this pandemic:</p>
          </div>
          <RGVResources />
          <div>
            <p id="p">Data for this site was obtained from these Press Releases from the Cameron County <a rel="noopener noreferrer" target="_blank" href="https://www.cameroncounty.us/announcements-press-releases/">site</a>:</p>
          </div>
          <PressReleases />
          <div onClick={() => ReactGA.event({category: `Clicking Survey Link`,action: `User pressed survey link from resources page`,})}>
            <p>How has the RGV responded to COVID-19? How can we recover? How can we open up again?</p>
            <p>
              Fill out <a href="https://qfreeaccountssjc1.az1.qualtrics.com/jfe/form/SV_bmcINjXL5EUEbUF">this survey</a> to let us know what you think.
            </p>
          </div>
          <Footer 
            navClick={this.linkClick}
          />
        </div>
      </div>
    );
  }
}

export default Resources;
