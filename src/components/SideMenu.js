import React from 'react';

import { slide as Menu } from 'react-burger-menu';
import { HashLink as Link } from 'react-router-hash-link';

const SideMenu = props => {
  return (
    <Menu isOpen={props.isOpen} {...props}>
      {/* <Link onClick={() => props.navClick("cases")} smooth to="/home" className="menu-item">
        Home
      </Link>
      <br /> */}
      <Link onClick={() => props.navClick("cases")} smooth to="/cases" className="menu-item">
        Cases
      </Link>
      <br />
      <Link onClick={() => props.navClick("recoveries")} smooth to="/recoveries" className="menu-item">
        Recoveries
      </Link>
      <br />
      <Link onClick={() => props.navClick("deaths")} smooth to="/deaths" className="menu-item">
        Deaths
      </Link>
      <br />
      <Link onClick={() => props.navClick("resources")} smooth to="/resources" className="menu-item">
        Resources
      </Link>
      <br />
      <Link onClick={() => props.navClick("about")} smooth to="/about" className="menu-item">
        About
      </Link>
      <br />
    </Menu>
  );
};

export default SideMenu;
