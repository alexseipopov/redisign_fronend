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
        legend: {
            display: false
        },
        tooltip: {},
        hover: {
            mode: 'nearest',
            intersect: true
        },
        // plugins: {
        //     onHover: (chart, event, elements) => {
        //         if (elements.length > 0) {
        //             const index = elements[0].index;
        //             const width = chart.chartArea.right - chart.chartArea.left;
        //             const x = chart.chartArea.left + (width / chart.data.labels.length) * index;
        //
        //             chart.ctx.beginPath();
        //             chart.ctx.moveTo(x, chart.chartArea.top);
        //             chart.ctx.strokeStyle = '#000';
        //             chart.ctx.lineTo(x, chart.chartArea.bottom);
        //             chart.ctx.stroke();
        //         }
        //     },
        //     onMouseOut: (chart, event) => {
        //         chart.ctx.clearRect(0, 0, chart.width, chart.height);
        //     }
        // }
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