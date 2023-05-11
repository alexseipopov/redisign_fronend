import './Footer.css'
import Container from "../../components/Container/Container";

const Footer = () => {
    return (
        <footer>
            <Container>
                <div className={'footer'}>
                    <p className={'footer-content'}>© 2023 Rumberg Technologies. Все права защищены</p>
                </div>
            </Container>
        </footer>
    )
}

export default Footer