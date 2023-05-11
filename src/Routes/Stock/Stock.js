import './Stock.css'
import Header from "../../Base/Header/Header";
import Footer from "../../Base/Footer/Footer";
import StockRoot from "./StockRoot/StockRoot";

const Stock = () => {
    return (
        <div className={`stock`}>
            <Header/>
            <StockRoot/>
            <Footer/>
        </div>
    )
}

export default Stock