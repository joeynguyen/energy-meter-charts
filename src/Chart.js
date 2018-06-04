import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import { getPointStartDate } from './utils';

const Chart = props => {
  const { BaseLoad, TSL, WSL } = props.data;
  const baseLoadSeries = Object.values(BaseLoad);
  const tslSeries = Object.values(TSL);
  const wslSeries = Object.values(WSL);

  const pointStartDate = getPointStartDate(BaseLoad);

  const options = {
    chart: {
      type: 'area',
    },
    title: {
      text: 'Meter Usage',
    },
    xAxis: {
      type: 'datetime',
    },
    yAxis: {
      title: {
        text: 'Energy usage',
      },
      labels: {
        formatter: function() {
          return this.value + 'KwH';
        },
      },
    },
    plotOptions: {
      area: {
        pointStart: pointStartDate,
        pointInterval: 24 * 3600 * 1000, // one day
        marker: {
          enabled: false,
          symbol: 'circle',
          radius: 2,
          states: {
            hover: {
              enabled: true,
            },
          },
        },
      },
    },
    series: [
      {
        name: 'Weather Sensitive',
        data: wslSeries,
      },
      {
        name: 'Time Sensitive',
        data: tslSeries,
      },
      {
        name: 'BaseLoad',
        data: baseLoadSeries,
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default Chart;
