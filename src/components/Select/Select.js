import './Select.css'
import {useState} from "react";
import arrow_up from './../../static/arrow_up.svg'
import arrow_down from './../../static/arrow_down.svg'
import {Link} from "react-router-dom";

const Select = ({values, selected, setSelected, label, setSearch, filter}) => {
    const [isActive, setIsActive] = useState(false)
    const toggleActive = () => {
        setIsActive(!isActive)
    }
    return (
        <div className="select_component">
            <div className="select_component-label">{label}</div>
            <div className="select_component-selected" onClick={toggleActive}>
                {selected}
                <div className="select_component-img"><img src={isActive ? arrow_up : arrow_down} alt="arrow"/></div>
            </div>
            <div className={`select_component-listener ${isActive ? 'active' : null}`} onClick={toggleActive}></div>
            <div className={`select_component-list ${isActive ? 'active' : null}`}>
                <div className="select_component-field">
                    <input onChange={e => setSearch(e.target.value)} className={"select_component-search"} type={"text"}
                           placeholder={"Поиск"}/>
                    {values.length !== 0
                        ? values.map((elem, i) => (
                            <Link key={i} to={`/${elem.toLowerCase()}`}
                                  className={`select_component-field-line ${selected === elem ? "selected" : null}`}
                                  onClick={() => {
                                      setSelected(elem);
                                      setIsActive(false)
                                  }}
                            >{elem}</Link>))
                        : <div className={"select_component-field-line"}>Не найдено <b>{`${filter}`}</b></div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Select