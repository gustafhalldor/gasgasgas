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
    let durationText = '';
    if (this.props.duration) {
      durationText =
      <div className={styles.noMargin}>
        u.þ.b. {this.props.duration} min keyrsla
        </div>;
    }

    return(
      <div className={styles.marginbottom}>
        <label className={styles.flexcontainer}>
          {this.props.text}
          <input type={this.props.type}
                 value={this.state.value}
                 onChange={this.handleInputChange.bind(this)}
                 className={styles.inputFieldTopMargin}/>
        </label>
        {durationText}
      </div>
    )
  }

}

module.exports = NumberInputComponent;
