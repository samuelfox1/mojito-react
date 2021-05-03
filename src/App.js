import { useEffect, useState } from 'react'
import './App.css';
import Pictures from './utils/images.json'
import ArrowBackIosOutlinedIcon from '@material-ui/icons/ArrowBackIosOutlined';
import AutorenewOutlinedIcon from '@material-ui/icons/AutorenewOutlined';
import HighlightOffOutlinedIcon from '@material-ui/icons/HighlightOffOutlined';

function App() {

  const [pictureList, setPictureList] = useState(Pictures.map((x) => x.URL))
  const [src, setSrc] = useState()
  const [history, setHistory] = useState([])
  const [timer, setTimer] = useState()
  const [autoScroll, setAutoScroll] = useState(false)
  const [count, setCount] = useState(0)
  const getRandomIdx = () => Math.floor(Math.random() * pictureList.length)

  const getNextPicture = () => {

    const idx = getRandomIdx()
    const newSrc = pictureList[idx]
    const copy = pictureList
    copy.splice(idx, 1)

    setSrc(newSrc)
    setPictureList(pictureList.length === 0 ? Pictures.map((x) => x.URL) : copy)
    setHistory([...history, newSrc])
  }

  const handleBack = () => {
    setPictureList([...pictureList, src])
    setSrc(history[history.length - 2])
    const copy = history
    copy.pop()
    setHistory(copy)
  }

  const startAuto = () => {
    setAutoScroll(true)
    setTimer(
      setInterval(() => {
        setCount((count) => count + 1)
      }, 1000)
    )
  }

  const stopAuto = () => {
    setAutoScroll(false)
    clearInterval(timer)
    setTimer()
  }

  useEffect(() => {
    getNextPicture()
  }, [count])


  return (
    <div className="App">
      <h1>babe's pups</h1>
      <div className="flex">

        {history.length > 1
          ? <button className="btn__back" onClick={handleBack}><ArrowBackIosOutlinedIcon /></button>
          : <button className="btn__back" disabled><ArrowBackIosOutlinedIcon /></button>}

        {history.length === 1 ? <h5> (tap pic or circle to start)</h5> : null}

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
