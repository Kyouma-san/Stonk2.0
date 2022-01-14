import React from 'react'

const Profile = () => {
    return (
        <div>
            <h4 className="profileoverview-heading"> Portfolio Overview </h4>
            <div className="profileoverview" >
                <div className="card profileoverview-card auth-card  #f1f8e9 light-green lighten-5">
                    <h5>Total stocks in protfolio : 5</h5>
                </div>
                <div className="card profileoverview-card auth-card   #f1f8e9 light-green lighten-5">
                    <h5>Invested Amount ($) : 500</h5>
                </div>
                <div className="card profileoverview-card auth-card  #f1f8e9 light-green lighten-5">
                    <h5>Current Amount ($) : 1000</h5>
                </div>
                <div className="card profileoverview-card auth-card  #f1f8e9 light-green lighten-5">
                    <h5> P/L : 500($) or 100(%)</h5>
                </div>
            </div>
            <h4 className="profileoverview-heading">Stocks in Portfolio </h4>
            <div className="stocks">
                <div className="mycard">
                    <div className="card auth-card input-field #f1f8e9 light-green lighten-5">
                        <h2>Stonks</h2>

                    </div>
                </div>
            </div>
        </div>

    )
}

export default Profile