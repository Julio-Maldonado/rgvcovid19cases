import React from 'react';

import SideMenu from './SideMenu';
import ReactGA from 'react-ga';

import { ENDPOINT_MAP } from '../constants/constants';

import { FacebookIcon, FacebookShareButton, FacebookShareCount } from "react-share";

import './App.css';

class About extends React.Component {
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
          <h1 id="h1">About This Site</h1>
          <div className="margin-content">
            <br />
            <p id="p">This website was set up for Cameron County to closely monitor the pandemic and see our curve during this pandemic.</p>
            <br />
            <p id="p">All of this data was obtained from the Cameron County official Press Releases listed <a href="/resources">here</a>.</p>
            <br />
            <p id="p">If you want to contribute to this project, gather data, have ideas for updates, or have inquiries, please email <a href="mailto:julio.maldonado.guzman@gmail.com">julio.maldonado.guzman@gmail.com</a>.</p>
            <br />
            <p id="p">If you need resources, check out our <a href="/resources">resources</a> page.</p>
            <br />
            <p id="p">You can read all of the Press Releases <a rel="noopener noreferrer" target="_blank" href="https://www.cameroncounty.us/announcements-press-releases/">here</a> or check out the Cameron County <a rel="noopener noreferrer" target="_blank" href="http://www.co.cameron.tx.us/">website</a>.</p>
            <br />
            {/* <FacebookShareButton url="https://julio-maldonado.github.io/rgvcovid19cases/"> */}
            <p id="p">Share this site on {` `}
              <FacebookShareButton onShareWindowClose={() => { ReactGA.event({ category: "Facebook Share", action: `Website shared to Facebook`});}} url="rgvcovid19cases.com" >
                <FacebookIcon
                  size={30}
                  round={true}
                />
              </FacebookShareButton>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default About;
