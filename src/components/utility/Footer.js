import React from 'react';

import { HashLink as Link } from 'react-router-hash-link';

import './styles.css';

const Footer = ({ linkClick, endpoint, refreshData }) => {
  return (
    <div>
      <p>
        This site will be updated immediately after every Press Release with the latest data.
      </p>
      <br />
      <Link onClick={() => linkClick("about", endpoint)} smooth to="/about" className="menu-item">
        About this site
      </Link>
      <br/>
      <br/>
      <br/>
    </div>
  );
};

export default Footer;
