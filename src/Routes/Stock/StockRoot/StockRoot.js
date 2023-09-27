import './StockRoot.css'
import Container from "../../../components/Container/Container";
import Select from "../../../components/Select/Select";
import {useEffect, useState} from "react";
import axios from "axios";
import Document from "../../../components/Document/Document";
import Portfolio from "../../../components/Portfolio/Portfolio";
import News from "../../../components/News/News";
import {Link} from "react-router-dom";
import GraphWindow from "../../../components/GraphWindow/GraphWindow";
import BarWindow from "../../../components/BarWindow/BarWindow";

const StockRoot = ({name}) => {
    const [indexType, setIndexType] = useState("Vanilla")
    const [publicPortfolio, setPublicPortfolio] = useState("")
    const [isPreviousDataExist, setIsPreviousDataExist] = useState(false)
    const [isDataExist, setIsDataExist] = useState(true)
    const [isExistIndex, setIsExistIndex] = useState(true)
    const [loadingGraph, setLoadingGraph] = useState(false)
    const [stocks, setStocks] = useState([])
    const [selected, setSelected] = useState(name.toUpperCase())
    const [filter, setFilter] = useState("goog")
    const [result, setResult] = useState([])
    const [formattedDescription, setFormattedDescription] = useState("")
    const [isHiddenExpired, setIsHiddenExpired] = useState(false)

    const [mode, setMode] = useState("1mo")
    const [title, setTitle] = useState("")
    const [about, setAbout] = useState("")
    const [documents, setDocuments] = useState({
        current: [],
        expired: []
    })
    const [option, setOption] = useState(0)
    const [specialData, setSpecialData] = useState({
        description: ""
    })
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
    }, [filter, stocks])
    useEffect(() => {
        axios(`/api/get_all_portfolio`, {
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        })
            .then(data => {
                setStocks(data.data.map(elem => elem.text))
                setFilter("")
            })
    }, [name])
    const [graphDataX, setGraphDataX] = useState([])
    const [graphDataY, setGraphDataY] = useState([])
    useEffect(() => {
        setLoadingGraph(true)
        axios(`/api/get_portfolio_graph`, {
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
                console.log(data.data)
                if (data.data.code === 0) {
                    setIsPreviousDataExist(true)
                    setIsDataExist(true)
                    setGraphDataX(data.data.costs)
                    setGraphDataY(data.data.labels)
                    setAbout(data.data.about)
                    setDocuments(data.data.document)
                    setOption(0)
                    setMetrics(data.data.metrics)
                } else if (data.data.code === 1) {
                    setIsPreviousDataExist(false)
                    setIsDataExist(true)
                    setGraphDataX(data.data.costs)
                    setGraphDataY(data.data.labels)
                    setAbout(data.data.about)
                    setDocuments(data.data.document)
                    setOption(0)
                    setMetrics(data.data.metrics)
                } else {
                    setIsPreviousDataExist(false)
                    setIsDataExist(false)
                }

            })
            .finally(() => {
                setLoadingGraph(false)
            })
        axios(`/api/get_data_detail`, {
            data: {
                portfolio: name
            },
            headers: {
                "Access-Control-Allow-Origin": "*"
            },
            method: "POST"
        })
            .then(data => {
                const tmp = data.data
                tmp.description = tmp.description.replaceAll("\n", "<br>")
                setFormattedDescription(tmp.description)
                setSpecialData(tmp)
                if (data.data.code === 0) {
                    console.log(data.data)
                    setPublicPortfolio(data.data.public_portfolio)
                    setTitle(data.data.title)
                    setIndexType(data.data.type)
                    setIsExistIndex(true)
                } else {
                    setIsExistIndex(false)
                }
            })
    }, [mode, name])
    useEffect(() => {
        axios(`/api/all_news`, {
            data: {portfolio: name},
            headers: {
                "Access-Control-Allow-Origin": "*"
            },
            method: "POST"
        })
            .then(data => {
                setNews(data.data.news)
            })
    }, [])


    if (isExistIndex === true) {
        return (
            <main>
                <Container>
                    <div className={`root_stock`}>
                        <div className={`root_stock-selection`}>
                            <div className={'root_stock-select'}>
                                {indexType === "AMC"
                                    ? <></>
                                    : <Select values={result} filter={filter} setSearch={setFilter} selected={selected}
                                              setSelected={(elem) => setSelected(elem)}/>
                                }
                                <p className={'root_stock-title'}>{title}</p>
                            </div>
                        </div>
                        <div className={"root_stock-main"}>
                            {isDataExist === true
                                ? <div>
                                    {indexType === "AMC"
                                        ? <div>
                                            <BarWindow name={name}/>
                                        </div>

                                        : <GraphWindow
                                            graphDataX={graphDataX}
                                            graphDataY={graphDataY}
                                            loadingGraph={loadingGraph}
                                            metrics={metrics}
                                            mode={mode}
                                            setMode={setMode}
                                        />
                                    }
                                </div>

                                : <div className={"root_stock-main"}>
                                    <h3 className={"not_enough_data"}>Данных для индекса пока нет</h3>
                                </div>
                            }

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
                                    {indexType !== "AMC" &&
                                        <div>
                                            {documents.current.length !== 0 && documents.expired.length !== 0 &&
                                                <div
                                                    onClick={() => setOption(2)}
                                                    className={`root_stock-option-btn documents ${option === 2 ? "active" : ""}`}>
                                                    Документы
                                                </div>
                                            }
                                        </div>
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
                                            {indexType === "AMC"
                                                ? <></>
                                                : <div className={"description-row"}>
                                                    <div className={"description-key"}>ISIN</div>
                                                    <div className={"description-value"}>{specialData.isin}</div>
                                                </div>

                                            }
                                            {indexType === "AMC"
                                                ? <></>
                                                : <div className={"description-row"}>
                                                    <div className={"description-key"}>Тикер</div>
                                                    <div className={"description-value"}>{name.toUpperCase()}</div>
                                                </div>

                                            }

                                            <div className={"description-row"}>
                                                <div className={"description-key"}>Начало расчета</div>
                                                <div className={"description-value"}>{specialData.date}</div>
                                            </div>
                                        </div>
                                        {/*<div className={"description-row"}>*/}
                                        {/*    <div className={"description-key"}>Описание</div>*/}
                                        {/*    <div className={"description-value"}>{specialData.description}</div>*/}
                                        {/*</div>*/}
                                        <div className={'description-about'}
                                             dangerouslySetInnerHTML={{__html: formattedDescription}}/>
                                        {publicPortfolio !== ""
                                            ? <Link to={`/${publicPortfolio}`}>Перейти в Публичный портфель</Link>
                                            : <></>
                                        }

                                    </div>
                                    : option === 1
                                        ? <Portfolio name={name}/>
                                        : option === 2
                                            ? <>
                                                <div className={"documents-block"}>
                                                    {documents.current.map((elem, i) => (
                                                            <Document key={i} elem={elem} name={name}/>
                                                        )
                                                    )}
                                                </div>
                                                <div onClick={() => setIsHiddenExpired(!isHiddenExpired)}>
                                                    {isHiddenExpired === false
                                                        ? <div className={"documents-expired-btn"}>Show expired documents</div>
                                                        : <div className={"documents-expired-btn"}>Hidden expired documents</div>
                                                    }
                                                </div>
                                                <div className={"documents-block"} style={
                                                    {display: isHiddenExpired === false ? "none" : "block"}
                                                }>
                                                    {documents.expired.map((elem, i) => (
                                                            <Document key={i} elem={elem} name={name}/>
                                                        )
                                                    )}
                                                </div>
                                            </>
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
    } else {
        return (
            <main>
                <Container>
                    <h3 className={"index_doesnt_exist"}>Индекса {specialData.name} не существует
                    </h3>
                    <Link to={'/'} className={"index_doesnt_exist_link"}>Вернуться на главную</Link>
                </Container>
            </main>
        )
    }

}

export default StockRoot