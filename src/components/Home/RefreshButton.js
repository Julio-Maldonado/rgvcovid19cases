import React from 'react';

const RefreshButton = ({ county, endpoint, refreshData, aClick }) => {
  return (
    <div>
      {
        endpoint !== "cases" ?
          <button className="my-button" onClick={e => {refreshData("cases"); aClick("cases", endpoint, county)}}>
            View Confirmed Cases
          </button>
          : null
      }
      {
        endpoint !== "recoveries" ?
          <button className="my-button" onClick={e => {refreshData("recoveries"); aClick("recoveries", endpoint, county)}}>
            View Confirmed Recoveries
          </button>
          : null
      }
      {
        endpoint !== "deaths" ?
          <button className="my-button" onClick={e => {refreshData("deaths"); aClick("deaths", endpoint, county)}}>
            View Confirmed Deaths
          </button>
          : null
      }
      <br/>
      <br/>
      <br/>
    </div>
  );
};

export default RefreshButton;
