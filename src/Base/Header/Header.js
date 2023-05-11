import './Header.css'
import Container from "../../components/Container/Container";
import logo from '../../static/logo.svg'

const Header = () => {
  return (
      <header>
          <Container>
              <div className={'header'}>
                  <img src={logo} alt={"Rumberg logo"} />
              </div>
          </Container>
      </header>
  )
}

export default Header