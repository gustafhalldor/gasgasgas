import React, { Component } from 'react';
import styles from './stats.css';
import LineComponentGas from './lineComponentGas.js';
import LineComponentOil from './lineComponentOil.js';
import { Link } from 'react-router';

class Stats extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data95: {
        data: "",
        avg: 1
      },
      oil: {
        data: "",
        avg: 1,
        avggas: 1
      },
      gasDays: 3,
      oilDays: 3
    }
  }

  componentDidMount() {
    let thisStatObject = this;
    fetch(`http://localhost:3001/api/getRegularPricesXDaysBack/${this.state.gasDays}`)
    .then(response => {
      return response.json();
    }).then(function(response) {
      thisStatObject.setState({data95: response});
    });

    fetch(`http://localhost:3001/api/getOilBarrelPrice/${this.state.oilDays}`)
    .then(response => {
      return response.json();
    }).then(function(response) {
      thisStatObject.setState({oil: response});
    });
  }

  updateGasDaysData(days) {
    let thisStatObject = this;
    fetch(`http://localhost:3001/api/getRegularPricesXDaysBack/${days}`)
    .then(response => {
      return response.json();
    }).then(function(response) {
      thisStatObject.setState({data95: response, gasDays: days});
    });
  }

  updateOilDaysData(days) {
    let thisStatObject = this;
    fetch(`http://localhost:3001/api/getOilBarrelPrice/${days}`)
    .then(response => {
      return response.json();
    }).then(function(response) {
      thisStatObject.setState({oil: response, oilDays: days});
    });
  }

  submitGasForm(event) {
    event.preventDefault();

    this.updateGasDaysData(event.target[0].value);
  }

  submitOilForm(event) {
    event.preventDefault();

    this.updateOilDaysData(event.target[0].value);
  }

  buttonHideInfo() {
    let infoDiv = this.refs.infoDiv;
    infoDiv.style.opacity = '0';
    setTimeout(function(){infoDiv.parentNode.removeChild(infoDiv);}, 1000);
  }

  render() {
    return (
      <section>
        <div className={styles.wrapper}>
          <div className={styles.infoDiv} ref="infoDiv">
            <div className={styles.titleAndCloseButton}>
              <div></div>
              <h1 className={styles.titleFont}>
                Verðþróun bensíns/olíu í 2 línuritum
              </h1>
              <button className={styles.button} onClick={this.buttonHideInfo.bind(this)} value='Loka upplýsingaglugga'>
                X
                <span className="sr-only">Takki til að loka upplýsingaglugga</span>
              </button>
            </div>
            <div className={styles.infoText}>
              <div className={styles.marginBottom8px}>Á efra línuritinu má sjá þróun bensínverðs á höfuðborgarsvæðinu
                síðastliðna x daga. Hvert fyrirtæki hefur sína eigin litakóðuðu línu.
              </div>
              <div className={styles.marginBottom8px}>
                Neðra línuritið sýnir meðalverð 95 oktana bensíns á höfuðborgarsvæðinu á móti heimsmarkaðsverði
                Brent olíutunnu seinustu x daga. <br/>
                <span>Lesa má nánar um Brent olíutunnu á svæðinu <Link to="/about">Um Síðuna</Link></span>
              </div>
              <div className={styles.marginBottom8px}>
                Hægt er að fela línur með því að velja úr listanum fyrir ofan þau.
                Einnig leyfa bæði gröf uppflettingar á gögnum x daga aftur í tímann.
              </div>
            </div>
          </div>
          <div className={styles.inputs}>
            <form onSubmit={this.submitGasForm.bind(this)} >
              <input type="number" placeholder="dagar" className={styles.smallerNumberInput} min="0"/>
              <input type="submit" value="Sækja gögn"/>
            </form>
          </div>
          <LineComponentGas data={this.state.data95} days={this.state.gasDays}/>
          <div className={styles.inputsExtraMarginTop}>
            <form onSubmit={this.submitOilForm.bind(this)} >
              <input type="number" placeholder="dagar" className={styles.smallerNumberInput} min="0"/>
              <input type="submit" value="Sækja gögn"/>
            </form>
          </div>
          <LineComponentOil data={this.state.oil} days={this.state.oilDays} avggas={this.state.oil.avggas}/>
        </div>
      </section>
    )
  }
}

module.exports = Stats;
