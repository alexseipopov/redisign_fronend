import './StockRoot.css'
import Container from "../../../components/Container/Container";
import Select from "../../../components/Select/Select";
import {useEffect, useState} from "react";
import upgrade from './../../../static/upgrade.svg'
import downgrade from './../../../static/upgrade.svg'
import Graph from "../../../components/Graph/Graph";

const StockRoot = () => {
    const [tmp_stocks, set_tmp_stocks] = useState(["TSLA", "GOOG", "AMZN", "SBER", "LKOH", "YNDX"])
    const [tt, setTt] = useState(tmp_stocks[0])
    const [filter, setFilter] = useState("")
    const [result, setResult] = useState([])
    useEffect(() => {
        setResult(tmp_stocks.filter(elem => elem.includes(filter.toUpperCase())))
    }, [filter])
    return (
        <main>
            <Container>
                <div className={`root_stock`}>
                    <div className={`root_stock-selection`}>
                        {/*TODO тут будет переменная из запроса*/}
                        <div className={'root_stock-select'}>
                            <p className={'root_stock-title'}>Tesla Index</p>
                            <Select values={result} filter={filter} setSearch={setFilter} selected={tt}
                                    setSelected={(elem) => setTt(elem)}/>
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
                                    Navigate
                                </div>
                            </div>
                            <div className={"graph"}>
                                <Graph mode={"1mo"} chart_id={"goog"}/>
                            </div>
                        </div>
                        <div className={"root_stock-summary"}>
                            <div className={'summary-wrapper'}>
                                <div className={"summary"}>

                                </div>
                            </div>
                        </div>
                        <div className={"root_stock-description"}>
                            <div className={"root_stock-option"}>
                                <div className={"root_stock-option-btn description"}>Описание</div>
                                <div className={"root_stock-option-btn documents"}>Документы</div>
                            </div>
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
                                <div className={"description-about"} >
                                    Tesla Inc. проектирует, производит и продает электромобили и компоненты силовых агрегатов электромобилей. Компания владеет сбытовой и сервисной сетью и продает компоненты для электрических силовых агрегатов другим производителям автомобилей. Tesla обслуживает клиентов по всему миру.
                                </div>
                            </div>


                        </div>
                    </div>
                </div>
            </Container>
        </main>
    )
}

export default StockRoot