import './Select.css'
import {useState} from "react";
import arrow_up from './../../static/arrow_up.svg'
import arrow_down from './../../static/arrow_down.svg'

const Select = ({values, selected, setSelected, label}) => {
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
                    {values.map(elem => (
                        <div className={`select_component-field-line ${selected === elem ? "selected" : null}`}
                             onClick={() => {setSelected(elem); setIsActive(false)}}
                        >{elem}</div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Select