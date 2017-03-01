const React = require('react');
const radioInputData = require('./dataRadio.js');
import styles from './radioinputs.css';

class RadioInputs extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      checkedButton: '95 oktan'
    };
  }

  handleInputChange(event) {
    this.setState({
      checkedButton: event.target.value
    })

    this.props.onRadioChange(event.target.value);
  }

  generateRadioInputs(item, i) {
    return (
      <label key={i}>
        {item.text}
        <input  type={item.type}
                name={item.name}
                value={item.value}
                onChange={this.handleInputChange.bind(this)}
                checked={item.text === this.state.checkedButton}/>
      </label>
    )
  }

  render () {
    const radioInputs = radioInputData.map(this.generateRadioInputs.bind(this));

    return (
      <div className={styles.flexrow}>
        {radioInputs}
      </div>
    )
  }
}

module.exports = RadioInputs;
