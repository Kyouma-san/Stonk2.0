import React from 'react'
import { Link } from 'react-router-dom'

const Profile = () => {
    return (
        <div className="portfolio">
            
            <div className="profileoverview" >
            <h3 className="profileoverview-heading heading2"> Portfolio Overview </h3>
                <div className="card profileoverview-card auth-card  #eceff1 blue-grey lighten-5">
                    <h5>Total stocks in protfolio : 5</h5>
                </div>
                <div className="card profileoverview-card auth-card   #eceff1 blue-grey lighten-5">
                    <h5>Invested Amount ($) : 500</h5>
                </div>
                <div className="card profileoverview-card auth-card #eceff1 blue-grey lighten-5">
                    <h5>Current Amount ($) : 1000</h5>
                </div>
                <div className="card profileoverview-card auth-card  #eceff1 blue-grey lighten-5">
                    <h5> P/L : 500($) or 100(%)</h5>
                </div>
            </div>

            <div className="transaction">
                <h3 className="profileoverview-heading heading2">Transactions </h3>
                <div className="card auth-card input-field-transaction #263238 blue-grey darken-4">
                    <h2 className="brand-logo buy">Buy</h2>
                    <input type="text" placeholder="ticker" />
                    <input type="text" placeholder="units" />
                    <input type="text" placeholder="price" />
                    <button className="btn auth-btn waves-effect waves-light #4fc3f7 light-blue lighten-2" >
                        Buy
                    </button >
                </div>
                <div className="card auth-card input-field-transaction #263238 blue-grey darken-4">
                    <h2 className="brand-logo sell" >Sell</h2>
                    <input type="text" placeholder="ticker" />
                    <input type="text" placeholder="units" />
                    <input type="text" placeholder="price" />
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

            <div className="stonks">
                <h3 className="profileoverview-heading heading2">Stocks in Portfolio </h3>
                <div className="card profile-stock-card auth-card input-field #eceff1 blue-grey lighten-5">
                    <h5> STONKS</h5>
                </div>
                <div className="card profile-stock-card auth-card input-field #eceff1 blue-grey lighten-5">
                    <h5> STONKS</h5>
                </div>
                <div className="card profile-stock-card auth-card input-field #eceff1 blue-grey lighten-5">
                    <h5> STONKS</h5>
                </div>
                <div className="card profile-stock-card auth-card input-field #eceff1 blue-grey lighten-5">
                    <h5> STONKS</h5>
                </div>
                <div className="card profile-stock-card auth-card input-field #eceff1 blue-grey lighten-5">
                    <h5> STONKS</h5>
                </div>
                <div className="card profile-stock-card auth-card input-field #eceff1 blue-grey lighten-5">
                    <h5> STONKS</h5>
                </div>
                <div className="card profile-stock-card auth-card input-field #eceff1 blue-grey lighten-5">
                    <h5> STONKS</h5>
                </div>
                <div className="card profile-stock-card auth-card input-field #eceff1 blue-grey lighten-5">
                    <h5> STONKS</h5>
                </div>
                <div className="card profile-stock-card auth-card input-field #eceff1 blue-grey lighten-5">
                    <h5> STONKS</h5>
                </div>
                <div className="card profile-stock-card auth-card input-field #eceff1 blue-grey lighten-5">
                    <h5> STONKS</h5>
                </div>
                <div className="card profile-stock-card auth-card input-field #eceff1 blue-grey lighten-5">
                    <h5> STONKS</h5>
                </div>
                <div className="card profile-stock-card auth-card input-field #eceff1 blue-grey lighten-5">
                    <h5> STONKS</h5>
                </div>
                <div className="card profile-stock-card auth-card input-field #eceff1 blue-grey lighten-5">
                    <h5> STONKS</h5>
                </div>
                <div className="card profile-stock-card auth-card input-field #eceff1 blue-grey lighten-5">
                    <h5> STONKS</h5>
                </div>
                <div className="card profile-stock-card auth-card input-field #eceff1 blue-grey lighten-5">
                    <h5> STONKS</h5>
                </div>
                <div className="card profile-stock-card auth-card input-field #eceff1 blue-grey lighten-5">
                    <h5> STONKS</h5>
                </div>
                <div className="card profile-stock-card auth-card input-field #eceff1 blue-grey lighten-5">
                    <h5> STONKS</h5>
                </div>
                <div className="card profile-stock-card auth-card input-field #eceff1 blue-grey lighten-5">
                    <h5> STONKS</h5>
                </div>
                <div className="card profile-stock-card auth-card input-field #eceff1 blue-grey lighten-5">
                    <h5> STONKS</h5>
                </div>
                <div className="card profile-stock-card auth-card input-field #eceff1 blue-grey lighten-5">
                    <h5> STONKS</h5>
                </div>
                <div className="card profile-stock-card auth-card input-field #eceff1 blue-grey lighten-5">
                    <h5> STONKS</h5>
                </div>
                <div className="card profile-stock-card auth-card input-field #eceff1 blue-grey lighten-5">
                    <h5> STONKS</h5>
                </div>
                <div className="card profile-stock-card auth-card input-field #eceff1 blue-grey lighten-5">
                    <h5> STONKS</h5>
                </div>
                
                <div className="card profile-stock-card auth-card input-field #eceff1 blue-grey lighten-5">
                    <h5> STONKS</h5>
                </div>
                <div className="card profile-stock-card auth-card input-field #eceff1 blue-grey lighten-5">
                    <h5> STONKS</h5>
                </div>
                <div className="card profile-stock-card auth-card input-field #eceff1 blue-grey lighten-5">
                    <h5> STONKS</h5>
                </div>
                <div className="card profile-stock-card auth-card input-field #eceff1 blue-grey lighten-5">
                    <h5> STONKS</h5>
                </div>
                <div className="card profile-stock-card auth-card input-field #eceff1 blue-grey lighten-5">
                    <h5> STONKS</h5>
                </div>
                <div className="card profile-stock-card auth-card input-field #eceff1 blue-grey lighten-5">
                    <h5> STONKS</h5>
                </div>
                

            </div>
        </div>

    )
}

export default Profile