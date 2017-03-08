import React, { Component } from 'react';
import styles from './stats.css';
import LineComponent from './lineComponent.js';

class Stats extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data95: null
    }
  }

  componentDidMount() {
    const numDays = 10;
    let thisStatObject = this;
    fetch(`http://localhost:3001/api/getRegularPricesXDaysBack/${numDays}`)
    .then(response => {
      return response.json();
    }).then(function(response) {
      thisStatObject.setState({data95: response});
    });
  }

  render() {
    return (
      <section>
        <div className={styles.wrapper}>
          <h1 className={styles.header}>Verðþróun</h1>
          <p className={styles.paragraphText}>*** WIP ***</p>
          <LineComponent data={this.state.data95} />
        </div>
      </section>
    )
  }
}

module.exports = Stats;
