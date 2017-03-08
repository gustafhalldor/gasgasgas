/* global google */

import React, { Component } from 'react';
import gasStations from './data/gas_stations.js';
//import data95 from '../../../../server/data/data95.json';
//import dataDiesel from '../../../../server/data/dataDiesel.json';
import styles from './map.css';

// TODO: Finna út geolocation hjá notanda og nota bara this.props.defaultPosition ef
// það tekst ekki. 


class Map extends Component {
  constructor(props) {
    super(props);

    let thisStatObject = this;
    fetch(`http://localhost:3001/api/get95price/`)
        .then(response => {
          return response.json();
        }).then(function(response) {
          thisStatObject.setState({data95: response});
        });

    fetch(`http://localhost:3001/api/getDieselPrice/`)
        .then(response => {
          return response.json();
        }).then(function(response) {
          thisStatObject.setState({dataDiesel: response});
        });

    this.state = {
      selectedMarker: null,
      userLocMarker: null,
      allMarkers: [],
      hasPressedCalcButton: false
    }
  }

  componentDidMount() {
    this.map = new google.maps.Map(this.refs.map, {
      center: this.props.defaultPosition,
      zoom: 12
    });

    // Create the search box and link it to the UI element.
    let searchBox = new google.maps.places.SearchBox(this.refs.search_box);
    this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(this.refs.search_box);

    // Bias the SearchBox results towards current map's viewport.
    this.map.addListener('bounds_changed', function() {
      searchBox.setBounds(this.getBounds());
    });

    let map = this.map;
    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    searchBox.addListener('places_changed', function() {
      let places = searchBox.getPlaces();

      if (places.length === 0) {
        return;
      }

      let bounds = new google.maps.LatLngBounds();
      places.forEach(function(place) {
        if (!place.geometry) {
          console.log("Returned place contains no geometry");
          return;
        }

        if (place.geometry.viewport) {
          // Only geocodes have viewport.
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }
      });
      map.fitBounds(bounds);
    });

    map.addListener('click', (event) => {

      if(this.state.userLocMarker === null) {
        let marker = new google.maps.Marker({
            icon: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png',
            position: {lat: event.latLng.lat(), lng: event.latLng.lng()},
            title: 'Mín staðsetning',
            isOpen: false
        });

        marker.setMap(map);
        this.setState({
          userLocMarker: marker
        });
      } else {
        (this.state.userLocMarker).setPosition(
          new google.maps.LatLng( event.latLng.lat(), event.latLng.lng())
        );
      }
    });

    for (var i = 0; i < gasStations.length; i++) {
      let lat = gasStations[i].lat;
      let lng = gasStations[i].lng;
      let latLng = {lat, lng};
      let title = gasStations[i].company.toUpperCase();
      let loc = gasStations[i].location;

      let icon = null;
      switch (gasStations[i].company) {
        case 'orkan':
          icon = 'https://notendur.hi.is/~ghg4/Loka/orkan.png';
          break;
        case 'olís':
          icon = 'https://notendur.hi.is/~ghg4/Loka/olis.png';
          break;
        case 'ob':
          icon = 'https://notendur.hi.is/~ghg4/Loka/ob.jpg';
          break;
        case 'n1':
          icon = 'https://notendur.hi.is/~ghg4/Loka/n1.png';
          break;
        case 'skeljungur':
          icon = 'https://notendur.hi.is/~ghg4/Loka/skeljungur.png';
          break;
        case 'atlantsolía':
          icon = 'https://notendur.hi.is/~ghg4/Loka/atlantsolía.png';
          break;
        case 'dælan':
          icon = 'https://notendur.hi.is/~ghg4/Loka/daelan.png';
          break;
        default:

      }

      let marker = new google.maps.Marker({
          icon,
          position: latLng,
          title,
          location: loc,
          isOpen: false,
          regularGas: 0,
          diesel: 0
      });

      let contentString =
            `<div>
              <span>Fyrirtæki: ${title}</span><br>
              <span>Staðsetn.: ${loc}</span>
            </div>`;

      let infowindow = new google.maps.InfoWindow({
        content: contentString
      });

      marker.infowindow = infowindow;

      // To add the marker to the map, call setMap();
      marker.setMap(map);

      let thisMapObject = this;

      marker.addListener('click', function() {
        // close infowindow of previously selected marker (if there is one)
        if(thisMapObject.state.selectedMarker) {
          thisMapObject.state.selectedMarker.infowindow.close(thisMapObject.map, thisMapObject.state.selectedMarker);
        }

        this.infowindow.open(this.map, this);
        this.isOpen = true;
        thisMapObject.setState({selectedMarker: this})
        thisMapObject.getAndSetPrices(this);
        thisMapObject.props.onMarkerClick(this.regularGas, this.diesel)

        if(thisMapObject.state.hasPressedCalcButton && thisMapObject.state.userLocMarker
              && thisMapObject.state.selectedMarker) {
          const request = thisMapObject.getRequest();
          thisMapObject.renderDirectionsAndCalcDistance(thisMapObject.map, request)
        }
      });
      this.state.allMarkers.push(marker);
    } // end for
  } // end componentDidMount()

  getAndSetPrices(m) {
    let company = m.title.toLowerCase();
    let location = m.location;

    let thisMapObject = this;
    for(let comp in this.state.data95) {
      if(comp === company) {
        if(this.state.data95[comp].length === 1) {
          thisMapObject.state.selectedMarker.regularGas = this.state.data95[comp][0].price;
        } else {
          for(let loc in this.state.data95[comp]) {
            if ({}.hasOwnProperty.call(this.state.data95[comp], loc)) {
              let locationCheck = this.state.data95[comp][loc].location;
              if(locationCheck === location) {
                thisMapObject.state.selectedMarker.regularGas = this.state.data95[comp][loc].price;
              }
            }
          }
        }
      } // end outer if
    } // end for

    for(let comp in this.state.dataDiesel) {
      if(comp === company) {
        if(this.state.dataDiesel[comp].length === 1) {
          thisMapObject.state.selectedMarker.diesel = this.state.dataDiesel[comp][0].price;
        } else {
          for(let loc in this.state.dataDiesel[comp]) {
            if ({}.hasOwnProperty.call(this.state.dataDiesel[comp], loc)) {
            let locationCheck = this.state.dataDiesel[comp][loc].location;
              if(locationCheck === location) {
                thisMapObject.state.selectedMarker.diesel = this.state.dataDiesel[comp][loc].price;
              }
            }
          }
        }
      } // end outer if
    } // end for
  }

  buttonClickHandler() {
    let request = {
      travelMode: google.maps.TravelMode.DRIVING
    };
    // if user has been a good user and placed a marker, marking his location,
    // ... we can get his location!
    if(this.state.userLocMarker) {
      request.origin = {
            lat: this.state.userLocMarker.position.lat(),
            lng: this.state.userLocMarker.position.lng()
          }
    } else {
      return console.log("you must put down a marker!");
    }

    if(this.state.selectedMarker) {
      request.destination = {
          lat: this.state.selectedMarker.position.lat(),
          lng: this.state.selectedMarker.position.lng()
        }
    } else {
      return console.log("you must click a gas station!");
    }

    this.renderDirectionsAndCalcDistance(this.map, request)

    this.setState({
      hasPressedCalcButton: true
    })
  } // end buttonClickHandler

  getRequest() {
    let request = {
      travelMode: google.maps.TravelMode.DRIVING,
      origin: {
        lat: this.state.userLocMarker.position.lat(),
        lng: this.state.userLocMarker.position.lng()
      },
      destination: {
        lat: this.state.selectedMarker.position.lat(),
        lng: this.state.selectedMarker.position.lng()
      }
    };

    return request;
  }

  renderDirectionsAndCalcDistance(map, request) {
    let directionsDisplay = this.props.directionsDisplay;
    (this.props.directionsService).route(request, function (response, status) {
      if (status === google.maps.DirectionsStatus.OK) {
        directionsDisplay.setMap(map);
        directionsDisplay.setDirections(response)
      };
    });

    // Reiknar út vegalengd og tíma sem tekur að keyra
    (this.props.distanceService).getDistanceMatrix({
        origins: [request.origin],
        destinations: [request.destination],
        travelMode: google.maps.TravelMode.DRIVING,
    }, (response, status) => {
        if (status === google.maps.DistanceMatrixStatus.OK && response.rows[0].elements[0].status !== "ZERO_RESULTS") {
            let distance = response.rows[0].elements[0].distance.text;
            let duration = response.rows[0].elements[0].duration.text;

            // send distance, duration and prices of gas up to parent
            this.props.parentCB(distance.split(' ')[0], duration.split(' ')[0]);
        } else {
          // breyta þessu, ekki gott að alerta í feisið á fólki
            alert("Unable to find the distance via road.");
        }
      }); // end getDistanceMatrix
  }

  render() {
    let validateGasStation = '';
    let howToUse = '';
    if(this.state.selectedMarker === null) {
      validateGasStation = <b>Veldu bensínstöð til að fá verð til að notast við.</b>;
      howToUse = '- Veldu bensínstöð sem þú hyggst versla við'
    } else {
      validateGasStation =
          <div className={styles.flexcontainer}>
            <span><b>95 oktan:</b><em> {this.state.selectedMarker.regularGas}</em></span>
            <span><b>Diesel:</b><em> {this.state.selectedMarker.diesel}</em></span>
          </div>;
    }

    let validateUserMarker = '';
    if(this.state.userLocMarker === null) {
      validateUserMarker = '- Merktu þína staðsetningu inná kortið'
    }

    let useCalcText = '';
    let buttonStatusClass;
    if(this.state.userLocMarker === null || this.state.selectedMarker === null) {
      useCalcText = 'Til að nota kortið fyrir fjarlægðarútreikninga:';
      buttonStatusClass = `${styles.btnDisabled}`;
    } else {
      buttonStatusClass = `${styles.btnActive}`;
    }



    return (
      <div>
        <span className={styles.slightlylargerfont}>{validateGasStation}</span>
        <input ref="search_box" type="text" placeholder="Leita..." className={styles.searchbox}/>
        <div className={styles.mapStyle} ref="map" >I should be a map!</div>
        <div className={styles.flexcolumn}>
          <button onClick={this.buttonClickHandler.bind(this)} className={buttonStatusClass}>reikna fjarlægð</button>
          <span className={styles.largerfont}>{useCalcText}</span>
          <span>{validateUserMarker}</span>
          <span>{howToUse}</span>
        </div>
      </div>
    );
  }
}

Map.defaultProps = {
  defaultPosition: {
    lat: 64.128641,
    lng: -21.868464
  },
  directionsService: new google.maps.DirectionsService(),
  directionsDisplay: new google.maps.DirectionsRenderer(),
  distanceService: new google.maps.DistanceMatrixService()
};

module.exports = Map;
