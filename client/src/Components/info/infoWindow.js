import React, { Component } from 'react';
import styles from './infoWindow.css';

class InfoWindow extends Component {

  constructor(props) {
    super(props);

    this.state = {
      dontShowInfoWindow: true
    }
  }

  componentWillMount() {
    // tjekka hvort að það sé eitthvað í localstorage um að notandinn vilji ekki sjá info-ið aftur

  }

  handleClick() {
    let overlay = this.refs.overlay;
    overlay.style.display = 'none';

    this.props.onButtonClick(this.state.dontShowInfoWindow);
  }

  handleCheckboxChange() {
    const change = this.state.dontShowInfoWindow === true ? false : true;
    this.setState({ dontShowInfoWindow: change });

  }

  render() {
    if (this.props.showOverlay === false) {
      return <div></div>;
    } else {
      return (
        <div className={styles.overlay} ref="overlay">
          <div className={styles.modal}>
            <div className={styles.infoText}>
              <p>Sláðu inn upplýsingar um ökutækið þitt og láttu vefsíðuna reikna út
              hvað þú ert u.þ.b. að spara á því að taka bensín með afsláttarlyklum.</p>
              <p>Þetta ferli krefst þess að þú hafir vitneskju um eftirfarandi:</p>
                <ul>
                  <li>Afsláttinn sem boðið er uppá við dælu.</li>
                  <li>Hversu marga lítra þú ert að fara að kaupa.</li>
                  <li>Eyðslu ökutækisins.</li>
                  <li>Fjarlægð í kílómetrum að bensínstöð. *</li>
                  <li>Hvort ökutækið sé 95 oktan eða diesel.</li>
                </ul>

              <em className={styles.asterix}>* Vefsíðan getur reiknað fjarlægðina fyrir þig ef þú merkir staðsetninguna þína inná kortið
              og velur svo bensínstöðina.</em>
              <div className={styles.buttonAndCheckbox}>
                <div className={styles.checkboxAndLabel}>
                  <label htmlFor="noshow"><input type="checkbox" id="noshow" onChange={this.handleCheckboxChange.bind(this)}
                    checked={this.state.dontShowInfoWindow}></input>Ekki sýna aftur</label>

                </div>
                <input type="button" value="Ok, skilið!" className={styles.okButton} onClick={this.handleClick.bind(this)}></input>
              </div>
          </div>
        </div>
      </div>
      );
    }
  }
}

module.exports = InfoWindow;
