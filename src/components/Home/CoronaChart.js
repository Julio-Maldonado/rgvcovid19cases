import React from 'react';

import { isMobile } from 'react-device-detect';

import {
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Line,
  Legend
} from 'recharts';

import CustomTooltip from './CustomTooltip';

import {
  LINE_COLOR_MAP,
  GRAPH_COLOR_MAP
} from '../../constants/constants';

const CoronaChart = ({ width, height, endpoint, category, coronaData, county }) => {
  return (
    <LineChart
      className="my-line-chart"
      width={width * 0.98}
      height={height / 2}
      data={coronaData}
    >
      {
        endpoint !== "home" ?
        <Line
          name="Cameron"
          dot={!isMobile && width > 2000}
          isAnimationActive={true}
          type="monotone"
          legentType="line"
          dataKey="Count"
          stroke={LINE_COLOR_MAP[county && endpoint === "active" ? county.toLowerCase() : endpoint]}
          strokeWidth={2}
          activeDot={{ r: 8 }}
        />
        : null
      }
      <CartesianGrid stroke={GRAPH_COLOR_MAP[endpoint]} />
      <XAxis
        dataKey="Date"
        scale="auto"
      />
      {
        endpoint === "home" ?
        <Line
          name="Cameron"
          dot={!isMobile && width > 2000}
          isAnimationActive={true}
          type="monotone"
          legentType="line"
          dataKey="Count"
          stroke={LINE_COLOR_MAP[endpoint === "home" ? "cameron" : endpoint]}
          strokeWidth={2}
          activeDot={{ r: 8 }}
        />
          : null
      }
      {
        endpoint === "home" ?
        <Line
          name="Hidalgo"
          dot={!isMobile && width > 2000}
          isAnimationActive={true}
          type="monotone"
          legentType="line"
          dataKey="CountHidalgo"
          stroke={LINE_COLOR_MAP[endpoint === "home" ? "hidalgo" : endpoint]}
          strokeWidth={2}
          activeDot={{ r: 8 }}
        />
          : null
      }
      {
        endpoint === "home" ?
        <Line
          name="Starr"
          dot={!isMobile && width > 2000}
          isAnimationActive={true}
          type="monotone"
          legentType="line"
          dataKey="CountStarr"
          stroke={LINE_COLOR_MAP[endpoint === "home" ? "starr" : endpoint]}
          strokeWidth={2}
          activeDot={{ r: 8 }}
        />
          : null
      }
      {
        endpoint === "home" ?
        <Line
          name="Willacy"
          dot={!isMobile && width > 2000}
          isAnimationActive={true}
          type="monotone"
          legentType="line"
          dataKey="CountWillacy"
          stroke={LINE_COLOR_MAP[endpoint === "home" ? "willacy" : endpoint]}
          strokeWidth={2}
          activeDot={{ r: 8 }}
        />
          : null
      }
      <YAxis />
      <Tooltip content={<CustomTooltip category={category} endpoint={endpoint} width={width} />} />
      {
        endpoint === "home" ?
          <Legend />
          : null
      }
    </LineChart>
  );
};

export default CoronaChart;
