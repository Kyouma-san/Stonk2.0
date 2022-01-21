import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import M from 'materialize-css'

const Portfolio = () => {

    const navigate = useNavigate();
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



    const sellStockV2 = async (ticker, units, price) => {
        try {
            const response = await fetchWithTimeout('http://localhost:5000/sellStock', {
                timeout: 10000,
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + localStorage.getItem("jwt")
                },
                body: JSON.stringify({
                    ticker,
                    units,
                    price
                })
            });

            const data = await response.json();
            if (data.error) {
                M.toast({ html: data.error, classes: "#ef5350 red lighten-1" })
            } else {
                M.toast({ html: "Removed Successfully", classes: "#689f38 light-green darken-2" })
                navigate('/profile');
            }

        } catch (error) {
            // Timeouts if the request takes
            // longer than 6 seconds
            M.toast({ html: "TimeOut (API limit reached), retry after sometime", classes: "#ef5350 red lighten-1" })
        }
    }



    const [data, setData] = useState([])
    useEffect(() => {
        fetch('/allUserStocks', {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("jwt")
            }
        }).then(res => res.json())
            .then(data => {
                console.log(data)
                console.log(data.savedUser.stocks)
                console.log(typeof (data.savedUser.stocks))
                setData(data.savedUser.stocks)
            })


        return () => {
            setData({});

        };

    }, [])


    return (
        <div className="stonks">
            <h3 className="profileoverview-heading heading2">Stocks in Portfolio </h3>
            {data.map(item => {
                return (
                    <div className="card profile-stock-card auth-card input-field #eceff1 blue-grey lighten-5">

                        <h5>TICKER : {item.ticker} </h5>
                        <h5>UNITS : {item.units} </h5>
                        <h5>AVG PRICE : {item.price} </h5>
                        <h5>MKT PRICE : {item.marketPrice} </h5>
                        <button className="btn auth-btn waves-effect waves-light #e57373 red lighten-2"
                            onClick={() => sellStockV2(item.ticker,item.units,item.price)} >
                                 
                            Remove 
                        </button >
                    </div>
                )
            })


            }
        </div>

    )
}

export default Portfolio