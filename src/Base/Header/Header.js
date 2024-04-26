import './Header.css'
import Container from "../../components/Container/Container";
import logo from '../../static/logo.jpg'
import {Link} from "react-router-dom";

const Header = () => {
  return (
      <header>
          <Container>
              <div className={'header'}>
                  <Link to={"/"}>
                      <div className="logo-container">
                          <img style={{
                              marginLeft: "-26px"
                          }} src={logo} alt={"Rumberg logo"} />
                      </div>
                  </Link>
              </div>
          </Container>
      </header>
  )
}

export default Header