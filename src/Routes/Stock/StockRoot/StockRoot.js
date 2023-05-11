import './StockRoot.css'
import Container from "../../../components/Container/Container";
import Select from "../../../components/Select/Select";
import {useState} from "react";

const StockRoot = () => {
    const [tmp_stocks, set_tmp_stocks] = useState(["Tesla Index <span>TSLA</span>", "Google Index <span>GOOG</span>"])
    const [tt, setTt] = useState(tmp_stocks[0])
  return (
      <main>
          <Container>
              <div className={`root_stock`}>
                  <div className={`root_stock-selection`}>
                      {/*TODO тут будет переменная из запроса*/}
                      <div>
                          Tesla Index
                          <Select values={tmp_stocks} selected={tt} setSelected={(elem) => setTt(elem)} />
                      </div>
                  </div>
              </div>
          </Container>
      </main>
  )
}

export default StockRoot