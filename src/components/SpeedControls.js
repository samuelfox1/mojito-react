import React from 'react'
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


export default function SpeedControls({ speed, speedAdjustment, setSpeed }) {

    const increaseSpeed = () => speed > .5 ? speed - speedAdjustment : speed
    const reduceSpeed = () => speed + speedAdjustment

    return (
        <>
            {speed > .5
                ? <button className="btn__speed" onClick={() => setSpeed(increaseSpeed())}><ExpandMoreIcon /></button>
                : <button className="btn__speed" disabled><ExpandMoreIcon /></button>
            }
            {speed < 5
                ? <button className="btn__speed" onClick={() => setSpeed(reduceSpeed())}><ExpandLessIcon /></button>
                : <button className="btn__speed" disabled><ExpandLessIcon /></button>
            }
        </>
    )
}
