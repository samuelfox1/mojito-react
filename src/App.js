import { useState } from 'react'
import './App.css';
import Pictures from './utils/images.json'
import ArrowBackIosOutlinedIcon from '@material-ui/icons/ArrowBackIosOutlined';
import AutorenewOutlinedIcon from '@material-ui/icons/AutorenewOutlined';
import HighlightOffOutlinedIcon from '@material-ui/icons/HighlightOffOutlined';

function App() {

  const getRandomNum = () => Math.floor(Math.random() * Pictures.length)
  const [src, setSrc] = useState(Pictures[getRandomNum()].URL)
  const [history, setHistory] = useState([])
  const [timer, setTimer] = useState()

  const getNextPicture = () => {
    if (timer) return
    setHistory([...history, src])
    setSrc(Pictures[getRandomNum()].URL)
  }

  const handleBack = () => {
    setSrc(history[history.length - 1])
    const copy = history
    copy.pop()
    setHistory(copy)
  }

  const startAuto = () => {
    setTimer(
      setInterval(() => {
        setHistory([...history, src])
        setSrc(Pictures[getRandomNum()].URL)
      }, 3000)
    )
  }

  const stopAuto = () => {
    clearInterval(timer)
    setTimer()
  }


  return (
    <div className="App">
      <h1>babe's pups</h1>
      <div className="flex">

        {history.length > 0 && !timer
          ? <button className="btn__back" onClick={handleBack}><ArrowBackIosOutlinedIcon /></button>
          : <button className="btn__back" disabled><ArrowBackIosOutlinedIcon /></button>}

        {history.length === 0 ? <h5> (tap pic or circle to start)</h5> : null}

        {!timer
          ? <button className="btn__auto__cycle" onClick={startAuto}><AutorenewOutlinedIcon /></button>
          : <button className="btn__auto__cycle" onClick={stopAuto}><HighlightOffOutlinedIcon /> </button>
        }
      </div>
      <img
        src={src}
        width="90%"
        alt="random doggy"
        onClick={getNextPicture}
      />
    </div>
  );
}

export default App;
