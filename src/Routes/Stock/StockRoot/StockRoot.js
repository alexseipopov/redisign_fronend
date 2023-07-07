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
import Portfolio from "../../../components/Portfolio/Portfolio";
import News from "../../../components/News/News";

const StockRoot = ({name}) => {
    const modes = ["1M", "3M", "6M", "1Y", "2Y", "5Y", "10Y"]

    const [loadingGraph, setLoadingGraph] = useState(false)
    const [stocks, setStocks] = useState([])
    const [selected, setSelected] = useState(name.toUpperCase())
    const [filter, setFilter] = useState("goog")
    const [result, setResult] = useState([])
    const [modesSelected, setModesSelected] = useState(modes[0])
    const [mode, setMode] = useState("1mo")
    const [title, setTitle] = useState("")
    const [about, setAbout] = useState("")
    const [documents, setDocuments] = useState([])
    const [option, setOption] = useState(0)
    const [specialData, setSpecialData] = useState({})
    const [news, setNews] = useState([])
    const [metrics, setMetrics] = useState({
        level: "",
        last_date: "",
        prev_level: "",
        last_delta: "",
        prev_date: "",
        week_delta_val: "",
        year_delta_val: "",
        year_delta: "",
        max_level: "",
        min_level: "",
        min_date: "00.00.0000",
        max_date: "00.00.0000",

        last_value: {
            value: "",
            date: "00.00.0000"
        },
        previous_value: {
            value: "",
            date: "",
            delta: "",
            delta_percent: ""
        },
        last_week: {
            value: "",
            delta_percent: ""
        },
        last_year: {
            value: "",
            delta_percent: ""
        },
        min_year: {
            value: "",
            date: "00.00.0000"
        },
        max_year: {
            value: "",
            date: "00.00.0000"
        }
    })

    useEffect(() => {
        setResult(stocks.filter(elem => elem.includes(filter.toUpperCase())))
        console.log('here')
    }, [filter, stocks])
    useEffect(() => {
        axios(`https://admin.index.rumtechdemo.ru/api/get_all_portfolio`, {
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        })
            .then(data => {
                setStocks(data.data.map(elem => elem.text))
                data.data.map(elem => {
                    if (elem.text === name.toUpperCase()) {
                        console.log("===", elem)
                        setTitle(elem.title)
                    }
                    return undefined
                })
                setFilter("")
            })
    }, [name])
    console.warn(title)
    const [graphDataX, setGraphDataX] = useState([])
    const [graphDataY, setGraphDataY] = useState([])
    useEffect(() => {
        setLoadingGraph(true)
        console.log("chart", name)
        axios(`https://admin.index.rumtechdemo.ru/api/get_portfolio_graph`, {
            data: {
                portfolio: name,
                interval: mode
            },
            headers: {
                "Access-Control-Allow-Origin": "*"
            },
            method: "POST"
        })
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
        axios(`https://admin.index.rumtechdemo.ru/api/get_data_detail`, {
            data: {
                portfolio: name
            },
            headers: {
                "Access-Control-Allow-Origin": "*"
            },
            method: "POST"
        })
            .then(data => {
                setSpecialData(data.data)
            })
    }, [mode, name])
    useEffect(() => {
        axios(`https://admin.index.rumtechdemo.ru/api/all_news`, {
            data: {portfolio: name},
            headers: {
                "Access-Control-Allow-Origin": "*"
            },
            method: "POST"
        })
            .then(data => {
                console.warn(data.data)
                setNews(data.data.news)
            })
    }, [])
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
                            <Select values={result} filter={filter} setSearch={setFilter} selected={selected}
                                    setSelected={(elem) => setSelected(elem)}/>
                            <p className={'root_stock-title'}>{title}</p>

                        </div>
                    </div>
                    <div className={"root_stock-main"}>
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
                                        <div className={"summary-value"}>{metrics.previous_value.value}</div>
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
                        <div className={"root_stock-description"}>
                            <div className={"root_stock-option"}>
                                <div
                                    onClick={() => setOption(0)}
                                    className={`root_stock-option-btn description ${option === 0 ? "active" : ""}`}>
                                    Описание
                                </div>
                                <div
                                    onClick={() => setOption(1)}
                                    className={`root_stock-option-btn documents ${option === 1 ? "active" : ""}`}>
                                    Состав Портфеля
                                </div>
                                {documents.length !== 0
                                    ? <div
                                        onClick={() => setOption(2)}
                                        className={`root_stock-option-btn documents ${option === 2 ? "active" : ""}`}>
                                        Документы
                                    </div>
                                    : <></>
                                }
                                {news.length !== 0
                                    ? <div
                                        onClick={() => setOption(3)}
                                        className={`root_stock-option-btn documents ${option === 3 ? "active" : ""}`}>
                                        Новости
                                    </div>
                                    : <></>
                                }
                            </div>

                            {option === 0 ?
                                <div className={"description-details"}>
                                    <div className={"description-fields"}>
                                        <div className={"description-row"}>
                                            <div className={"description-key"}>Название</div>
                                            <div className={"description-value"}>{title}</div>
                                        </div>
                                        <div className={"description-row"}>
                                            <div className={"description-key"}>ISIN</div>
                                            <div className={"description-value"}>{specialData.isin}</div>
                                        </div>
                                        <div className={"description-row"}>
                                            <div className={"description-key"}>Тикер</div>
                                            <div className={"description-value"}>{name.toUpperCase()}</div>
                                        </div>
                                        <div className={"description-row"}>
                                            <div className={"description-key"}>Начало расчета</div>
                                            <div className={"description-value"}>{specialData.date}</div>
                                        </div>
                                    </div>
                                    {/*<div className={"description-row"}>*/}
                                    {/*    <div className={"description-key"}>Описание</div>*/}
                                    {/*    <div className={"description-value"}>{specialData.description}</div>*/}
                                    {/*</div>*/}
                                    <div className={"description-about"}>
                                        {specialData.description}
                                    </div>
                                </div>
                                : option === 1
                                    ? <Portfolio name={name}/>
                                    : option === 2
                                        ? <div className={"documents-block"}>
                                            {documents.map(elem => (
                                                    <Document elem={elem} name={name}/>
                                                )
                                            )}
                                        </div>
                                        : <div className={"news-block"}>
                                            {news.map((elem, i) => (
                                                    <News key={i} news={elem}/>
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