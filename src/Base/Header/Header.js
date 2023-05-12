import './Header.css'
import Container from "../../components/Container/Container";
import logo from '../../static/logo.svg'
import {Link} from "react-router-dom";

const Header = () => {
  return (
      <header>
          <Container>
              <div className={'header'}>
                  <Link to={"/"}>
                      <img src={logo} alt={"Rumberg logo"} />
                  </Link>
              </div>
          </Container>
      </header>
  )
}

export default Header