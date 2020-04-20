import React from 'react';

const RefreshButton = ({ refreshData }) => {
  return (
    <div>
      <button className="my-button" onClick={e => refreshData("cases")}>
        View Confirmed Cases
      </button>
      <button className="my-button" onClick={e => refreshData("recoveries")}>
        View Confirmed Recoveries
      </button>
      <button className="my-button" onClick={e => refreshData("deaths")}>
        View Confirmed Deaths
      </button>
      {/* <a href="/cases" className="my-button">
        View Confirmed Cases
      </a>
      <br />
      <a href="/recoveries" className="my-button">
        View Confirmed Recoveries
      </a>
      <br />
      <a href="/deaths" className="my-button">
        View Confirmed Deaths
      </a>
      <br /> */}
      <br/>
      <br/>
      <br/>
    </div>
  );
};

export default RefreshButton;
