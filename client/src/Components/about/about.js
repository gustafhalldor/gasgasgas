import React, { Component } from 'react';
import styles from './about.css';
import General from './general.js';
import Technical from './technical.js';
import Stats from './stats.js';


class About extends Component {
  render() {
    return (
      <section>
        <h1 className={styles.header}>um síðuna</h1>
        <General />
        <Stats />
        <Technical />
      </section>
    )
  }
}

module.exports = About;
