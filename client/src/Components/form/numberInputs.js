import React, { Component } from 'react';
import numberInputData from './dataNumbers.js';
import NumberInputComponent from './numberInputComponent.js';

class NumberInputs extends Component {

  handleInputChange(event) {

  }

  generateNumberInputs(item, i) {
    if(item.name === 'distance') {
      return (
        <NumberInputComponent
          key={i}
          text={item.text}
          name={item.name}
          type={item.type}
          value={item.value}
          distance={this.props.distance}
          duration={this.props.duration}
          onChange={this.handleInputChange.bind(this)}/>
      )
    }

    return (
      <NumberInputComponent
        key={i}
        text={item.text}
        name={item.name}
        type={item.type}
        value={item.value}
        onChange={this.handleInputChange.bind(this)}/>
    )
  }

  render () {
    const numberInputs = numberInputData.map(this.generateNumberInputs.bind(this))
    return (
      <div>
        {numberInputs}
      </div>
    )
  }
}

module.exports = NumberInputs;
