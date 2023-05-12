import './StockRoot.css'
import Container from "../../../components/Container/Container";
import Select from "../../../components/Select/Select";
import {useEffect, useState} from "react";
import upgrade from './../../../static/upgrade.svg'
import downgrade from './../../../static/upgrade.svg'
import Graph from "../../../components/Graph/Graph";
import axios from "axios";
import Document from "../../../components/Document/Document";

const StockRoot = ({id}) => {
    const [stocks, setStocks] = useState([])
    const [selected, setSelected] = useState(id.toUpperCase())
    const [filter, setFilter] = useState("goog")
    const [result, setResult] = useState([])
    const [modes, setModes] = useState(["1M", "3M", "6M", "1Y", "2Y", "5Y", "10Y"])
    const [modesSelected, setModesSelected] = useState(modes[0])
    const [mode, setMode] = useState("1mo")
    const [title, setTitle] = useState("")
    const [about, setAbout] = useState("")
    const [documents, setDocuments] = useState([])
    const [option, setOption] = useState(0)

    useEffect(() => {
        setResult(stocks.filter(elem => elem.includes(filter.toUpperCase())))
        console.log('here')
    }, [filter])
    useEffect(() => {
        axios("http://localhost:3010/api/get_all_index")
            .then(data => {
                setStocks(data.data.map(elem => elem.text))
                data.data.map(elem => {
                    if (elem.text === id.toUpperCase()) {
                        console.log("===", elem)
                        setTitle(elem.title)
                    }
                })
                setFilter("")
            })
    }, [id])
    const [graphDataX, setGraphDataX] = useState([])
    const [graphDataY, setGraphDataY] = useState([])
    useEffect(() => {
        console.log("chart", id)
        axios(`http://localhost:3010/api/${id}_${mode}`)
            .then(data => {
                setGraphDataX(data.data.costs)
                setGraphDataY(data.data.labels)
                setAbout(data.data.about)
                setDocuments(data.data.document)
                setOption(0)
                console.log("?", data.data)
            })
    }, [mode, id])
    const changeMode = (elem) => {
        setModesSelected(elem)
        const res = elem.replace("M", "mo").replace("Y", 'y')
        setMode(res)
    }
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
                                        Последнее значение <span>12.04.2012</span>
                                    </div>
                                    <div className={"graph-price-block"}>
                                        <div className={"graph-price"}>
                                            141,49
                                        </div>
                                        <div className={"graph-dynamic"}>
                                            <img src={upgrade} alt={"upgrade"}/>
                                            0.45 (0.32%)
                                        </div>
                                    </div>
                                </div>
                                <div className={"graph-nav"}>
                                    {modes.map(elem => (
                                        <p className={`graph-nav-elem ${elem === modesSelected ? 'active' : ''}`}
                                           onClick={e => changeMode(e.target.textContent)}>{elem}</p>
                                    ))}
                                </div>
                            </div>
                            <div className={"graph"}>
                                <Graph y={graphDataX} x={graphDataY}/>
                            </div>
                        </div>
                        <div className={"root_stock-summary"}>
                            <div className={'summary-wrapper'}>
                                <div className={"summary"}>
                                    <div className={'summary-row'}>
                                        <div className={"summary-title"}>Предыдущее значение (04.04.2023)</div>
                                        <div className={"summary-value"}>141.49</div>
                                    </div>
                                    <div className={'summary-row'}>
                                        <div className={"summary-title"}>Изменение за неделю</div>
                                        <div className={"summary-value stonks"}><img src={upgrade} alt={"stonks"}/>0.45
                                            (0.32%)
                                        </div>
                                    </div>
                                    <div className={'summary-row'}>
                                        <div className={"summary-title"}>Изменение с начала года</div>
                                        <div className={"summary-value stonks"}><img src={upgrade} alt={"stonks"}/>0.45
                                            (0.32%)
                                        </div>
                                    </div>
                                    <div className={'summary-row'}>
                                        <div className={"summary-title"}>Максимум за последний год (04.04.2023)</div>
                                        <div className={"summary-value"}>141.49</div>
                                    </div>
                                    <div className={'summary-row'}>
                                        <div className={"summary-title"}>Минимум за последний год (04.04.2023)</div>
                                        <div className={"summary-value"}>141.49</div>
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