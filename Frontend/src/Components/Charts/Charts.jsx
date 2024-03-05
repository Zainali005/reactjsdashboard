import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import './Charts.css';

const Charts = () => {
    const [series, setSeries] = useState([30, 18, 19, 33]);
    const [options, setOptions] = useState({
        chart: {
            width: 380,
            type: 'donut',
        },
        plotOptions: {
            pie: {
                startAngle: -90,
                endAngle: 270
            }
        },
        dataLabels: {
            enabled: false
        },
        fill: {
            type: 'gradient',
        },
        legend: {
            formatter: function (val, opts) {
                const labels = ['Travel', 'Food', 'Rent', 'Misc']; // Updated series labels
                return labels[opts.seriesIndex] + " - " + opts.w.globals.series[opts.seriesIndex]
            },
            offsetY: 10, // Adjust legend position
        },
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    width: 200
                },
                legend: {
                    position: 'bottom'
                }
            }
        }]
    });

    const [chartData, setChartData] = useState({
        series: [{
            name: 'Sales',
            data: [4, 3, 10, 9, 29, 19, 22, 9, 12, 7, 19, 5, 13, 9, 17, 2, 7, 5]
        }],
        options: {
            chart: {
                height: 350,
                type: 'line',
            },
            forecastDataPoints: {
                count: 7
            },
            stroke: {
                width: 5,
                curve: 'smooth'
            },
            xaxis: {
                type: 'datetime',
                categories: ['1/11/2000', '2/11/2000', '3/11/2000', '4/11/2000', '5/11/2000', '6/11/2000', '7/11/2000', '8/11/2000', '9/11/2000', '10/11/2000', '11/11/2000', '12/11/2000', '1/11/2001', '2/11/2001', '3/11/2001', '4/11/2001', '5/11/2001', '6/11/2001'],
                tickAmount: 10,
                labels: {
                    formatter: function (value, timestamp, opts) {
                        return opts.dateFormatter(new Date(timestamp), 'dd MMM')
                    }
                }
            },
            title: {
                align: 'left',
                style: {
                    fontSize: "16px",
                    color: '#666'
                }
            },
            fill: {
                type: 'gradient',
                gradient: {
                    shade: 'dark',
                    gradientToColors: ['#FDD835'],
                    shadeIntensity: 1,
                    type: 'horizontal',
                    opacityFrom: 1,
                    opacityTo: 1,
                    stops: [0, 100, 100, 100]
                },
            },
            yaxis: {
                min: -10,
                max: 40
            }
        },
    });

    return (
        <div className="row container">
            <div className="col-md-6 lineChart">
                <h5>Balance History</h5>
                <div id="chart">
                    <ReactApexChart options={chartData.options} series={chartData.series} type="line" height={290} />
                </div>
                <div id="html-dist"></div>
            </div>
            <div className="col-md-6 donutchart">
                <h5>Monthly Spending</h5>
                <div id="donut-chart">
                    <ReactApexChart options={options} series={series} type="donut" width={330} />
                </div>
                <div id="html-dist-2"></div>
            </div>
        </div>
    );
}

export default Charts;
