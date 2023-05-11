import './Root.css'
import Header from "../../Base/Header/Header";
import Footer from "../../Base/Footer/Footer";
import RootMain from "./RootMain/RootMain";

const Root = () => {
    return (
        <div className={'root'}>
            <Header/>
            <RootMain />
            <Footer/>
        </div>
    )
}

export default Root