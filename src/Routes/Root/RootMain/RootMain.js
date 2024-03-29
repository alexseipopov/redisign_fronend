import './RootMain.css'
import Container from "../../../components/Container/Container";
import intro_img from './../../../static/intro3.png'
import {useEffect, useState} from "react";
import Loader from "../../../components/Loader/Loader";
import axios from "axios";
import {Link} from "react-router-dom";

const RootMain = () => {
    const [indexes, setIndexes] = useState([])
    const [loader, setLoader] = useState(false)
    useEffect(() => {
        setLoader(true)
        axios(`/api/get_all_portfolio`)
            .then(data => {
                setIndexes(data.data)
            })
            .catch((e) => {
                console.error(e)
            })
            .finally(() => {
                setLoader(false)
            })
    }, [])
    let i = 0
    return (
        <main>
            <Container>
                <div className={'root_main'}>
                    <div className={'root_main-header'}>
                        <div className={'root_main-content'}>
                            <h1>
                                Рассчитываем индексы для инвестиционных продуктов
                            </h1>
                            <p className={'root_main-intro'}>
                                Мы помогаем клиентам конструировать индексы — основу для инновационных продуктов, таких
                                как
                                инвестиционные фонды, управляемые сертификаты, структурные продукты, ЦФА и другие
                                <br/><br/>
                                Наша миссия — сделать больше хороших инвестиционных идей доступными для инвесторов
                            </p>
                        </div>
                        <div className={'root_main-img'}>
                            <img src={intro_img} alt={'intro'}/>
                        </div>
                    </div>
                    <div className={'main_root-indexes'}>
                        <h2>Индексы</h2>
                        <div className={'table-container'}>
                            <div className={'root_main-table'}>
                                <div className={'root_main-table_head'}>
                                    <div className={"root_main-symbol"}>Символ</div>
                                    <div className={"root_main-name"}>Название</div>
                                    <div className={"root_main-isin"}>ISIN</div>
                                    <div className={"root_main-value"}>Значение</div>
                                </div>
                                {loader
                                    ? <div className={"root_main-table_row root_main-table_row-loader"}>
                                        <Loader/>
                                    </div>
                                    : indexes.map(elem => {
                                        i++
                                        return <Link key={i} to={`${elem.url}`} className={'root_main-table_row'}>
                                            <div className={"root_main-symbol"}>{elem.text}</div>
                                            <div className={"root_main-name"}>{elem.title}</div>
                                            <div className={"root_main-isin"}>{elem.isin}</div>
                                            <div className={"root_main-value"}>{elem.level}</div>
                                        </Link>
                                    })}
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </main>
    )
}

export default RootMain