import React from 'react';
import { HashLink as Link } from 'react-router-hash-link';

class MyNavbar extends React.Component{
    render() {
        return (
          <div className="my-navbar">
            <div className="center-navbar">
              <Link onClick={() => this.props.linkClick("cases", this.props.endpoint)}  smooth to="/home" className="my-navbar-link">
                <p className="my-navbar-p">Home</p>
              </Link>
            </div>
          </div>
        );
    }
}

export default MyNavbar;
