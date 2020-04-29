import React from 'react';

import { slide as Menu } from 'react-burger-menu';
import { HashLink as Link } from 'react-router-hash-link';

import { scrollToTop } from '../../constants/helperFunctions';

const SideMenu = props => {
  return (
    <Menu isOpen={props.isOpen} {...props}>
      <Link onClick={() => props.linkClick("cases", props.endpoint)} smooth to="/cases" className="menu-item">
        Cases
      </Link>
      <br />
      <Link onClick={() => props.linkClick("recoveries", props.endpoint)} smooth to="/recoveries" className="menu-item">
        Recoveries
      </Link>
      <br />
      <Link onClick={() => props.linkClick("deaths", props.endpoint)} smooth to="/deaths" className="menu-item">
        Deaths
      </Link>
      <br />
      <Link onClick={() => {props.linkClick("resources", props.endpoint); scrollToTop();}} smooth to="/resources" className="menu-item">
        Resources
      </Link>
      <br />
      <Link onClick={() => {props.linkClick("about", props.endpoint); scrollToTop();}} smooth to="/about" className="menu-item">
        About
      </Link>
      <br />
    </Menu>
  );
};

export default SideMenu;
