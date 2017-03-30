import React, { Component } from 'react';
import {Line} from 'react-chartjs-2';
import styles from './lineComponent.css';

class LineCompGas extends Component {

  constructor(props) {
    super(props);

    this.state = {
      gasScale: 0
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data !== null) {
      this.setState({ gasScale: nextProps.data.avg});
    }
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
    let oil = [];

    if(this.props.data.data !== null) {
      for (var i = 0; i < this.props.data.data.length; i++) {
        let dataset = this.props.data.data[i];

        days.push(dataset.date.slice(0, 16));
        orkan.push(dataset.orkan);
        orkanx.push(dataset.orkanx);
        skeljungur.push(dataset.skeljungur);
        olís.push(dataset.olís);
        ob.push(dataset.ob);
        atlantsolía.push(dataset.atlantsolía);
        dælan.push(dataset.dælan);
        n1.push(dataset.n1);
        oil.push(dataset.price);
      }

      chartData.labels = days;
      chartData.datasets = [
        {
          data: orkan,
          yAxisID: "regular",
          label: 'orkan',
          fill: false,
          lineTension: 0.1,
          backgroundColor: '#808080',
          borderColor: '#808080',
          pointRadius: 0,
          pointHitRadius: 5,
          borderWidth: 2,
          pointHoverBorderWidth: 2
        },
        {
          data: orkanx,
          yAxisID: "regular",
          label: 'orkanx',
          fill: false,
          lineTension: 0.1,
          backgroundColor: '#0000ff',
          borderColor: '#0000ff',
          pointRadius: 0,
          pointHitRadius: 5,
          borderWidth: 2,
          pointHoverBorderWidth: 0.5
        },
         {
           data: skeljungur,
           yAxisID: "regular",
           label: 'skeljungur',
           fill: false,
           lineTension: 0.1,
           backgroundColor: '#0fffff',
           borderColor: '#0fffff',
           pointRadius: 0,
           pointHitRadius: 5,
           borderWidth: 2,
           pointHoverBorderWidth: 0.5
         },
         {
           data: olís,
           yAxisID: "regular",
           label: 'olís',
           fill: false,
           lineTension: 0.1,
           backgroundColor: '#00ff00',
           borderColor: '#00ff00',
           pointRadius: 0,
           pointHitRadius: 5,
           borderWidth: 2,
           pointHoverBorderWidth: 0.5
         },
         {
           data: ob,
           yAxisID: "regular",
           label: 'ob',
           fill: false,
           lineTension: 0.1,
           backgroundColor: '#ff0000',
           borderColor: '#ff0000',
           pointRadius: 0,
           pointHitRadius: 5,
           borderWidth: 2,
           pointHoverBorderWidth: 0.5
         },
         {
           data: atlantsolía,
           yAxisID: "regular",
           label: 'atlantsolía',
           fill: false,
           lineTension: 0.1,
           backgroundColor: '#fff000',
           borderColor: '#fff000',
           pointRadius: 0,
           pointHitRadius: 5,
           borderWidth: 2,
           pointHoverBorderWidth: 0.5
         },
         {
           data: dælan,
           yAxisID: "regular",
           label: 'dælan',
           fill: false,
           lineTension: 0.1,
           backgroundColor: '#ff00ff',
           borderColor: '#ff00ff',
           pointRadius: 0,
           pointHitRadius: 5,
           borderWidth: 2,
           pointHoverBorderWidth: 0.5
         },
         {
           data: n1,
           yAxisID: "regular",
           label: 'n1',
           fill: false,
           lineTension: 0.1,
           backgroundColor: '#934915',
           borderColor: '#934915',
           pointRadius: 0,
           pointHitRadius: 5,
           borderWidth: 2,
           pointHoverBorderWidth: 0.5
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
          yAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: "ISK á líter"
              },
              position: "left",
              "id": "regular",
              ticks: {
                max: this.state.gasScale*1.08,
                min: this.state.gasScale*0.92,
                stepSize: 2
              }
            }
          ],
          xAxes: [{
            ticks: {
                fontSize: 11
            }
        }]
        },
        title: {
            display: true,
            fontSize: 14,
            text: `Verð 95 oktan á höfuðborgarsvæðinu seinustu ${this.props.days} dagana`,
        },
        maintainAspectRatio: false,
    }

    let lineGraphGas = '';
    if(this.props.data != null) {
      let data = this.createChartData();
      lineGraphGas = <Line data={data} options={chartOptions} height={450}/>
    } else {
      lineGraphGas = <h3>Hér á að vera graf</h3>
    }

    return (
      <div className={styles.wandh}>
        {lineGraphGas}
      </div>
    )
  }
}

module.exports = LineCompGas;
