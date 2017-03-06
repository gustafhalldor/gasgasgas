import React, { Component } from 'react';
import RadioInputs from './radioInputs';
import NumberInputs from './numberInputs';
import styles from './form.css';

class Form extends Component {
  componentDidMount() {
    // default is 95 okt
    this.state = ({
      typeOfGas: '95 oktan',
      distance: 0
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
  }

  render() {

    return (
      <form onSubmit={this.submitForm.bind(this)} className={styles.flexcontainer}>
        <NumberInputs distance={this.props.distance} duration={this.props.duration}/>
        <RadioInputs onRadioChange={this.handleRadioInputChange.bind(this)}/>
        <input type="submit" value="reikna" className={styles.input}/>
      </form>
    )
  }
}

module.exports = Form;
