import {useEffect, useState} from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown"
import Header from "../../Base/Header/Header";
import Footer from "../../Base/Footer/Footer";
import file from "../../static/file.svg";
import download from "../../static/download.svg";

export const About = () => {
    const [text, setText] = useState("")
    const [status, setStatus] = useState(1)
    const [files, setFiles] = useState([])
    useEffect(() => {
        axios.get("/api/get_md", {
            params: {
                code: "about"
            }
        }).then(resp => {
            console.log(resp.data, resp)
            setStatus(resp.data.code)
            setText(resp.data.text)
        })
        axios.get("/api/get_about_files", {}).then(resp => {
            console.log(resp.data, resp)
            setFiles(resp.data.files)
        })
    }, [])

    const downloadFile = (id, filename) => {
        axios({
            method: "POST",
            url: `/api/download_about_file`,
            responseType: 'blob',
            headers: {
                "Content-Type": 'application/json'
            },
            data: {
                id: id
            }
        }).then(response => {
            if (response.status !== 200) {
                window.alert("Ошибка при загрузке файла")
                return
            }
            const url = window.URL.createObjectURL(new Blob([response.data]))
            const link = document.createElement('a')
            link.href = url
            link.setAttribute('download', filename)
            link.click()
        })
    }

    return (
        <div>
            <Header/>
            <div className="container">
                {status === 0 && <ReactMarkdown>{text}</ReactMarkdown>}
            </div>
            {files.length > 0 && <div className="container">
                {files.map((elem, index) => {
                        return (
                            <div className="document-row" onClick={() => downloadFile(elem.id, elem.filename)}>
                                <img src={file} alt={"file img"}/>
                                <div className={"document-info"}>
                                    <div className={"document-name"}>{elem.title}</div>
                                    <div className={"document-type"}>PDF</div>
                                </div>
                                <img src={download} alt={"download img"}/>
                            </div>
                        )
                    }
                )}


            </div>}
            <Footer/>
        </div>
    )
}