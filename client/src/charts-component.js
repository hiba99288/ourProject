import React, { useState, useEffect }  from 'react';
import './charts-component.css';
import './Table.css';

import { Bar, Pie } from 'react-chartjs-2';

function ChartComponent() {

    const [data, setData] = useState([]);

    const chartOptions = {
        maintainAspectRatio: false ,
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }

    const pieOptions = {
        maintainAspectRatio: false ,
        responsive: false,
        width: "150px",
        height: "150px"
    }

    const colors =  [
        'rgba(255, 99, 132, 0.4)',
        'rgba(255, 159, 64, 0.4)',
        'rgba(255, 205, 86, 0.4)',
        'rgba(75, 192, 192, 0.4)',
        'rgba(54, 162, 235, 0.4)',
        'rgba(153, 102, 255, 0.4)',
        'rgba(201, 203, 207, 0.4)'
      ];
    
    const colors2 = [
        'rgb(255, 99, 132)',
        'rgb(255, 159, 64)',
        'rgb(255, 205, 86)',
        'rgb(75, 192, 192)',
        'rgb(54, 162, 235)',
        'rgb(153, 102, 255)',
        'rgb(201, 203, 207)'
      ];
    if ( data.length == 0) {
        fetch('/json/stats.json')
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setData(data);
            });
        }
    return (
        <section>
            <div className="chart_div chart_cases_bars">
                <h2>الحالات</h2>
                <Bar
                    height={400}
                    width={600}
                    data={{
                        labels: data.map(item => item.city),
                        datasets: [
                            {
                                label: 'الحالات النشطة',
                                data: data.map(item => item.active_cases ),
                                backgroundColor: colors[1],
                                borderColor: colors2[1],
                                borderWidth: 1
                            },
                            {
                                label: 'حالات الشفاء',
                                data: data.map(item => item.recovered ),
                                backgroundColor: colors[3],
                                borderColor: colors2[3],
                                borderWidth: 1
                            },
                            {
                                label: 'الوفيات',
                                data: data.map(item => item.deaths ),
                                backgroundColor: colors[0],
                                borderColor: colors2[0],
                                borderWidth: 1
                            },
                        ]
                    }}
                    options={chartOptions}
                />
            </div>
            <div className="chart_div chart_cases_pies">
                <h2>توزيع الإصابات حسب المناطق</h2>
                <div>
                    <h3>الإصابات النشطة</h3>
                    <Pie
                        width="320px"
                        height="320px"
                        data={{
                            labels: data.map(item => item.city),
                            datasets: [
                                {
                                    label: 'الحالات النشطة',
                                    data: data.map(item => item.active_cases ),
                                    backgroundColor: colors,
                                    borderColor: colors2,
                                    borderWidth: 1
                                }
                            ]
                        }}
                        options={pieOptions}
                    />
                </div>
                <div>
                    <h3>الشفاء</h3>
                    <Pie
                        width="320px"
                        height="320px"
                        data={{
                            labels: data.map(item => item.city),
                            datasets: [
                                {
                                    label: 'حالات الشفاء',
                                    data: data.map(item => item.recovered ),
                                    backgroundColor: colors,
                                    borderColor: colors2,
                                    borderWidth: 1
                                }
                            ]
                        }}
                        options={pieOptions}

                    />
                </div>
                <div>
                    <h3>الوفيات</h3>
                    <Pie
                        width="320px"
                        height="320px"
                        data={{
                            labels: data.map(item => item.city),
                            datasets: [
                                {
                                    label: 'الوفيات',
                                    data: data.map(item => item.deaths ),
                                    backgroundColor: colors,
                                    borderColor: colors2,
                                    borderWidth: 1
                                }
                            ]
                        }}
                        options={pieOptions}

                    />
                </div>
            </div>
            <h2 className="chart_div chart_div_table_title">تفاصيل الحالات</h2>
            <div className="chart_div chart_div_table">
                <table>
                    <thead>
                        <th>المدينة</th>
                        <th>الحالات النشطة</th>
                        <th>الشفاء</th>
                        <th>الوفيات</th>
                        <th>المجموع الكلي</th>        
                    </thead>
                    <tbody>
                        {data.map(x => (
                            <tr>
                                <td>{x.city}</td>
                                <td>{x.active_cases}</td>
                                <td>{x.recovered}</td>
                                <td>{x.deaths}</td>
                                <td>
                                    {
                                        x.active_cases +
                                        x.recovered +
                                        x.deaths
                                    }
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    )
}

export default ChartComponent;