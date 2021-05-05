import React from 'react'

export default function DisplayCount({ counter }) {
    return (
        <div className="count__container">
            <h3 className="count__number">{counter}</h3>
            <h6 className="count__text">images</h6>
            <h6 className="count__text"> viewed</h6>
        </div>
    )
}
