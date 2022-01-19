import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const Transaction = () => {
    
    return (
        <div className="portfolio">

            

            <div className="transaction">
                <h3 className="profileoverview-heading heading2">Transactions </h3>
                <div className="card auth-card input-field-transaction #263238 blue-grey darken-4">
                    <h2 className="brand-logo buy">Buy</h2>
                    <input type="text" placeholder="ticker" className="white-text" />
                    <input type="text" placeholder="units" className="white-text" />
                    <input type="text" placeholder="price" className="white-text" />
                    <button className="btn auth-btn waves-effect waves-light #4fc3f7 light-blue lighten-2" >
                        Buy
                    </button >
                </div>
                <div className="card auth-card input-field-transaction #263238 blue-grey darken-4">
                    <h2 className="brand-logo sell" >Sell</h2>
                    <input type="text" placeholder="ticker" className="white-text" />
                    <input type="text" placeholder="units" className="white-text" />
                    <input type="text" placeholder="price" className="white-text" />
                    <button className="btn auth-btn waves-effect waves-light #9ccc65 light-green lighten-1" >
                        Sell
                    </button >
                </div>
                <div className="card auth-card #263238 blue-grey darken-4">
                    <div className="card-content">
                        <h6 className="brand-logo"> Last 5 Transactions</h6>
                        <span className="card-title activator grey-text ">
                            Click here!
                            <i className="material-icons right">more_vert</i>
                        </span>
                    </div>
                    <div className="card-reveal #263238 blue-grey darken-4">
                        <span className="card-title white-text text-darken-4 ">Last 5 Transactions<i className="material-icons right">close</i></span>
                        <ul>
                            <li className="white-text">transaction 1</li>
                            <li className="white-text">transaction 2</li>
                            <li className="white-text">transaction 3</li>
                            <li className="white-text">transaction 4</li>
                            <li className="white-text">transaction 5</li>
                        </ul>
                    </div>
                </div>


            </div>

           
        </div>

    )
}

export default Transaction