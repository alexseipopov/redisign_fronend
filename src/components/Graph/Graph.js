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

const Graph = ({x, y}) => {
    const options = {
        responsive: true,
        aspectRatio: 1.5,

        plugins: {
            title: {
                display: false
            },
            legend: {
                display: false
            }
        },
        tooltip: {},
        hover: {
            mode: 'nearest',
            intersect: true
        }
    };
    const data = {
        labels: x,
        datasets: [
            {
                fill: true,
                data: y,
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