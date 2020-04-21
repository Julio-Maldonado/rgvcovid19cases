import React from 'react';

import { HashLink as Link } from 'react-router-hash-link';

const RefreshButton = ({ navClick, endpoint, refreshData }) => {
  return (
    <div>
      <p id="p">
        This site will be updated immediately after every Press Release with the latest data.
      </p>
      <br />
      <Link onClick={() => navClick("about")} smooth to="/about" className="menu-item">
        About this site
      </Link>
      <br/>
      <br/>
      <br/>
    </div>
  );
};

export default RefreshButton;
