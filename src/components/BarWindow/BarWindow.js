import './BarWindow.css'
import {useEffect, useState} from "react";
import axios from "axios";
import {Bar} from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';


ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const BarWindow = ({name}) => {
    const isMobile = window.innerWidth < 768
    const modes = ["1M", "3M", "6M", "1Y", "2Y", "5Y", "10Y"]
    const colors = ["#FF6384", "#36A2EB", "#FFCE56", "#FFAA00", "#FF00AA", "#00FFAA", "#AA00FF"]
    const [mode, setMode] = useState("1mo")
    const [modesSelected, setModesSelected] = useState(modes[0])
    const [barData, setBarData] = useState([])
    const [labels, setLabels] = useState([])
    const [emitents, setEmitents] = useState([])



    const changeMode = (elem) => {
        setModesSelected(elem)
        const res = elem.replace("M", "mo").replace("Y", 'y')
        setMode(res)
    }

    useEffect(() => {
            axios({
                method: 'post',
                url: "/api/get_bar_data",
                data: {
                    mode: mode,
                    portfolio: name
                },
                headers: {
                    "Access-Control-Allow-Origin": "*"
                }
            }).then(data => {
                setBarData(data.data.data.y)
                setLabels(data.data.data.x)
                setEmitents(data.data.data.emitents)
            })
    }, [mode])

    return (
        <div className={`bar-window`}>
            <div className={"bar-nav"}>
                {modes.map((elem, i) => {
                    return <p key={i}
                              className={`graph-nav-elem ${elem === modesSelected ? 'active' : ''}`}
                              onClick={e => changeMode(e.target.textContent)}>{elem}</p>
                })}
            </div>
            <Bar data={{
                labels: labels,
                datasets: barData.map((elem, i) => {
                    console.log(elem)
                    return {
                        label: `${emitents[i]}`,
                        data: elem,
                        backgroundColor: colors[i],
                    }
                })
            }}
            options={{
                responsive: true,
                aspectRatio: isMobile ? 0.8 : 1.5,
                scales: {
                    x: {
                        stacked: true,
                    },
                    y: {
                        stacked: true,
                        ticks: {
                            callback: (value) => `${value * 100}%`,
                        },
                    },
                },
                plugins: {
                    legend: {
                        position: 'bottom',
                    }
                }
            }}/>
        </div>
    )
}

export default BarWindow