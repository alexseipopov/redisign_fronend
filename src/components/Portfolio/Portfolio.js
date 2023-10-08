import './Portfolio.css'
import {useEffect, useState} from "react";
import axios from "axios";
import Plot from 'react-plotly.js'

const Portfolio = ({name}) => {
    const [isExist, setIsExist] = useState(true)
    const [data, setData] = useState([])
    const [pieData, setPieData] = useState({})
    const [weightPieData, setWeightPieData] = useState({})
    const [date, setDate] = useState(new Date().toISOString().slice(0, 10))
    const [pieGraph, setPieGraph] = useState(700)
    const [onload, setOnload] = useState(false)
    const [isMobile, setIsMobile] = useState(false)
    useEffect(() => {
        axios(`/api/get_product_data`, {
            data: {
                "portfolio": name,
                "date": date
            },
            method: "POST"
        }).then(resp => {
            if (resp.data.code === 0) {
                setData(resp.data.data)
                setPieData(resp.data.type_pie)
                setWeightPieData(resp.data.weight_pie)
                setIsExist(true)
            } else {
                setIsExist(false)
            }
            setIsMobile(window.innerWidth < 768)
        })
    }, [date])
    useEffect(() => {
        setPieGraph(document.querySelector(".pie-graphs").offsetWidth)
    }, [onload])

    if (document.querySelector(".pie-graphs") && onload === false) {
        setOnload(true)
    }

    const valuePie = []
    const labelPie = []
    for (let key in pieData) {
        labelPie.push(key)
        valuePie.push(pieData[key])
    }

    const valueWightPie = []
    const labelWightPie = []
    for (let key in weightPieData) {
        labelWightPie.push(key)
        valueWightPie.push(weightPieData[key])
    }

    const pie1 = [
        {
            values: valuePie,
            labels: labelPie,
            hole: isMobile ? .73 : .75,
            type: 'pie',
            domain: {column: 0},
            marker: {
                colors: ["#7086E3", "#58CCB0", "#E8743B", "#93BFEB", "#F2CC68", "#ADBCC3"],
            },
            textinfo: 'none',
            hoverinfo: "label+percent",
        }
    ]
    const pie2 = [
        {
            values: valueWightPie,
            labels: labelWightPie,
            hole: isMobile ? .73 : .75,
            type: 'pie',
            domain: {column: 0},
            marker: {
                colors: ["#7086E3", "#58CCB0", "#E8743B", "#93BFEB", "#F2CC68", "#ADBCC3"]
            },
            hoverinfo: "label+percent",
            textinfo: 'none'
        }
    ]
    const layout1 = {
        margin: {
            l: isMobile ? 15 : 50,
            r: isMobile ? 15 : 50,
            t: 70,
            b: 0
        },
        title: {
            text: 'Виды активов',
            // pad: {
            //     b: 50,
            //     t: 50
            // }
        },
        // annotations: [{
        //     text: "ann1\nann2",
        //     showarrow: false,
        //     font: {
        //         size: 16
        //     },
        //     x: .25,
        //     y: .5
        // },],
        // height: "100%",
        width: pieGraph / 2,
        height: pieGraph * 1.15 / 2,
        // textposition: 'outside',
        showlegend: false,
        // grid: {rows: 1, columns: 1}
    }
    const layout2 = {
        margin: {
            l: isMobile ? 15 : 50,
            r: isMobile ? 15 : 50,
            t: 70,
            b: 0
        },
        title: 'Веса',
        // annotations: [{
        //     text: "ann1\nann2",
        //     showarrow: false,
        //     font: {
        //         size: 16
        //     },
        //     x: .25,
        //     y: .5
        // },],
        // height: 400,
        width: pieGraph / 2,
        height: pieGraph * 1.15 / 2,
        // textposition: 'outside',
        showlegend: false,
        autosize: true,
        automargin: true,
        // grid: {rows: 1, columns: 1}
    }
    if (isExist === true) {
        return (
            <div className={`portfolio`}>
                <input className={`portfolio-date`} type="date" value={date} onChange={e => setDate(e.target.value)}/>
                <div className={`pie-graphs`}>
                    <div className="pie-graph">
                        <Plot data={pie1} layout={layout1} config={{
                            displayModeBar: false,
                        }}/>
                    </div>
                    <div className="pie-graph">
                        <Plot data={pie2} layout={layout2} config={{
                            displayModeBar: false,
                        }}/>
                    </div>
                </div>
                <div className="portfolio-table-wrapper">
                    <div className={"portfolio-table"}>
                        <div className={`portfolio-table_header`}>
                            <div className={"table__type"}>Тип</div>
                            <div className={"table__isin"}>ISIN</div>
                            <div className={"table__emitent"}>Эмитент</div>
                            <div className={"table__amount"}>Кол-во, шт</div>
                            <div className={"table__price"}>Стоимость</div>
                            <div className={"table__cost"}>Рыночная цена</div>
                            <div className={"table__weight"}>Вес, %</div>
                        </div>
                        {data.map((el, i) => (
                            <div key={i} className={`portfolio-table_row`}>
                                <div className={"table__type"}>{el.type}</div>
                                <div className={"table__isin"}>{el.isin}</div>
                                <div className={"table__emitent"}>{el.emitent}</div>
                                <div className={"table__amount"}>{el.amount}</div>
                                <div className={"table__cost"}>{el.cost}</div>
                                <div className={"table__price"}>{el.price}</div>
                                <div className={"table__weight"}>{(Number(el.weight) * 100).toFixed(2)}</div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        )
    } else {
        return (
            <div className={`portfolio`}>
                <input className={`portfolio-date`} type="date" value={date} onChange={e => setDate(e.target.value)}/>
                <div className={`pie-graphs`}>
                    <h4>Данных на данную данных не существует</h4>
                </div>
            </div>
        )
    }
}

export default Portfolio