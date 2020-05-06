import React from 'react';

import {
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Line,
} from 'recharts';

import CustomTooltip from './CustomTooltip';

import { LINE_COLOR_MAP, GRAPH_COLOR_MAP } from '../../constants/constants';

const CoronaChart = ({ width, height, endpoint, category, coronaData }) => {
  return (
    <LineChart
      className="my-line-chart"
      width={width * 0.9}
      height={height / 2}
      data={coronaData}
    >
      <Line isAnimationActive={true} type="monotone" dataKey="Count" stroke={LINE_COLOR_MAP[endpoint]} strokeWidth={2} activeDot={{ r: 8 }} />
      <CartesianGrid stroke={GRAPH_COLOR_MAP[endpoint]} />
      <XAxis
        dataKey="Date"
        scale="auto"
      />
      <YAxis />
      <Tooltip content={<CustomTooltip category={category} endpoint={endpoint}/>} />
    </LineChart>
  );
};

export default CoronaChart;
