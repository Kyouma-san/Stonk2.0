import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const Profile = () => {
    const [d, setValue] = useState([])
    useEffect(() => {

        fetch('http://localhost:5000/userProfile', {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("jwt")
            }
        }).then(res => res.json())
            .then(data => {
                console.log(data.data)
                console.log(typeof (data.data))
                setValue(data.data)
            })

            return () => {
                setValue({});
              };

    }, [])
    return (
        <div className="portfolio">
                {
                    d.map(item => {
                        return (<div className="profileoverview">
                            <h3 className="profileoverview-heading heading2"> Portfolio Overview </h3>
                            <div className="card profileoverview-card auth-card  #eceff1 blue-grey lighten-5">
                                <h5>Total stocks in protfolio : {item.totalStocks}</h5>
                            </div>
                            <div className="card profileoverview-card auth-card   #eceff1 blue-grey lighten-5">
                                <h5>Invested Amount ($) : {item.investedAmount}</h5>
                            </div>
                            <div className="card profileoverview-card auth-card #eceff1 blue-grey lighten-5">
                                <h5>Current Amount ($) : {item.currentAmount}</h5>
                            </div>
                            <div className="card profileoverview-card auth-card  #eceff1 blue-grey lighten-5">
                                <h5> P/L ($): {item.pal}</h5>
                            </div>
                        </div>

                        )
                    })
                }

        
        </div>

    )
}

export default Profile