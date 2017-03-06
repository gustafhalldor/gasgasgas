import React, { Component } from 'react';
import styles from './stats.css';
import {Line} from 'react-chartjs-2';

class Stats extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null
    }
  }
  componentDidMount() {
    const numDays = 10;
    let thisStatObject = this;
    fetch(`http://localhost:3001/api/getRegularPricesXDaysBack/${numDays}`)
    .then(response => {
      return response.json();
    }).then(function(response) {
      thisStatObject.setState({data: response});
    });
  }

  createChartData() {
    let chartData = {};

    let days = [];
    let orkan = [];
    let orkanx = [];
    let skeljungur = [];
    let olís = [];
    let ob = [];
    let atlantsolía = [];
    let dælan = [];
    let n1 = [];

    if(this.state.data != null) {
      for (var i = 0; i < this.state.data.length; i++) {
        let dataset = this.state.data[i];

        days.push(dataset.date.slice(0, 10));
        orkan.push(dataset.orkan);
        orkanx.push(dataset.orkanx);
        skeljungur.push(dataset.skeljungur);
        olís.push(dataset.olís);
        ob.push(dataset.ob);
        atlantsolía.push(dataset.atlantsolía);
        dælan.push(dataset.dælan);
        n1.push(dataset.n1);
      }

      chartData.labels = days;
      chartData.datasets = [
        {
          data: orkan,
          label: 'orkan',
          fill: false,
          lineTension: 0.1,
          backgroundColor: '#ff4500',
          borderColor: '#ff4500',
          pointRadius: 2,
          pointHitRadius: 5
        },
        {
          data: orkanx,
          label: 'orkanx',
          fill: false,
          lineTension: 0.1,
          backgroundColor: '#0000ff',
          borderColor: '#0000ff',
          pointRadius: 2,
          pointHitRadius: 5
        },
         {
           data: skeljungur,
           label: 'skeljungur',
           fill: false,
           lineTension: 0.1,
           backgroundColor: '#0fffff',
           borderColor: '#0fffff',
           pointRadius: 2,
           pointHitRadius: 5
         },
         {
           data: olís,
           label: 'olís',
           fill: false,
           lineTension: 0.1,
           backgroundColor: '#00ff00',
           borderColor: '#00ff00',
           pointRadius: 2,
           pointHitRadius: 5
         },
         {
           data: ob,
           label: 'ob',
           fill: false,
           lineTension: 0.1,
           backgroundColor: '#ff0000',
           borderColor: '#ff0000',
           pointRadius: 2,
           pointHitRadius: 5
         },
         {
           data: atlantsolía,
           label: 'atlantsolía',
           fill: false,
           lineTension: 0.1,
           backgroundColor: '#fff000',
           borderColor: '#fff000',
           pointRadius: 2,
           pointHitRadius: 5
         },
         {
           data: dælan,
           label: 'dælan',
           fill: false,
           lineTension: 0.1,
           backgroundColor: '#ff00ff',
           borderColor: '#ff00ff',
           pointRadius: 2,
           pointHitRadius: 5
         },
         {
           data: n1,
           label: 'n1',
           fill: false,
           lineTension: 0.1,
           backgroundColor: '#000',
           borderColor: '#000',
           pointRadius: 2,
           pointHitRadius: 5
         }
      ]
      return chartData;
    } else {
      return;
    }
  }

  render() {
    const chartOptions = {
        scales: {
          yAxes: [{
              ticks: {
                  max: 210,
                  min: 190,
                  stepSize: 2
              }
          }]
        },
        title: {
            display: true,
            text: "Verð 95 oktan seinustu 10 dagana",
        },
    }

    let lineGraph = '';
    if(this.state.data != null) {
     let data = this.createChartData();
      lineGraph = <Line data={data} options={chartOptions} />
    } else {
      lineGraph = <h3>Hér á að vera graf</h3>
    }

    return (
      <section>
        <div className={styles.sizeOfGraph}>
          <h1 className={styles.header}>Tölfræði</h1>
          <p className={styles.paragraphText}>*** WIP ***</p>
          {lineGraph}
        </div>
      </section>
    )
  }
}

module.exports = Stats;
