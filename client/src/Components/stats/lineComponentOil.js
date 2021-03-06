import React, { Component } from 'react';
import {Line} from 'react-chartjs-2';
import styles from './lineComponent.css';

class LineCompOil extends Component {

  constructor(props) {
    super(props);

    this.state = {
      oilScale: 0,
      gasScale: 0
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data !== null) {
      this.setState({
        oilScale: nextProps.data.avg,
        gasScale: nextProps.avggas
      });
    }
  }

  createChartData() {
    let chartData = {};

    let days = [];
    let oilBarrelPriceUSD = [];
    // let oilBarrelPriceISK = [];
    let iceAvg = [];

    if(this.props.data.data != null) {
      for (var i = 0; i < this.props.data.data.length; i++) {
        let dataset = this.props.data.data[i];
        days.push(dataset.date.slice(0, 16));
        oilBarrelPriceUSD.push(dataset.price);
        iceAvg.push(dataset.avggas);
        // let iskPrice = (dataset.price*dataset.rate);
        // oilBarrelPriceISK.push(iskPrice);
      }

      chartData.labels = days;
      chartData.datasets = [
        {
          data: oilBarrelPriceUSD,
          yAxisID: "usd",
          label: 'olíutunna USD',
          fill: false,
          lineTension: 0.1,
          backgroundColor: '#000',
          borderColor: '#000',
          pointRadius: 0,
          pointHitRadius: 5,
          borderWidth: 2.5,
          pointHoverBorderWidth: 2,
          spanGaps: true
        },
        {
          data: iceAvg,
          yAxisID: "isk",
          label: 'meðalverð á lítra af 95 okt',
          fill: false,
          lineTension: 0.1,
          backgroundColor: '#0000ff',
          borderColor: '#0000ff',
          pointRadius: 0,
          pointHitRadius: 5,
          borderWidth: 2.5,
          pointHoverBorderWidth: 2
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
                // labelString: "USD"
              },
              position: "left",
              "id": "usd",
              ticks: {
                fontColor: "#000",
                max: this.state.oilScale*1.08,
                min: this.state.oilScale*0.92,
                stepSize: 2,
                fontStyle: "bold"
              }
            },
            {
              scaleLabel: {
                display: true,
                // labelString: "ISK"
              },
              position: "right",
              "id": "isk",
              gridLines: {
                drawOnChartArea: false
              },
              ticks: {
                fontColor: "#0000ff",
                max: this.state.gasScale*1.08,
                min: this.state.gasScale*0.92,
                stepSize: 2,
                fontStyle: "bold"
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
            text: `Heimsmarkaðsverð olíutunnu seinustu ${this.props.days} daga vs. meðalverð í Reykjavík`,
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

module.exports = LineCompOil;
