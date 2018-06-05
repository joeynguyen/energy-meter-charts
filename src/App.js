import React from 'react';
import { Table, Button } from 'react-bootstrap';

import 'react-table/react-table.css';

import Chart from './Chart';
import { getMeterData } from './utils';

const meterData = getMeterData();

const meterIds = Object.keys(meterData);

class App extends React.Component {
  state = {
    meterId: '',
  };

  handleIdClick(id) {
    this.setState({ meterId: id });
  }

  renderTds(ids) {
    return ids.map(id => {
      return (
        <tr key={id}>
          <td>
            <Button onClick={() => this.handleIdClick(id)} bsStyle="link">
              {id}
            </Button>
          </td>
        </tr>
      );
    });
  }

  render() {
    return (
      <div className="container">
        <Table striped bordered condensed hover>
          <thead>
            <tr>
              <th>Meter</th>
            </tr>
          </thead>
          <tbody>{this.renderTds(meterIds)}</tbody>
        </Table>
        {this.state.meterId && <Chart data={meterData[this.state.meterId]} />}
      </div>
    );
  }
}

export default App;
