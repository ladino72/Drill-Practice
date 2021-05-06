import React, { useState, useEffect } from "react";
import {Bar } from "react-chartjs-2";

//https://codesandbox.io/s/jjpk3o5l3?file=/src/Hello.js:52-71
const Chart = ({ chartDatos}) => {
    const [chartData, setChartData] = useState({});
    const {data,topic}=chartDatos;

    data.sort((a, b) => (a.id > b.id) ? 1 : -1)

    useEffect(() => {
        let id = [], Points = [];

    for (let p = 0; p < data.length; p++) {
        id[p] = data[p].id;
        Points[p] = data[p].Points
    }
        const chart = () => {
            setChartData({
                labels: id,
                datasets: [
                    {
                        label: topic,
                        data: Points,
                        backgroundColor: ["rgba(75, 192, 192, 0.6)"],
                        borderWidth: 4
                    }
                ]
            });
        };
        chart();
    }, [chartDatos,data,topic]);

    return (
        <div >
            <Bar data={chartData} options={{ responsive: true }} />
        </div>
    )
}

export default Chart
