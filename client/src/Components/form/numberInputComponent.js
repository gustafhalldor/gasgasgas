const React = require('react');
import styles from './numberinputComponent.css';

class NumberInputComponent extends React.Component {
  constructor() {
    super();

    this.state = {
      value: '',
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.name === 'distance') {
      this.setState({
        value: nextProps.distance
      })
    }
  }

  handleInputChange(event) {
    this.setState({
      value: event.target.value
    })
  }

  render() {
    return(
      <div className={styles.marginbottom}>
        <label className={styles.flexcontainer}>
          {this.props.text}
          <input type={this.props.type} value={this.state.value} onChange={this.handleInputChange.bind(this)}/>
        </label>
      </div>
    )
  }

}

module.exports = NumberInputComponent;
