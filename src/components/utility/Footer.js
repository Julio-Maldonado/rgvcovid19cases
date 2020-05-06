import React from 'react';

import { HashLink as Link } from 'react-router-hash-link';

import './styles.css';

const Footer = ({ county, linkClick, endpoint }) => {
  return (
    <div>
      <p>
        This site will be updated immediately after every Press Release with the latest data.
      </p>
      <br />
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
