import './StockRoot.css'
import Container from "../../../components/Container/Container";
import Select from "../../../components/Select/Select";
import {useEffect, useState} from "react";
import upgrade from './../../../static/upgrade.svg'
import downgrade from './../../../static/downgrade.svg'
import Graph from "../../../components/Graph/Graph";
import axios from "axios";
import Document from "../../../components/Document/Document";
import Loader from "../../../components/Loader/Loader";

const StockRoot = ({id}) => {
    const [loadingGraph, setLoadingGraph] = useState(false)
    const [stocks, setStocks] = useState([])
    const [selected, setSelected] = useState(id.toUpperCase())
    const [filter, setFilter] = useState("goog")
    const [result, setResult] = useState([])
    const modes = ["1M", "3M", "6M", "1Y", "2Y", "5Y", "10Y"]
    const [modesSelected, setModesSelected] = useState(modes[0])
    const [mode, setMode] = useState("1mo")
    const [title, setTitle] = useState("")
    const [about, setAbout] = useState("")
    const [documents, setDocuments] = useState([])
    const [option, setOption] = useState(0)
    const [metrics, setMetrics] = useState({})

    useEffect(() => {
        setResult(stocks.filter(elem => elem.includes(filter.toUpperCase())))
        console.log('here')
    }, [filter, stocks])
    useEffect(() => {
        axios("/api/get_all_index")
            .then(data => {
                setStocks(data.data.map(elem => elem.text))
                data.data.map(elem => {
                    if (elem.text === id.toUpperCase()) {
                        console.log("===", elem)
                        setTitle(elem.title)
                    }
                    return undefined
                })
                setFilter("")
            })
    }, [id])
    const [graphDataX, setGraphDataX] = useState([])
    const [graphDataY, setGraphDataY] = useState([])
    useEffect(() => {
        setLoadingGraph(true)
        console.log("chart", id)
        axios(`/api/${id}_${mode}`)
            .then(data => {
                setGraphDataX(data.data.costs)
                setGraphDataY(data.data.labels)
                setAbout(data.data.about)
                setDocuments(data.data.document)
                setOption(0)
                setMetrics(data.data.metrics)
                console.log("?", data.data)
            })
            .finally(() => {
                setLoadingGraph(false)
            })
    }, [mode, id])
    const changeMode = (elem) => {
        setModesSelected(elem)
        const res = elem.replace("M", "mo").replace("Y", 'y')
        setMode(res)
    }
    let i = 0
    return (
        <main>
            <Container>
                <div className={`root_stock`}>
                    <div className={`root_stock-selection`}>
                        {/*TODO тут будет переменная из запроса*/}
                        <div className={'root_stock-select'}>
                            <p className={'root_stock-title'}>{title}</p>
                            <Select values={result} filter={filter} setSearch={setFilter} selected={selected}
                                    setSelected={(elem) => setSelected(elem)}/>
                        </div>
                    </div>
                    <div className={"root_stock-main"}>
                        <div className={"root_stock-graph"}>
                            <div className={"graph-stat"}>
                                <div className={"graph-short-summary"}>
                                    <div className={"graph-last_date"}>
                                        Последнее значение <span>{metrics.last_date}</span>
                                    </div>
                                    <div className={"graph-price-block"}>
                                        <div className={"graph-price"}>
                                            {metrics.level}
                                        </div>
                                        <div className={`graph-dynamic ${(metrics.level - metrics.prev_level).toFixed(2) > 0
                                        ? ""
                                        : "downgrade"
                                        }`}>
                                            <img src={
                                                (metrics.level - metrics.prev_level).toFixed(2) > 0
                                                    ? upgrade
                                                    : downgrade
                                            } alt={"upgrade"}/>
                                            {Math.abs(metrics.level - metrics.prev_level).toFixed(2)} ({metrics.last_delta}%)
                                        </div>
                                    </div>
                                </div>
                                <div className={"graph-nav"}>
                                    {modes.map((elem) => {
                                        i++
                                        return <p key={i} className={`graph-nav-elem ${elem === modesSelected ? 'active' : ''}`}
                                           onClick={e => changeMode(e.target.textContent)}>{elem}</p>
                                    })}
                                </div>
                            </div>
                            <div className={"graph"}>
                                {loadingGraph ? <div className={"graph-loader"}><Loader /></div> : <></>}
                                <Graph y={graphDataX} x={graphDataY}/>
                            </div>
                        </div>
                        <div className={"root_stock-summary"}>
                            <div className={'summary-wrapper'}>
                                <div className={"summary"}>
                                    <div className={'summary-row'}>
                                        <div className={"summary-title"}>Предыдущее значение ({metrics.prev_date})</div>
                                        <div className={"summary-value"}>{metrics.prev_level}</div>
                                    </div>
                                    <div className={'summary-row'}>
                                        <div className={"summary-title"}>Изменение за неделю</div>
                                        <div className={`summary-value stonks ${metrics.week_delta_val > 0 ? "" : "downgrade"}`}><img src={
                                            metrics.week_delta_val > 0
                                                ? upgrade
                                                : downgrade
                                        } alt={"stonks"}/>{Math.abs(metrics.week_delta_val)}
                                            ({metrics.week_delta}%)
                                        </div>
                                    </div>
                                    <div className={'summary-row'}>
                                        <div className={"summary-title"}>Изменение с начала года</div>
                                        <div className={"summary-value stonks"}><img src={
                                            metrics.year_delta_val > 0
                                                ? upgrade
                                                : downgrade
                                        } alt={"stonks"}/>{Math.abs(metrics.year_delta_val)}
                                            ({metrics.year_delta}%)
                                        </div>
                                    </div>
                                    <div className={'summary-row'}>
                                        <div className={"summary-title"}>Максимум за последний год ({metrics.last_year})</div>
                                        <div className={"summary-value"}>{metrics.max_level}</div>
                                    </div>
                                    <div className={'summary-row'}>
                                        <div className={"summary-title"}>Минимум за последний год ({metrics.last_year})</div>
                                        <div className={"summary-value"}>{metrics.min_level}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={"root_stock-description"}>
                            {documents.length === 0
                                ? <div className={"solo-option"}>
                                    Описание
                                </div>
                                :
                                <div className={"root_stock-option"}>
                                    <div
                                        onClick={() => setOption(0)}
                                        className={`root_stock-option-btn description ${option === 0 ? "active" : ""}`}>
                                        Описание
                                    </div>
                                    <div
                                        onClick={() => setOption(1)}
                                        className={`root_stock-option-btn documents ${option === 1 ? "active" : ""}`}>
                                        Документы
                                    </div>
                                </div>
                            }
                            {option === 0 ?
                                <div className={"description-details"}>
                                    <div className={"description-fields"}>
                                        <div className={"description-row"}>
                                            <div className={"description-key"}>Начало расчета</div>
                                            <div className={"description-value"}>04.04.2022</div>
                                        </div>
                                        <div className={"description-row"}>
                                            <div className={"description-key"}>Начало расчета</div>
                                            <div className={"description-value"}>04.04.2022</div>
                                        </div>
                                        <div className={"description-row"}>
                                            <div className={"description-key"}>Начало расчета</div>
                                            <div className={"description-value"}>04.04.2022</div>
                                        </div>
                                        <div className={"description-row"}>
                                            <div className={"description-key"}>Начало расчета</div>
                                            <div className={"description-value"}>04.04.2022</div>
                                        </div>
                                    </div>
                                    <div className={"description-about"}>
                                        {about}
                                    </div>
                                </div>
                                :
                                <div className={"documents-block"}>
                                    {documents.map(elem => (
                                            <Document elem={elem} id={id}/>
                                        )
                                    )}
                                </div>
                            }


                        </div>
                    </div>
                </div>
            </Container>
        </main>
    )
}

export default StockRoot