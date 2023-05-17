import './Stock.css'
import Header from "../../Base/Header/Header";
import Footer from "../../Base/Footer/Footer";
import StockRoot from "./StockRoot/StockRoot";
import {useParams} from "react-router-dom";
import {useEffect} from "react";

const Stock = () => {
    const {id} = useParams()
    useEffect(() => {
        document.title = `Rumberg | ${id.toUpperCase()} Index`
    })
    return (
        <div className={`stock`}>
            <Header/>
            <StockRoot id={id}/>
            <Footer/>
        </div>
    )
}

export default Stock