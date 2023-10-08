import './Stock.css'
import Header from "../../Base/Header/Header";
import Footer from "../../Base/Footer/Footer";
import StockRoot from "./StockRoot/StockRoot";
import {useParams} from "react-router-dom";
import {useEffect} from "react";

const Stock = () => {
    const {name} = useParams()
    useEffect(() => {
        document.title = `Rumberg | ${name.toUpperCase()} Index`
    }, [])
    return (
        <div className={`stock`}>
            <Header/>
            <StockRoot name={name}/>
            <Footer/>
        </div>
    )
}

export default Stock