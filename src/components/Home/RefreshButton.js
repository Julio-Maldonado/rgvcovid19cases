import React from 'react';

import CustomButton from './CustomButton';

const RefreshButton = ({ county, endpoint, refreshData, aClick }) => {
  return (
    <div>
      <CustomButton
        desiredEndpoint="cases"
        currentEndpoint={endpoint}
        caseText="Confirmed Cases"
        buttonFunction={() => endpoint !== "home" ? refreshData("cases", county) : aClick("cases", "home", county)}
      />
      <CustomButton
        desiredEndpoint="recoveries"
        currentEndpoint={endpoint}
        caseText="Confirmed Recoveries"
        buttonFunction={() => refreshData("recoveries", county)}
      />
      <CustomButton
        desiredEndpoint="deaths"
        currentEndpoint={endpoint}
        caseText="Confirmed Deaths"
        buttonFunction={() => refreshData("deaths", county)}
      />
      <br/>
      <CustomButton
        desiredEndpoint="active"
        currentEndpoint={endpoint}
        caseText="Active Cases"
        buttonFunction={() => refreshData("active", county)}
      />
      <br/>
      <br/>
    </div>
  );
};

export default RefreshButton;
