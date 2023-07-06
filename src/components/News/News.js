import './News.css'
import axios from "axios";

const News = ({news}) => {
    const getFile = (id, filename) => {
        axios({
            method: "POST",
            url: `${process.env.REACT_APP_API_URL}/api/download_news`,
            responseType: 'blob',
            headers: {
                "Content-Type": 'application/json'
            },
            data: {
                id: id
            },
        })
            .then(response => {
                const url = window.URL.createObjectURL(new Blob([response.data]))
                const link = document.createElement('a')
                link.href = url
                link.setAttribute('download', filename)
                link.click()
            })
    }
    return (
        <div className={`news`}>
            <h3>{news.title}</h3>
            <p>{news.text}</p>
            {news.id
                ? <div className={"news_download"} onClick={() => getFile(news.id, news.filename)}>Download</div>
                : <></>
            }
            <div className={"news_date"}>{news.date}</div>
        </div>
    )
}

export default News