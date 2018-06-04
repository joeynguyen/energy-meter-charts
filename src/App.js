import React from 'react';
import { render } from 'react-dom';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

import meterReadings from './meters.json';

let uniqueMeters = {};
meterReadings.data.forEach(meterReading => {
  const meterId = meterReading.Meter_ID;
  const meterType = meterReading.Type;
  const meterReadingKeys = Object.keys(meterReading);

  let totalKwH = 0;
  meterReadingKeys.forEach(key => {
    // if key is a number type
    if (isFinite(Number(key))) {
      // JS hack add numbers with decimals
      totalKwH = (totalKwH * 1000 + meterReading[key] * 1000) / 1000;
    }
  });

  // if meterId doesn't exist, add it
  if (!uniqueMeters[meterId]) {
    uniqueMeters[meterId] = {
      [meterType]: {
        [meterReading.Date]: totalKwH,
      },
    };
  }
  // if this Type doesn't exist yet for this meterId, add it
  else if (!uniqueMeters[meterId][meterType]) {
    uniqueMeters[meterId][meterType] = {
      [meterReading.Date]: totalKwH,
    };
  }
  // else, append new data
  else {
    uniqueMeters[meterId][meterType][meterReading.Date] = totalKwH;
  }
});
console.log('uniqueMeters', uniqueMeters);
const uniqueMetersMap = Object.keys(uniqueMeters).map(meter => {
  return {
    id: meter,
  };
});

const options = {
  chart: {
    type: 'area',
  },
  title: {
    text: 'US and USSR nuclear stockpiles',
  },
  subtitle: {
    text:
      'Sources: <a href="https://thebulletin.org/2006/july/global-nuclear-stockpiles-1945-2006">' +
      'thebulletin.org</a> &amp; <a href="https://www.armscontrol.org/factsheets/Nuclearweaponswhohaswhat">' +
      'armscontrol.org</a>',
  },
  xAxis: {
    allowDecimals: false,
    labels: {
      formatter: function() {
        return this.value; // clean, unformatted number for year
      },
    },
  },
  yAxis: {
    title: {
      text: 'Nuclear weapon states',
    },
    labels: {
      formatter: function() {
        return this.value / 1000 + 'k';
      },
    },
  },
  tooltip: {
    pointFormat:
      '{series.name} had stockpiled <b>{point.y:,.0f}</b><br/>warheads in {point.x}',
  },
  plotOptions: {
    area: {
      pointStart: 1940,
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
      name: 'USA',
      data: [
        null,
        null,
        null,
        null,
        null,
        6,
        11,
        32,
        110,
        235,
        369,
        640,
        1005,
        1436,
        2063,
        3057,
        4618,
        6444,
        9822,
        15468,
        20434,
        24126,
        27387,
        29459,
        31056,
        31982,
        32040,
        31233,
        29224,
        27342,
        26662,
        26956,
        27912,
        28999,
        28965,
        27826,
        25579,
        25722,
        24826,
        24605,
        24304,
        23464,
        23708,
        24099,
        24357,
        24237,
        24401,
        24344,
        23586,
        22380,
        21004,
        17287,
        14747,
        13076,
        12555,
        12144,
        11009,
        10950,
        10871,
        10824,
        10577,
        10527,
        10475,
        10421,
        10358,
        10295,
        10104,
        9914,
        9620,
        9326,
        5113,
        5113,
        4954,
        4804,
        4761,
        4717,
        4368,
        4018,
      ],
    },
    {
      name: 'USSR/Russia',
      data: [
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        5,
        25,
        50,
        120,
        150,
        200,
        426,
        660,
        869,
        1060,
        1605,
        2471,
        3322,
        4238,
        5221,
        6129,
        7089,
        8339,
        9399,
        10538,
        11643,
        13092,
        14478,
        15915,
        17385,
        19055,
        21205,
        23044,
        25393,
        27935,
        30062,
        32049,
        33952,
        35804,
        37431,
        39197,
        45000,
        43000,
        41000,
        39000,
        37000,
        35000,
        33000,
        31000,
        29000,
        27000,
        25000,
        24000,
        23000,
        22000,
        21000,
        20000,
        19000,
        18000,
        18000,
        17000,
        16000,
        15537,
        14162,
        12787,
        12600,
        11400,
        5500,
        4512,
        4502,
        4502,
        4500,
        4500,
      ],
    },
  ],
};

const data = uniqueMetersMap;

const columns = [
  {
    Header: 'Meter Id',
    accessor: 'id', // String-based value accessors!
    width: 200,
  },
];

const App = () => (
  <div>
    <ReactTable
      data={data}
      columns={columns}
      width={200}
      getTdProps={(state, rowInfo, column, instance) => {
        return {
          onClick: (e, handleOriginal) => {
            console.log('A Td Element was clicked!');
            console.log('It was in this row:', rowInfo);

            // IMPORTANT! React-Table uses onClick internally to trigger
            // events like expanding SubComponents and pivots.
            // By default a custom 'onClick' handler will override this functionality.
            // If you want to fire the original onClick handler, call the
            // 'handleOriginal' function.
            if (handleOriginal) {
              handleOriginal();
            }
          },
        };
      }}
    />
    <HighchartsReact highcharts={Highcharts} options={options} />
  </div>
);

export default App;
