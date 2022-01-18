const express = require('express');
const router = express.Router();

const request = require('request');
const mongoose = require('mongoose');
const Portfolio = mongoose.model("Portfolio");
const requireLogin = require('../middleware/requireLogin')

router.get('/allUserStocks', requireLogin, (req, res) => {
    Portfolio.findOne({ userId: req.user })
        .then(savedUser => {
            if (savedUser) {
                console.log("found the user")
                console.log("savedUser.stocks")
                res.json({ savedUser })
            } else {
                
                res.status(404).json({ stocks: stonks })
            }
        }).catch(err => {
            return console.log(err);
        })
})

router.post('/buyStock', requireLogin, (req, res) => {
    console.log(req.body)
    let { ticker, price, units } = req.body;
    ticker = ticker.toUpperCase();
    console.log(ticker)
    const requestOptions = {

        url: 'https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=' + ticker + '&apikey=5RHSIX9H7XDGZLU2',
        method: 'GET',
        json: {
            ticker,
            price,
            units
        },
    };
    request(requestOptions, (err, response, body) => {
        console.log("req-options")
        console.log(typeof (response.body))
        if (err) {
            console.log("error")
            return console.log(err);
        }
        var currentPrice = + 0;
        for (var i in response.body) {

            console.log(i + " : " + response.body[i]);
            var present = + 0;
            for (var j in response.body[i]) {
                console.log(j + " : " + response.body[i][j]);
                present = +1;
                if (j == '05. price') {
                    currentPrice = + response.body[i][j];
                    console.log(currentPrice)
                }
            }
        }

        if (present == 0) {
            return res.status(404).json({ error: "TICKER NOT FOUND" })
        }


        console.log("ticker found")
        const { ticker, price, units } = requestOptions.json;


        if (!ticker || !price || !units || units <= 0 || price < 0) {
            return res.status(422).json({ error: "please check all fields are added and they are correct" })
        }

        var oldPrice = + 0, oldUnits = + 0;
        let flag = + 0;
        Portfolio.findOne({ userId: req.user })
            .then(savedUser => {

                if (savedUser) {
                    console.log("saved user")
                    for (let i in savedUser.stocks) {

                        console.log("i :" + savedUser.stocks[i])
                        if (savedUser.stocks[i].ticker == ticker) {
                            oldPrice = + parseFloat(savedUser.stocks[i].price);
                            oldUnits = + parseFloat(savedUser.stocks[i].units);
                            flag = + 1;
                        }
                    }

                }
                var EnteredUnits = + parseFloat(units);
                var EnteredPrice = + parseFloat(price);
                let newPrice = ((oldUnits * oldPrice) + (EnteredUnits * EnteredPrice));
                newPrice = newPrice / ((oldUnits) + (EnteredUnits));
                let newUnits = (oldUnits) + (EnteredUnits);
                if (flag == 0) {
                    console.log("new ticker / new user")
                    Portfolio.updateOne({ userId: req.user },
                        {
                            $push: {
                                stocks: {
                                    ticker,
                                    price: (newPrice.toFixed(2)).toString(10),
                                    units: (newUnits.toFixed(2)).toString(10),
                                    marketPrice: (currentPrice.toFixed(2)).toString(10)
                                }
                            }
                        },
                        { upsert: true }
                    ).then(result => {
                        return res.json({ portfolio: result })
                    })
                        .catch(err => {
                            return console.log(err);
                        })
                } else {
                    Portfolio.updateOne({ userId: req.user, "stocks.ticker": ticker },
                        {
                            $set: {
                                "stocks.$.units": (newUnits.toFixed(2)).toString(10),
                                "stocks.$.price": (newPrice.toFixed(2)).toString(10),
                                "stocks.$.marketPrice": (currentPrice.toFixed(2)).toString(10)
                            }
                        })
                        .then(result => {
                            return res.json({ portfolio: result })
                        })
                        .catch(err => {
                            return console.log(err);
                        })
                }



            }).catch(err => {
                return console.log(err);
            })

    })

})


router.post('/sellStock', requireLogin, (req, res) => {
    let { ticker, price, units } = req.body;
    ticker = ticker.toUpperCase();

    const requestOptions = {
        url: 'https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=' + ticker + '&apikey=5RHSIX9H7XDGZLU2',
        method: 'GET',
        json: {
            ticker,
            price,
            units
        },
    };
    request(requestOptions, (err, response, body) => {
        console.log("req-options")
        console.log(typeof (response.body))
        if (err) {
            console.log("error")
            return console.log(err);
        }
        var currentPrice = + 0;
        for (var i in response.body) {

            console.log(i + " : " + response.body[i]);
            var present = + 0;
            for (var j in response.body[i]) {
                console.log(j + " : " + response.body[i][j]);
                present = +1;
                if (j == '05. price') {
                    currentPrice = + response.body[i][j];
                    console.log(currentPrice)
                }
            }
        }

        if (present == 0) {
            return res.status(404).json({ error: "TICKER NOT FOUND" })
        }
        const { ticker, price, units } = requestOptions.json;
        if (!ticker || !price || !units || units <= 0 || price < 0) {
            return res.status(422).json({ error: "please check all fields are added and they are correct" })
        }
        var oldPrice = + 0, oldUnits = + 0;
        let flag = + 0;
        Portfolio.findOne({ userId: req.user })
            .then(savedUser => {
                if (savedUser) {
                    for (let i in savedUser.stocks) {
                        console.log("i :" + savedUser.stocks[i])
                        if (savedUser.stocks[i].ticker == ticker) {
                            oldPrice = +  parseFloat(savedUser.stocks[i].price);
                            oldUnits = +  parseFloat(savedUser.stocks[i].units);
                            flag = + 1;
                        }
                    }

                }
                var EnteredUnits = +  parseFloat(units);
                var EnteredPrice = +  parseFloat(price);
                let newUnits = (oldUnits) - (EnteredUnits);


                if (flag == 0) {
                    return res.status(422).json({ error: "Currently don't have this stock in portfolio" })
                } else {
                    if (newUnits < 0) {
                        Portfolio.updateOne({ userId: req.user, "stocks.ticker": ticker },
                            { $set: { "stocks.$.marketPrice": (currentPrice.toFixed(2)).toString(10) } })
                            .then(result => {
                                console.log("marketPrice Updated")
                            })
                            .catch(err => {
                                console.log(err);
                            })
                        return res.status(422).json({ error: "Can't sell more that what you hold" })
                    }
                    if (newUnits > 0) {
                        Portfolio.updateOne({ userId: req.user, "stocks.ticker": ticker },
                            { $set: { 
                                "stocks.$.units": (newUnits.toFixed(2)).toString(10), 
                                "stocks.$.marketPrice": (currentPrice.toFixed(2)).toString(10) } 
                            })
                            .then(result => {
                                return res.json({ portfolio: result })
                            })
                            .catch(err => {
                                return console.log(err);
                            })
                    } else {
                        Portfolio.updateOne({ userId: req.user },
                            { $pull: { stocks: { ticker: ticker } } })
                            .then(result => {
                                return res.json({ portfolio: result })
                            })
                            .catch(err => {
                                return console.log(err);
                            })
                    }

                }

            }).catch(err => {
                return console.log(err);
            })


    });


})


module.exports = router
