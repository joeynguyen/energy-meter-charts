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
  state = {
    meterId: '',
  };

  handleIdClick(id) {
    this.setState({ meterId: id });
  }

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
                this.handleIdClick(rowInfo.original.id);

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
        {this.state.meterId && <Chart data={meterData[this.state.meterId]} />}
      </React.Fragment>
    );
  }
}

export default App;
