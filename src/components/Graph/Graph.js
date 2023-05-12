import './Graph.css'
import {Line} from "react-chartjs-2";
import {
    CategoryScale,
    Chart as ChartJS,
    Filler, Legend,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip
} from "chart.js";
import {useEffect, useState} from "react";
import axios from "axios";


ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
);

const Graph = ({mode, chart_id}) => {
    const [costs, setCosts] = useState()
    useEffect(() => {
        axios({
            method: 'GET',
            url: `http://localhost:3010/api/${chart_id}_${mode}`
        }).then(chart_data => {
            console.log(chart_data.data);
            setCosts(chart_data.data.costs)
        })
    },[mode])
    console.log(costs)
    const options = {
        responsive: true,
        aspectRatio: 1.5
    };
    const k = Array(20)
    for (let i = 0; i < 20; i++) {
        k[i] = i;
    }
    const g = Array(20)
    for (let i = 0; i < 20; i++) {
        g[i] = Math.floor(Math.random()*1000);
    }
    const data = {
        labels: k,
        datasets: [
            {
                fill: true,
                data: g, //costs,//
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
                pointRadius: 1,
                borderWidth: 2
            },
        ],
    };
    return (
        <Line data={data} options={options}/>
    )
}

export default Graph