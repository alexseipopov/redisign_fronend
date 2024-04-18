import './Footer.css'
import Container from "../../components/Container/Container";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import breaks from "remark-breaks";

const Footer = () => {
    const navigate = useNavigate()
    const [text, setText] = useState("")
    useEffect(() => {
       axios.get("/api/get_md", {
              params: {
                code: "footer"
              }
         }).then(resp => {
              console.log(resp.data, resp)
              setText(`${resp.data.text}`)

       })
    }, [])


    return (
        <footer>
            <Container>
                <div className={'footer'}>
                    {/*<p className={'footer-content'}>© Rumberg Technologies. Все права защищены</p>*/}
                    {/*<p className="footer-address">Акционерное общество «Румберг Технолоджис» (АО «Румберг Технолоджис»)*/}
                    {/*    ИНН: 9704196645. Адрес: 125040, Г.Москва, вн.тер.г. Муниципальный Округ Беговой, пр-кт Ленинградский, д. 15, стр. 9</p>*/}
                    {/*<p onClick={() => navigate("/about")}>О Нас</p>*/}
                    {/*<a href="mailto:Index@rumberg.ru" className="footer-email">Index@rumberg.ru</a>*/}
                    <ReactMarkdown>{text}</ReactMarkdown>
                </div>
            </Container>
        </footer>
    )
}

export default Footer