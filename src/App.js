import React from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

import Chart from './Chart';
import { getMeterData } from './utils';

const meterData = getMeterData();

const uniqueMetersMap = Object.keys(meterData).map(meter => {
  return {
    id: meter,
  };
});

const columns = [
  {
    Header: 'Meter Id',
    accessor: 'id', // String-based value accessors!
    width: 200,
  },
];

class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <ReactTable
          data={uniqueMetersMap}
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
        <Chart />
      </React.Fragment>
    );
  }
}

export default App;
