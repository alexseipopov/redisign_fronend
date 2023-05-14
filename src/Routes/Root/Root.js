import './Root.css'
import Header from "../../Base/Header/Header";
import Footer from "../../Base/Footer/Footer";
import RootMain from "./RootMain/RootMain";
import {useEffect} from "react";

const Root = () => {
    useEffect(() => {
        document.title = "Rumberg | Главная"
    }, [])
    return (
        <div className={'root'}>
            <Header/>
            <RootMain/>
            <Footer/>
        </div>
    )
}

export default Root