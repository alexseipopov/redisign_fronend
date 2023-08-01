import './Footer.css'
import Container from "../../components/Container/Container";

const Footer = () => {
    return (
        <footer>
            <Container>
                <div className={'footer'}>
                    <p className={'footer-content'}>© 2023 Rumberg Technologies. Все права защищены</p>
                    <p className="footer-address">Акционерное общество «Румберг Технолоджис» (АО «Румберг Технолоджис»)
                        ИНН: 9704196645. Адрес: 19019, г. Москва, ул. Арбат, 6/2, помещ. 1/1/4 оф. 339</p>
                    <a href="mailto:Index@rumberg.ru" className="footer-email">Index@rumberg.ru</a>
                </div>
            </Container>
        </footer>
    )
}

export default Footer