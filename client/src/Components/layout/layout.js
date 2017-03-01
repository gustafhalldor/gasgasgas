import React, { Component } from 'react';
import NavBar from './navbar/navbar.js';
import styles from './layout.css';

class Layout extends Component {

  render() {
    return (
      <div className={styles.layout}>
        <NavBar />
        {this.props.children}
      </div>
    );
  }
}

module.exports = Layout;
