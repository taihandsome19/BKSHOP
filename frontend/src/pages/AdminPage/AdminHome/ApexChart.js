import React from 'react';
import ReactApexChart from 'react-apexcharts';

class ApexChart extends React.Component {
  constructor(props) {
    super(props);

    const convertDateArray = (dates) => dates.map(dateStr => new Date(dateStr.split('/').reverse().join('-')).getTime());

    // Initialize state with props
    this.state = {
      series: [
        {
          name: 'Đơn hàng',
          data: props.order || [], // Default to empty array if not provided
        },
        {
          name: 'Doanh thu (M)',
          data: props.revenue || [], // Default to empty array if not provided
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
          categories: convertDateArray(props.date), // Default to empty array if not provided
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
