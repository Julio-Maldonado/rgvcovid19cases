import React from 'react';

import SideMenu from './SideMenu';
import RGVResources from './RGVResources';
import PressReleases from './PressReleases';

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

  render() {
    const {width} = this.state;
    return (
      <div className="App">
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
            <p id="p">Data for this site was obtained from these Press Releases from the Cameron County <a href="https://www.cameroncounty.us/announcements-press-releases/">site</a>:</p>
          </div>
          <PressReleases />
        </div>
      </div>
    );
  }
}

export default Resources;
