import './Loader.css'
import loader_img from './../../static/loader.svg'

const Loader = () => {
  return (
      <div className={'loader'}>
          <img src={loader_img} alt={"loader"} />
      </div>
  )
}

export default Loader