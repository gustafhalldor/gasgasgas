import React, { Component } from 'react';
import styles from './stats.css';
import LineComponentGas from './lineComponentGas.js';
import LineComponentOil from './lineComponentOil.js';

class Stats extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data95: {
        data: "",
        avg: 1
      },
      oil: {
        data: "",
        avg: 1,
        avggas: 1
      },
      gasDays: 5,
      oilDays: 5
    }
  }

  componentDidMount() {
    let thisStatObject = this;
    fetch(`http://localhost:3001/api/getRegularPricesXDaysBack/${this.state.gasDays}`)
    .then(response => {
      return response.json();
    }).then(function(response) {
      thisStatObject.setState({data95: response});
    });

    fetch(`http://localhost:3001/api/getOilBarrelPrice/${this.state.oilDays}`)
    .then(response => {
      return response.json();
    }).then(function(response) {
      thisStatObject.setState({oil: response});
    });
  }

  updateGasDaysData(days) {
    let thisStatObject = this;
    fetch(`http://localhost:3001/api/getRegularPricesXDaysBack/${days}`)
    .then(response => {
      return response.json();
    }).then(function(response) {
      thisStatObject.setState({data95: response, gasDays: days});
    });
  }

  updateOilDaysData(days) {
    let thisStatObject = this;
    fetch(`http://localhost:3001/api/getOilBarrelPrice/${days}`)
    .then(response => {
      return response.json();
    }).then(function(response) {
      thisStatObject.setState({oil: response, oilDays: days});
    });
  }

  submitGasForm(event) {
    event.preventDefault();

    this.updateGasDaysData(event.target[0].value);
  }

  submitOilForm(event) {
    event.preventDefault();

    this.updateOilDaysData(event.target[0].value);
  }

  render() {
    return (
      <section>
        <div className={styles.wrapper}>
          <h1 className={styles.header}>Verðþróun</h1>
          <p className={styles.paragraphText}>*** WIP ***</p>
          <div>
            <form onSubmit={this.submitGasForm.bind(this)} >
              <input type="number" placeholder="dagar" min="0"/>
              <input type="submit" value="sækja gögn"/>
            </form>
          </div>
          <LineComponentGas data={this.state.data95} days={this.state.gasDays}/>
          <div>
            <form onSubmit={this.submitOilForm.bind(this)} >
              <input type="number" placeholder="dagar" min="0"/>
              <input type="submit" value="sækja gögn"/>
            </form>
          </div>
          <LineComponentOil data={this.state.oil} days={this.state.oilDays} avggas={this.state.oil.avggas}/>
        </div>
      </section>
    )
  }
}

module.exports = Stats;
