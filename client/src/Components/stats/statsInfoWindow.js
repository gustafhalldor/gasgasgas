import React, { Component } from 'react';
import styles from './statsInfoWindow.css';

class InfoWindow extends Component {

  constructor(props) {
    super(props);

    this.state = {
      dontShowInfoWindow: true
    }
  }

  handleButtonClick() {
    let overlay = this.refs.overlay;
    overlay.style.display = 'none';

    this.props.onButtonClick(this.state.dontShowInfoWindow);
  }

  handleCheckboxChange() {
    const change = this.state.dontShowInfoWindow === true ? false : true;
    this.setState({ dontShowInfoWindow: change });

  }

  handleOverlayClick() {
    let overlay = this.refs.overlay;
    overlay.style.display = 'none';
  }

  render() {
    if (this.props.showOverlay === false) {
      return <div></div>;
    } else {
      return (
        <div className={styles.overlay} ref="overlay" onClick={this.handleOverlayClick.bind(this)}>
          <div className={styles.modal}>
            <div className={styles.infoText}>
              <p>Hér fyrir aftan gefur að líta verðþróun bensínverðs í 2 línuritum.</p>
              <p>Á efra línuritinu má sjá þróun bensínverðs á höfuðborgarsvæðinu seinustu X daga. Hvert fyrirtæki hefur
                sína eigin litakóðuðu línu.</p>
              <div>
                <p>Á neðra línuritinu má sjá meðalverð 95 oktana bensíns á höfuðborgarsvæðinu (blá lína) á móti heimsmarkaðsverði
                Brent olíutunnu (svört lína) seinustu X daga.<br/>
                Lesa má nánar um Brent olíutunnu á svæðinu <a href="./about">"Um Síðuna"</a></p>
              </div>
              <p>Á báðum gröfum er hægt að fela línur með því að velja úr listanum fyrir ofan þau. Einnig leyfa bæði gröf
              þér að fletta upp gögnum X daga aftur.</p>
              <div className={styles.imagesDiv}>
                <figure>
                  <img src="https://notendur.hi.is/~ghg4/Loka/hideExample.PNG" alt="sýnimynd af grafi" className={styles.img}></img>
                  <figcaption><em>Olís væri falið hér t.d.</em></figcaption>
                </figure>
                <figure>
                  <img src="https://notendur.hi.is/~ghg4/Loka/getDaysExample.PNG" alt="sýnimynd af virkni grafs" className={styles.img}></img>
                  <figcaption><em>Ná í gögn X daga aftur</em></figcaption>
                </figure>
              </div>
              <div className={styles.buttonAndCheckbox}>
                <div className={styles.checkboxAndLabel}>
                  <label htmlFor="noshow"><input type="checkbox" id="noshow" onChange={this.handleCheckboxChange.bind(this)}
                    checked={this.state.dontShowInfoWindow}></input>Ekki sýna aftur</label>

                </div>
                <input type="button" value="Ok, skilið!" className={styles.okButton} onClick={this.handleButtonClick.bind(this)}></input>
              </div>
          </div>
        </div>
      </div>
      );
    }
  }
}

module.exports = InfoWindow;
