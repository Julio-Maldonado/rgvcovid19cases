import React from 'react';

import { HashLink as Link } from 'react-router-hash-link';

const RefreshButton = ({ linkClick, endpoint, refreshData }) => {
  return (
    <div>
      <p id="p">
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

export default RefreshButton;