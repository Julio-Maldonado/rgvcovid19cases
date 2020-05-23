import React from 'react';

const RefreshButton = ({ county, endpoint, refreshData, aClick }) => {
  return (
    <div>
      {
        endpoint !== "cases" ?
          <button className="my-button" onClick={e => {endpoint !== "home" ? refreshData("cases", county) : aClick("cases", "home", county);}}>
            View Confirmed Cases
          </button>
          : null
      }
      {
        endpoint !== "recoveries" ?
          <button className="my-button" onClick={e => {refreshData("recoveries", county);}}>
            View Confirmed Recoveries
          </button>
          : null
      }
      {
        endpoint !== "deaths" ?
          <button className="my-button" onClick={e => {refreshData("deaths", county);}}>
            View Confirmed Deaths
          </button>
          : null
      }
      <br/>
      {
        endpoint !== "active" ?
          <button className="my-button" onClick={e => {refreshData("active", county);}}>
            View Active Cases
          </button>
          : null
      }
      <br/>
      <br/>
    </div>
  );
};

export default RefreshButton;
