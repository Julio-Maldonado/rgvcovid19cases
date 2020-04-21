import React from 'react';

const RefreshButton = ({ endpoint, refreshData }) => {
  return (
    <div>
      {
        endpoint !== "cases" ?
          <button className="my-button" onClick={e => refreshData("cases")}>
            View Confirmed Cases
          </button>
          : null
      }
      {
        endpoint !== "recoveries" ?
          <button className="my-button" onClick={e => refreshData("recoveries")}>
            View Confirmed Recoveries
          </button>
          : null
      }
      {
        endpoint !== "deaths" ?
          <button className="my-button" onClick={e => refreshData("deaths")}>
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
