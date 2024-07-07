// ApexChart.js
import React from 'react';
import ReactApexChart from 'react-apexcharts';

class ApexChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [
        {
          name: 'Đơn hàng',
          data: [10, 8, 21, 50, 42, 20, 25]
        },
        {
          name: 'Doanh thu (M)',
          data: [19, 10, 8, 32, 16, 12, 8]
        }
      ],
      options: {
        chart: {
          height: 350,
          type: 'area'
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'smooth'
        },
        xaxis: {
          type: 'datetime',
          categories: [
            "2024-07-01",
            "2024-07-02",
            "2024-07-03",
            "2024-07-04",
            "2024-07-05",
            "2024-07-06",
            "2024-07-07"
          ]
        },
        tooltip: {
          x: {
            format: 'dd/MM/yy HH:mm'
          }
        },
        grid: {
          show: false,
          borderColor: '#f1f1f1',
        },
      }
    };
  }

  render() {
    return (
      <div>
        <div id="chart">
          <ReactApexChart
            options={this.state.options}
            series={this.state.series}
            type="area"
            height={350}
          />
        </div>
        <div id="html-dist"></div>
      </div>
    );
  }
}

export default ApexChart;
