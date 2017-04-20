import React, { Component } from 'react';
import RadioInputs from './radioInputs';
import NumberInputs from './numberInputs';
import styles from './form.css';

class Form extends Component {

  constructor(props) {
    super(props);

    this.state = ({
      typeOfGas: '95 oktan',
      distance: 0,
      showResultInfoText: false
    })
  }

  handleRadioInputChange(change) {
    this.setState({
      typeOfGas: change
    })
  }

  submitForm(event) {
    event.preventDefault();

    const inputs = {
      discount: event.target[0].value,
      litersBought: event.target[1].value,
      milage: event.target[2].value,
      distance: event.target[3].value,
      typeOfGas: this.state.typeOfGas
    }

    this.props.onSubmit(inputs);

    this.setState({
      showResultInfoText: true
    })
  }

  render() {

    let text = '';
    if (this.state.showResultInfoText) {
      text = 'Niðurstöður að neðan';
    }

    return (
      <form onSubmit={this.submitForm.bind(this)} className={styles.flexcontainer}>
        <span className="sr-only">Atriði sem þarf að fylla inn</span>
        <NumberInputs distance={this.props.distance} duration={this.props.duration}/>
        <RadioInputs onRadioChange={this.handleRadioInputChange.bind(this)}/>
        <input type="submit" value="reikna" className={styles.input}/>
        <span className={styles.slightlySmallerFont}>{text}</span>
      </form>
    )
  }
}

module.exports = Form;
