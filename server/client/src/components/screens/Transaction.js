import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import M from 'materialize-css'

const Transaction = () => {
    ////// FOR BUY/SELL
    const navigate = useNavigate();
    const [buy_ticker, setBUYTicker] = useState("");
    const [buy_units, setBUYUnits] = useState("");
    const [buy_price, setBUYPrice] = useState("");

    const [sell_ticker, setSELLTicker] = useState("");
    const [sell_units, setSELLUnits] = useState("");
    const [sell_price, setSELLPrice] = useState("");

    /// FETCH TIMEOUT ADDED
    async function fetchWithTimeout(resource, options = {}) {
        const { timeout = 8000 } = options;

        const controller = new AbortController();
        const id = setTimeout(() => controller.abort(), timeout);
        const response = await fetch(resource, {
            ...options,
            signal: controller.signal
        });
        clearTimeout(id);
        return response;
    }

    const buyStockV2 = async () => {
        try {
            const response = await fetchWithTimeout('http://localhost:5000/buyStock', {
                timeout: 10000,
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + localStorage.getItem("jwt")
                },
                body: JSON.stringify({
                    ticker:buy_ticker,
                    units: buy_units,
                    price: buy_price
                })
            });

            const data = await response.json();
            if (data.error) {
                M.toast({ html: data.error, classes: "#ef5350 red lighten-1" })
            } else {
                M.toast({ html: "Transaction Successful", classes: "#689f38 light-green darken-2" })
                navigate('/profile');
            }

        } catch (error) {
            // Timeouts if the request takes
            // longer than 6 seconds
            M.toast({ html: "TimeOut (API limit reached), retry after sometime", classes: "#ef5350 red lighten-1" })
        }
    }

    const sellStockV2 = async () => {
        try {
            const response = await fetchWithTimeout('http://localhost:5000/sellStock', {
                timeout: 10000,
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + localStorage.getItem("jwt")
                },
                body: JSON.stringify({
                    ticker:sell_ticker,
                    units:sell_units,
                    price:sell_price
                })
            });

            const data = await response.json();
            if (data.error) {
                M.toast({ html: data.error, classes: "#ef5350 red lighten-1" })
            } else {
                M.toast({ html: "Transaction Successful", classes: "#689f38 light-green darken-2" })
                navigate('/profile');
            }

        } catch (error) {
            // Timeouts if the request takes
            // longer than 6 seconds
            M.toast({ html: "TimeOut (API limit reached), retry after sometime", classes: "#ef5350 red lighten-1" })
        }
    }

    ///




    //////// FOR GETTING LATEST 5 TRANSACTIONS
    const [data, setData] = useState([])
    useEffect(() => {
        fetch('http://localhost:5000/userTransactions', {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("jwt")
            }
        }).then(res => res.json())
            .then(data => {
                console.log(data)
                console.log(data.transactions)
                console.log(typeof (data.transactions))
                setData(data.transactions)
            })


        return () => {
            setData({});

        };

    }, [])

    return (
        <div className="portfolio">



            <div className="transaction">
                <h3 className="profileoverview-heading heading2">Transactions </h3>
                <div className="card auth-card input-field-transaction #263238 blue-grey darken-4">
                    <h2 className="brand-logo buy">Buy</h2>
                    <input
                        type="text"
                        placeholder="ticker"
                        value={buy_ticker}
                        className="white-text"
                        onChange={(e) => setBUYTicker(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="units"
                        value={buy_units}
                        className="white-text"
                        onChange={(e) => setBUYUnits(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="price"
                        value={buy_price}
                        className="white-text"
                        onChange={(e) => setBUYPrice(e.target.value)}
                    />
                    <button className="btn auth-btn waves-effect waves-light #4fc3f7 light-blue lighten-2"
                        onClick={() => buyStockV2()} >
                        Buy
                    </button >
                </div>
                <div className="card auth-card input-field-transaction #263238 blue-grey darken-4">
                    <h2 className="brand-logo sell" >Sell</h2>
                    <input
                        type="text"
                        placeholder="ticker"
                        value={sell_ticker}
                        className="white-text"
                        onChange={(e) => setSELLTicker(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="units"
                        value={sell_units}
                        className="white-text"
                        onChange={(e) => setSELLUnits(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="price"
                        value={sell_price}
                        className="white-text"
                        onChange={(e) => setSELLPrice(e.target.value)}
                    />
                    <button className="btn auth-btn waves-effect waves-light #9ccc65 light-green lighten-1"
                        onClick={() => sellStockV2()}>
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
                            {data.map(item => {
                                return (
                                    <div className="card profile-stock-card auth-card input-field #eceff1 blue-grey lighten-5">

                                        <h5>TICKER : {item.ticker} </h5>
                                        <h5>UNITS : {item.units} </h5>
                                        <h5>PRICE : {item.price} </h5>
                                        <h5>ORDER TYPE : {item.orderType} </h5>
                                    </div>
                                )
                            })


                            }
                        </ul>
                    </div>
                </div>


            </div>


        </div>

    )
}

export default Transaction