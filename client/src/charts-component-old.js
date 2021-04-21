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
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 205, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(201, 203, 207, 0.2)'
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
        fetch('/json/city_stat.json')
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
                                data: data.map(item => (item.active_male_cases + item.active_female_cases) ),
                                backgroundColor: 'gold',
                                borderColor: 'gold',
                                borderWidth: 1
                            },
                            {
                                label: 'حالات الشفاء',
                                data: data.map(item => (item.recovered_male_cases + item.recovered_female_cases) ),
                                backgroundColor: 'green',
                                borderColor: 'green',
                                borderWidth: 1
                            },
                            {
                                label: 'الوفيات',
                                data: data.map(item => (item.died_male_cases + item.died_female_cases) ),
                                backgroundColor: 'red',
                                borderColor: 'red',
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
                                    data: data.map(item => (item.active_male_cases + item.active_female_cases) ),
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
                                    data: data.map(item => (item.recovered_male_cases + item.recovered_female_cases) ),
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
                                    data: data.map(item => (item.died_male_cases + item.died_female_cases) ),
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
            <div className="chart_div chart_cases_sex">
                <h2>الحالات النشطة حسب المناطق والنوع الاجتماعي</h2>
                {data.map(item=>(
                    <div>
                        <h4>{item.city}</h4>
                        <Pie key={item.city}
                            width="320px"
                            height="320px"
                            data={{
                                labels: ['ذكور' , 'إناث'],
                                datasets: [
                                    {
                                        label: item.city,
                                        data: [item.active_male_cases, item.active_female_cases],
                                        backgroundColor: ['blue', 'pink'],
                                        borderWidth: 1
                                    }
                                ]
                            }}
                        />
                    </div>
                ))}
            </div>
            <h2 className="chart_div chart_div_table_title">تفاصيل الحالات</h2>
            <div className="chart_div chart_div_table">
                <table>
                    <thead>
                        <th>المدينة</th>
                        <th>حالات النشطة (ذكور)</th>
                        <th>الحالات النشطة (إناث)</th>
                        <th>الحالات النشطة</th>
                        <th>الشفاء (ذكور)</th>
                        <th>الشفاء (إناث)</th>
                        <th>الشفاء</th>
                        <th>الوفيات (ذكور)</th>
                        <th>الوفيات (إناث)</th>
                        <th>الوفيات</th>
                        <th>المجموع الكلي</th>        
                    </thead>
                    <tbody>
                        {data.map(x => (
                            <tr>
                                <td>{x.city}</td>
                                <td>{x.active_male_cases}</td>
                                <td>{x.active_female_cases}</td>
                                <td>{x.active_male_cases + x.active_female_cases}</td>
                                <td>{x.recovered_male_cases}</td>
                                <td>{x.recovered_female_cases}</td>
                                <td>{x.recovered_male_cases + x.recovered_female_cases}</td>
                                <td>{x.died_male_cases}</td>
                                <td>{x.died_female_cases}</td>
                                <td>{x.died_male_cases + x.died_female_cases}</td>
                                <td>
                                    {
                                        x.active_male_cases + x.active_female_cases +
                                        x.recovered_male_cases + x.recovered_female_cases +
                                        x.died_male_cases + x.died_female_cases
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