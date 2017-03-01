import React, { Component } from 'react';
import styles from './results.css';

class Results extends Component {

  totalGasCost() {
    let price = this.getPrice();

    return this.props.data.litersBought * price;
  }

  getPrice() {
    let price;

    if(this.props.data.typeOfGas === '95 oktan') {
      price = this.props.data.regularPrice;
    } else {
      price = this.props.data.dieselPrice;
    }

    return price;
  }

  calcDiscount() {
    return this.props.data.discount * this.props.data.litersBought;
  }

  calcExpense() {
    let price = this.getPrice();

    // first get the milage per km
    return (this.props.data.milage/100) * this.props.data.distance * price;
  }

  handleTotalGasCost(event) {
    console.log(event);
  }

  render() {
    const disc = this.calcDiscount();
    const expense = this.calcExpense();
  //  const gasCost = this.totalGasCost();
  //  const gasCostWithDiscount = gasCost - disc;

    return (
      <div className={styles.flexrow}>
        <span>Afsláttur samtals: {disc.toFixed(2)} kr</span>
        <span>Aksturskostnaður: {expense.toFixed(2)} kr</span>
        <span><b>Ávinningur: {(disc - expense).toFixed(2)} kr</b></span>
        {/* <br></br>
        <span>Bensín samtals: {gasCost.toFixed(2)} kr</span>
        <br></br>
        <span>Bensín með afslætti: {gasCostWithDiscount.toFixed(2)} kr</span>
        <br></br>
        <span>Bensín + kostnaður - afsláttur: {(gasCostWithDiscount + expense).toFixed(2)} kr</span> */}
      </div>
    )
  }
}

module.exports = Results;
