import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const Portfolio = () => {
    const [data, setData] = useState([])
    useEffect(() => {
        fetch('http://localhost:5000/allUserStocks', {
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
                {  data.map(item => {
                        return (
                            <div className="card profile-stock-card auth-card input-field #eceff1 blue-grey lighten-5">

                                <h5>TICKER : {item.ticker} </h5>
                                <h5>UNITS : {item.units} </h5>
                                <h5>AVG PRICE : {item.price} </h5>
                                <h5>MKT PRICE : {item.marketPrice} </h5>
                            </div>
                        )
                    })
                  
                    
                }
            </div>

    )
}

export default Portfolio