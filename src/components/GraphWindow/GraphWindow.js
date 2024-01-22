import './GraphWindow.css'
import upgrade from "../../static/upgrade.svg";
import downgrade from "../../static/downgrade.svg";
import Loader from "../Loader/Loader";
import Graph from "../Graph/Graph";
import Portfolio from "../Portfolio/Portfolio";
import Document from "../Document/Document";
import News from "../News/News";
import {useState} from "react";

const GraphWindow = ({graphDataX, graphDataY, loadingGraph, metrics, mode ,setMode}) => {
    const modes = ["1M", "3M", "6M", "1Y", "2Y", "5Y", "10Y"]
    const [modesSelected, setModesSelected] = useState(modes[3])

    const changeMode = (elem) => {
        setModesSelected(elem)
        const res = elem.replace("M", "mo").replace("Y", 'y')
        setMode(res)
    }
    let i = 0
    return (
        <div>
            <div className={"root_stock-graph"}>
                <div className={"graph-stat"}>
                    <div className={"graph-short-summary"}>
                        <div className={"graph-last_date"}>
                            Последнее значение <span>{metrics.last_value.date}</span>
                        </div>
                        <div className={"graph-price-block"}>
                            <div className={"graph-price"}>
                                {metrics.last_value.value}
                            </div>
                            <div
                                className={`graph-dynamic ${Number(metrics.previous_value.delta).toFixed(2) > 0
                                    ? ""
                                    : "downgrade"
                                }`}>
                                <img src={
                                    Number(metrics.previous_value.delta).toFixed(2) > 0
                                        ? upgrade
                                        : downgrade
                                } alt={"upgrade"}/>
                                {Math.abs(Number(metrics.previous_value.delta)).toFixed(2)} ({Number(metrics.previous_value.delta_percent).toFixed(2)}%)
                            </div>
                        </div>


                    </div>
                    <div className={"graph-nav"}>
                        {modes.map((elem) => {
                            i++
                            return <p key={i}
                                      className={`graph-nav-elem ${elem === modesSelected ? 'active' : ''}`}
                                      onClick={e => changeMode(e.target.textContent)}>{elem}</p>
                        })}
                    </div>
                </div>
                <div className={"graph"}>
                    {loadingGraph ? <div className={"graph-loader"}><Loader/></div> : <></>}
                    <Graph y={graphDataX} x={graphDataY}/>
                </div>
            </div>
            <div className={"root_stock-summary"}>
                <div className={'summary-wrapper'}>
                    <div className={"summary"}>
                        <div className={'summary-row'}>
                            <div className={"summary-title"}>Предыдущее значение
                                ({metrics.previous_value.date})
                            </div>
                            <div
                                className={"summary-value"}>{metrics.previous_value.value}</div>
                        </div>
                        <div className={'summary-row'}>
                            <div className={"summary-title"}>Изменение за неделю</div>
                            <div
                                className={`summary-value stonks ${Number(metrics.last_week.delta_percent) > 0 ? "" : "downgrade"}`}>
                                <img src={
                                    Number(metrics.last_week.delta_percent) > 0
                                        ? upgrade
                                        : downgrade
                                } alt={"stonks"}/>{Math.abs(Number(metrics.last_week.value))}
                                ({Number(metrics.last_week.delta_percent).toFixed(2)}%)
                            </div>
                        </div>
                        <div className={'summary-row'}>
                            <div className={"summary-title"}>Изменение с начала года</div>
                            <div
                                className={`summary-value stonks ${Number(metrics.last_year.delta) > 0 ? "" : "downgrade"}`}>
                                <img src={
                                    Number(metrics.last_year.delta) > 0
                                        ? upgrade
                                        : downgrade
                                } alt={"stonks"}/>{Math.abs(Number(metrics.last_year.delta))}
                                ({Number(metrics.last_year.delta_percent).toFixed(2)}%)
                            </div>
                        </div>
                        <div className={'summary-row'}>
                            <div className={"summary-title"}>Максимум за последний год
                                ({metrics.max_year.date})
                            </div>
                            <div className={"summary-value"}>{metrics.max_year.value}</div>
                        </div>
                        <div className={'summary-row'}>
                            <div className={"summary-title"}>Минимум за последний год
                                ({metrics.min_year.date})
                            </div>
                            <div className={"summary-value"}>{metrics.min_year.value}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GraphWindow