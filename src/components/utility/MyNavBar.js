import React from 'react';

import { HashLink as Link } from 'react-router-hash-link';

class MyNavbar extends React.Component{
  render() {
    return (
      <div className="my-navbar">
        <Link onClick={() => this.props.linkClick("home", this.props.endpoint, this.props.county)}  smooth to={`/home`} className="my-navbar-link">
          <p className="my-navbar-p">Home</p>
        </Link>
      </div>
    );
  }
}

export default MyNavbar;
