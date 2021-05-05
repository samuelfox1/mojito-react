import { useEffect, useState } from 'react'
import './App.css';
import Pictures from './utils/images.json'
import ArrowBackIosOutlinedIcon from '@material-ui/icons/ArrowBackIosOutlined';
import SpeedControls from './components/SpeedControls'
import SlideToggle from './components/formInputs/SlideToggle/SlideToggle'

function App() {

  const timerSpeed = 3
  const speedAdjustment = .5

  const [counter, setCounter] = useState(parseInt(localStorage.getItem('cuteCount')) || 0)
  const [pictureList, setPictureList] = useState(Pictures.map((x) => x.URL))
  const [autoScroll, setAutoScroll] = useState(false)
  const [speed, setSpeed] = useState(timerSpeed)
  const [history, setHistory] = useState([])
  const [src, setSrc] = useState()
  const [timer, setTimer] = useState()


  const getRandomIdx = () => Math.floor(Math.random() * pictureList.length)
  const updateCount = () => { setCounter((counter) => counter + 1) }

  const getNextPicture = () => {
    const idx = getRandomIdx()
    const newSrc = pictureList[idx]
    const copy = pictureList
    copy.splice(idx, 1)
    setSrc(newSrc)
    setPictureList(pictureList.length === 0 ? Pictures.map((x) => x.URL) : copy)
    setHistory([...history, newSrc])
    localStorage.setItem('cuteCount', counter)
  }

  const handleBack = () => {
    setPictureList([...pictureList, src])
    setSrc(history[history.length - 2])
    const copy = history
    copy.pop()
    setHistory(copy)
  }



  useEffect(() => {
    setTimer(clearTimeout(timer))
    if (!autoScroll) getNextPicture()
    else {
      setTimer(
        setTimeout(() => {
          getNextPicture()
          updateCount()
        }, speed * 1000)
      )
    }
  }, [counter, autoScroll])

  return (
    <div className="App">
      <h1>babe's pups</h1>
      <div className="flex">

        {history.length > 1
          ? <button className="btn__back" onClick={handleBack}><ArrowBackIosOutlinedIcon /></button>
          : <button className="btn__back" disabled><ArrowBackIosOutlinedIcon /></button>
        }

        {/* {!autoScroll
          ? <button className="btn__auto__cycle" onClick={() => setAutoScroll(true)}><AutorenewOutlinedIcon /></button>
          : <button className="btn__auto__cycle btn__active" onClick={() => setAutoScroll(false)}><HighlightOffOutlinedIcon /> </button>
        } */}

        <SlideToggle className="btn__auto__cycle" autoScroll={autoScroll} setAutoScroll={setAutoScroll} />
        {autoScroll
          ? <>
            <p className="speed">{speed} sec</p>
            <SpeedControls
              speedAdjustment={speedAdjustment}
              setAutoScroll={setAutoScroll}
              setSpeed={setSpeed}
              speed={speed}
            />
          </>
          : null}

        {history.length <= 1 && !autoScroll ? <h5 className="mb5"> (tap pic or circle to start)</h5> : null}

      </div>
      <h6 className="count">{counter}</h6>

      <img
        src={src}
        width="90%"
        alt="random doggy"
        onClick={updateCount}
      />
    </div>
  );
}

export default App;
