import React from 'react';

import SideMenu from '../components/utility/SideMenu';
import RGVResources from '../components/Resources/RGVResources';
import PressReleases from '../components/Resources/PressReleases';
import MyNavBar from '../components/utility/MyNavBar';
import Footer from '../components/utility/Footer';

import { sendAnalytics, scrollToTop } from '../constants/helperFunctions';

class Resources extends React.Component {
  state = { width: 0 }

  componentDidMount()  {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() { window.removeEventListener('resize', this.updateWindowDimensions); }

  updateWindowDimensions = () => { this.setState({ width: window.innerWidth, height: window.innerHeight }) }

  aClick = (endpoint, prevEndpoint) => {
    sendAnalytics(`A Click Nagivation`, `User navigated to ${endpoint} from ${prevEndpoint}`);
  }

  linkClick = (endpoint, prevEndpoint) => {
    sendAnalytics(`Link Click Navigation`, `User navigated to ${endpoint} from ${prevEndpoint}`);
    scrollToTop();
  }

  render() {
    const {width} = this.state;
    return (
      <div className="App">
        <MyNavBar endpoint="resources" linkClick={this.linkClick} aClick={this.aClick} />
        <div onClick={() => this.setState({isOpen: !this.state.isOpen})}>
          <SideMenu
            right
            width={width}
            endpoint="resources"
            linkClick={this.linkClick}
            aClick={this.aClick}
            isOpen={this.state.isOpen}
          />
        </div>
        <div className="App-content">
          <h1 id="h1">Resources</h1>
          <div>
            <br />
            <p>Here are some resources for the RGV during this pandemic:</p>
          </div>
          <RGVResources />
          <div>
            <p>Data for this site was obtained from these Press Releases from the Cameron County <a rel="noopener noreferrer" target="_blank" href="https://www.cameroncounty.us/announcements-press-releases/">site</a>:</p>
          </div>
          <PressReleases />
          <div onClick={() => sendAnalytics(`Clicking Survey Link`, `User pressed survey link from resources page`)}>
            <p>How has the RGV responded to COVID-19? How can we recover? How can we open up again?</p>
            <p>
              Fill out <a href="https://qfreeaccountssjc1.az1.qualtrics.com/jfe/form/SV_bmcINjXL5EUEbUF">this survey</a> to let us know what you think.
            </p>
          </div>
          <Footer
            endpoint="resources"
            aClick={this.aClick}
            linkClick={this.linkClick}
          />
        </div>
      </div>
    );
  }
}

export default Resources;
