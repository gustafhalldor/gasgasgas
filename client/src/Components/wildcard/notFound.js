import React, { Component } from 'react';
import styles from '../about/about.css';

class NotFound extends Component {
  render() {
    return (
      <section>
        <h1 className={styles.header}>Þessi síða er ekki til :-)</h1>
      </section>
    )
  }
}

module.exports = NotFound;
