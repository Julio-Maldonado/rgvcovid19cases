import React from 'react';

import { HashLink as Link } from 'react-router-hash-link';

import { isMobile, isAndroid, isIOS } from 'react-device-detect';

import './styles.css';

const Footer = ({ county, linkClick, endpoint }) => {
  return (
    <div>
      {/* <p>
        This site will be updated immediately after every Press Release with the latest data.
      </p>
      */}
      <br />
      <p>This website is maintained and updated daily by <a
        rel="noopener noreferrer"
        target="_blank"
        href={isMobile ?
        (isAndroid ? "fb://page/106137601156849"
          : (isIOS ?
          "fb://profile/106137601156849" :
          "https://www.facebook.com/risergv"
          )
        )
        : "https://www.facebook.com/risergv"}>Rise RGV</a>.</p>
      <Link
        smooth
        className="menu-item"
        onClick={() => linkClick("about", endpoint, county)}
        to={{ pathname: "/about", state: { county, endpoint } }}
      >
        About this site
      </Link>
      <br/>
      <br/>
      <br/>
    </div>
  );
};

export default Footer;
