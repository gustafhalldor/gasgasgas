import React, { Component } from 'react';
import Form from './form/Form.js';
import Map from './map/Map.js';
import Results from './results/Results.js';
import styles from './app.css';
import { Link } from 'react-router';

// Google Maps API key: AIzaSyAO0bYbvQc-LYwluOSaD2wDURsxohJ8AB0

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      milage: 0,
      discount: 0,
      litersBought: 0,
      distance: 0,
      duration: 0,
      typeOfGas: '95 oktan',
      regularPrice: 0,
      dieselPrice: 0
    }
  }

  handleFormData(inputs) {
    this.setState({
      milage: inputs.milage,
      discount: inputs.discount,
      litersBought: inputs.litersBought,
      distance: inputs.distance,
      typeOfGas: inputs.typeOfGas,
    });
  }

  handleMarkerClick(regular, diesel){
    this.setState({
      regularPrice: regular,
      dieselPrice: diesel
    });
  }

  getDistAndDuration(dist, dur) {
    this.setState({
      distance: dist,
      duration: dur
    })
  }

  buttonHideInfo() {
    let infoDiv = this.refs.infoDiv;
    infoDiv.style.opacity = '0';
    setTimeout(function(){infoDiv.parentNode.removeChild(infoDiv);}, 1000);
  }

  render() {
    return (
      <div className={styles.flexcolumn}>
        <div className={styles.margin}>
          <div className={styles.infoAndFormAndMap}>
            <div className={styles.infoDiv} ref="infoDiv">
              <div className={styles.titleAndCloseButton}>
                <div></div>
                <h1 className={styles.titleFont}>
                  Velkomin/n á afsláttarreiknivél fyrir bensín á höfuðborgarsvæðinu.
                </h1>
                <button className={styles.button} onClick={this.buttonHideInfo.bind(this)} value='Loka upplýsingaglugga'>
                  X
                  <span className="sr-only">Takki til að loka upplýsingaglugga</span>
                </button>
              </div>
              <div className={styles.infoText}>
                <ul className={styles.leftPadding20px}>
                  <li>Fyrsta mál á dagskrá er að velja bensínstöð á kortinu (fyrir neðan) svo vélin viti hvaða verð hún á að nota.</li>
                  <li>Fylltu næst inn nauðsynlegar upplýsingar.</li>
                  <ul className={styles.leftPadding20px}>
                    <li>Athugaðu að hægt er að láta kortið reikna út fjarlægðina frá þér til bensínstöðvar.</li>
                  </ul>
                  <li>Smelltu svo á "Reikna" takkann.</li>
                </ul>
                </div>
                <span className={styles.centerFlexItem}>Tjekkaðu líka á <Link to="/statistics">Verðþróun</Link> hluta síðunnar!</span>
            </div>
            <div>
              <div className={styles.formandmapDiv}>
                <Map onMarkerClick={this.handleMarkerClick.bind(this)} parentCB={this.getDistAndDuration.bind(this)}/>
                <Form   onSubmit={this.handleFormData.bind(this)}
                        distance={this.state.distance}
                        duration={this.state.duration}/>
              </div>
            </div>
          </div>
          <Results data={this.state}/>
        </div>
      </div>
    );
  }
}

module.exports = App;
