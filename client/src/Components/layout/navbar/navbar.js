import React, { Component } from 'react';
import NavBarItem from './navbarItem.js';
import navData from './navdata';
import styles from './navigation.css';

class Navbar extends Component {
  generateItem(item, i) {
    return <NavBarItem key={i} id={i} text={item.text} url={item.url} submenu={item.submenu} />
  }

  render() {
    const items = navData.map(this.generateItem.bind(this));
    return (
      <nav className="navbar-default navbar-fixed-top">
        <div className={styles.navigation}>
          <div>
            <button data-toggle="collapse" data-target="#navbar" className="navbar-toggle collapsed">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
          </div>
          <div className="collapse navbar-collapse" id="navbar">
            <ul className="nav navbar-nav">
            {items}
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

module.exports = Navbar;
