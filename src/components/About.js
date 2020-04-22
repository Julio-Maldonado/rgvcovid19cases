import React from 'react';

import ReactGA from 'react-ga';

import { HashLink as Link } from 'react-router-hash-link';
import MyNavBar from './MyNavBar';

import SideMenu from './SideMenu';

import { FacebookIcon, FacebookShareButton } from "react-share";

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
    ReactGA.event({
      category: "Nav Click",
      action: `User navigated to ${endpoint}`,
    });
  }

  linkClick = (endpoint) => {
    ReactGA.event({
      category: "Home Click",
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
          <h1 id="h1">About This Site</h1>
          <div className="margin-content">
            <br />
            <p id="p">This website was set up for Cameron County to closely monitor coronavirus cases and see our curve during this pandemic.</p>
            <br />
            <p id="p">All of this data was obtained from the Cameron County official Press Releases listed <Link  onClick={() => this.linkClick("resources")} smooth to="/resources">here</Link>.</p>
            <br />
            <p id="p">Future updates will include data for Hidalgo County, Starr County, and Willacy County.</p>
            <br />
            <p id="p">If you want to contribute to this project, gather data, have ideas for updates, or have inquiries, please email <a href="mailto:julio.maldonado.guzman@gmail.com">julio.maldonado.guzman@gmail.com</a>.</p>
            <br />
            <p id="p">If you need resources, check out our <Link onClick={() => this.linkClick("resources")} smooth to="/resources">resources</Link> page.</p>
            <br />
            {/* <p id="p">You can read all of the Press Releases <a rel="noopener noreferrer" target="_blank" href="https://www.cameroncounty.us/announcements-press-releases/">here</a> or check out the Cameron County <a rel="noopener noreferrer" target="_blank" href="http://www.co.cameron.tx.us/">website</a>.</p>
            <br /> */}
            {/* <FacebookShareButton url="https://julio-maldonado.github.io/rgvcovid19cases/"> */}
            <button className="my-button">
              <Link onClick={() => this.navClick("cases")} smooth to="/cases">
                View Confirmed Cases
              </Link>
            </button>
            <button className="my-button">
              <Link onClick={() => this.navClick("recoveries")} smooth to="/recoveries">
                View Confirmed Recoveries
              </Link>
            </button>
            <button className="my-button">
              <Link onClick={() => this.navClick("deaths")} smooth to="/deaths">
                View Confirmed Deaths
              </Link>
            </button>
            <br />
            <br />
            <p id="p">Share this site on {` `}
              <FacebookShareButton onShareWindowClose={() => { ReactGA.event({ category: "Facebook Share", action: `Website shared to Facebook`});}} url="rgvcovid19cases.com" >
                <FacebookIcon
                  size={30}
                  round={true}
                />
              </FacebookShareButton>
            </p>
            <br />
            <br />
          </div>
        </div>
      </div>
    );
  }
}

export default About;
