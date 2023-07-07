import './Document.css'
import file from './../../static/file.svg'
import download from './../../static/download.svg'
import axios from "axios";

const Document = ({elem, name}) => {

    const getFile = (chart_id, filename) => {
        console.log(chart_id, filename)
        axios({
            method: "POST",
            url: `https://158.160.96.57:3010/api/download_docs`,
            responseType: 'blob',
            headers: {
                "Content-Type": 'application/json'
            },
            data: {
                chart_id: chart_id,
                filename: filename
            },
            params: {
                chart_id: chart_id,
                filename: filename
            }
        }).then(response => {
            const url = window.URL.createObjectURL(new Blob([response.data]))
            const link = document.createElement('a')
            link.href = url
            link.setAttribute('download', filename)
            link.click()
        })
    }
    return (
        <div onClick={() => getFile(name, elem)} className={"document-row"}>
            <img src={file} alt={"file img"}/>
            <div className={"document-info"}>
                <div className={"document-name"}>{elem}</div>
                <div className={"document-type"}>PDF</div>
            </div>
            <img src={download} alt={"download img"}/>
        </div>
    )
}

export default Document