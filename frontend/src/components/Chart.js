import React, { useState, useEffect } from "react";
import {HorizontalBar} from 'react-chartjs-2';

//https://codesandbox.io/s/jjpk3o5l3?file=/src/Hello.js:52-71
const Chart = ({ chartDatos}) => {
    const [chartData, setChartData] = useState({});
    const {data,topic}=chartDatos;

    data.sort((a, b) => (a.id > b.id) ? 1 : -1)

    useEffect(() => {
        let id = [], Points = [];

    for (let p = 0; p < data.length; p++) {
        id[p] = data[p].id;
        Points[p] = data[p].Points.toFixed(2);
    }
        const chart = () => {
            setChartData({
                labels: id,
                
                datasets: [
                    {
                        label: topic,
                        data: Points,
                        backgroundColor: "rgba(75, 192, 192, 0.6)",
                        borderColor: "rgba(70, 195, 195, 1.0)",
                        borderWidth: 2,
                        borderRadius:50,
                        hoverBackgroundColor:"#17a2b8",
                        hoverBorderColor:"#17a2b8"
                    }
                ]
            });
        };
        chart();
    }, [chartDatos,data,topic]);

    return (
        <div >
            <HorizontalBar data={chartData} options={{ responsive: true }} />
        </div>
    )
}

export default Chart
