import React, { Component } from 'react';
import Form from './form/Form.js';
import Map from './map/Map.js';
import Results from './results/Results.js';
import styles from './app.css';

// Google Maps API key: AIzaSyAO0bYbvQc-LYwluOSaD2wDURsxohJ8AB0

class App extends Component {
  constructor() {
    super();

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

  getDistDurationAndPrices(dist, dur, regular, diesel) {
    this.setState({
      distance: dist,
      duration: dur,
      regularPrice: regular,
      dieselPrice: diesel
    })
  }

  render() {
    return (
      <div className={styles.flexcolumn}>
        <div className={styles.formandmap}>
          <Map onMarkerClick={this.handleMarkerClick.bind(this)} parentCB={this.getDistDurationAndPrices.bind(this)}/>
          <Form   onSubmit={this.handleFormData.bind(this)}
                  distance={this.state.distance}/>
        </div>
        <Results data={this.state}/>
      </div>
    );
  }
}

module.exports = App;
