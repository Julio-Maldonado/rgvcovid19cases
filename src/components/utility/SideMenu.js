import React from 'react';

import { slide as Menu } from 'react-burger-menu';
import { HashLink as Link } from 'react-router-hash-link';

import { scrollToTop } from '../../constants/helperFunctions';

const SideMenu = props => {
  return (
    <Menu isOpen={props.isOpen} {...props}>
      <Link onClick={() => props.linkClick("home", props.endpoint, props.county)} smooth to={`/home`} className="menu-item">
        Home
      </Link>
      <br />
      <Link onClick={() => props.linkClick("active", props.endpoint, props.county)} smooth to={`/${props.county}/active`} className="menu-item">
        Active
      </Link>
      <br />
      <Link onClick={() => props.linkClick("cases", props.endpoint, props.county)} smooth to={`/${props.county}/cases`} className="menu-item">
        Cases
      </Link>
      <br />
      <Link onClick={() => props.linkClick("recoveries", props.endpoint, props.county)} smooth to={`/${props.county}/recoveries`} className="menu-item">
        Recoveries
      </Link>
      <br />
      <Link onClick={() => props.linkClick("deaths", props.endpoint, props.county)} smooth to={`/${props.county}/deaths`} className="menu-item">
        Deaths
      </Link>
      <br />
      <Link onClick={() => {props.linkClick("resources", props.endpoint, props.county); scrollToTop();}} smooth to={{ pathname: "/resources", state: { county: props.county } }} className="menu-item">
        Resources
      </Link>
      <br />
      <Link onClick={() => {props.linkClick("about", props.endpoint, props.county); scrollToTop();}} smooth to={{ pathname: "/about", state: { county: props.county } }} className="menu-item">
        About
      </Link>
      <br />
    </Menu>
  );
};

export default SideMenu;
