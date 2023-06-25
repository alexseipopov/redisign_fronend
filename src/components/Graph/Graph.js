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
        annotation: {
            annotations: [
                {
                    type: 'line',
                    mode: 'vertical',
                    scaleID: 'x',
                    value: 10,
                    borderColor: 'red',
                    borderWidth: 2,
                    label: {
                        content: 'Value: ' + 10,
                        enabled: true,
                        position: 'top'
                    }
                }
            ]
        },
        plugins: {
            title: {
                display: false
            },
            legend: {
                display: false
            },
            afterDraw: (chart) => {
                if (chart.tooltip._active && chart.tooltip._active.length) {
                    const activePoint = chart.tooltip._active[0];
                    const ctx = chart.ctx;
                    const x = activePoint.tooltipPosition().x;
                    const topY = chart.chartArea.top;
                    const bottomY = chart.chartArea.bottom;

                    // Рисуем вертикальную линию
                    ctx.save();
                    ctx.beginPath();
                    ctx.moveTo(x, topY);
                    ctx.lineTo(x, bottomY);
                    ctx.lineWidth = 2;
                    ctx.strokeStyle = 'red';
                    ctx.stroke();
                    ctx.restore();

                    // Отображаем значение на вертикальной линии
                    ctx.font = '12px Arial';
                    ctx.fillStyle = 'red';
                    ctx.fillText('Value: ' + 10, x + 10, topY + 20);
                }
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