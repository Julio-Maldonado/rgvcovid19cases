import React from 'react';

import {
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Line
} from 'recharts';

import {
  CustomTooltip,
  // determineXAxisInterval,
  // determineXAxisPadding,
} from '../constants/helperFunctions';

import './App.css';
// import {ENDPOINT_MAP} from '../constants/constants';

const CoronaChart = ({ width, height, endpoint, category, coronaData, screenState}) => {
  // const data = ENDPOINT_MAP[endpoint];
  return (
    <LineChart
      className="my-line-chart"
      width={width * 0.9}
      height={height / 2}
      data={coronaData}
    >
      <Line isAnimationActive={true} type="monotone" dataKey="Count" stroke="#2B8AC5" strokeWidth={2} activeDot={{ r: 8 }} />
      <CartesianGrid stroke="#CD0D00" />
      <XAxis
        dataKey="Date"
        scale="auto"
        // interval={determineXAxisInterval(screenState)}
        // padding={determineXAxisPadding(screenState)}
      />
      <YAxis />
      <Tooltip content={<CustomTooltip category={category} endpoint={endpoint}/>} />
      <Line type="monotone" dataKey="pv" stroke="#387908" yAxisId={1} />
    </LineChart>
  );
};

export default CoronaChart;
