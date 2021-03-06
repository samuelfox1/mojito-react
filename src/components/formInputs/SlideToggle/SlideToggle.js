import { Update } from '@material-ui/icons'
import React, { useState } from 'react'
import './style.css'

export default function SlideToggle({ autoScroll, setAutoScroll, updateCount }) {

    const handleCheck = () => {
        setAutoScroll(!autoScroll)
        updateCount()
    }

    return (
        <label className="switch">
            <input type="checkbox" checked={autoScroll} onChange={handleCheck} />
            <span className="slider round"></span>
        </label>
    )
}
