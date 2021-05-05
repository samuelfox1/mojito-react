import React, { useState } from 'react'
import './style.css'

export default function SlideToggle({ autoScroll, setAutoScroll }) {

    const handleCheck = () => {
        setAutoScroll(!autoScroll)
    }

    return (
        <label className="switch">
            <input type="checkbox" checked={autoScroll} onChange={handleCheck} />
            <span className="slider round"></span>
        </label>
    )
}
