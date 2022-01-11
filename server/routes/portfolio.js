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
                return res.json({ stock: savedUser.stocks })
            } else {
                return res.status(404).json({ error: "User not found" })
            }
        }).catch(err => {
            return console.log(err);
        })
})

router.post('/buyStock', requireLogin, (req, res) => {
    let { ticker, price, units } = req.body;
    ticker = ticker.toUpperCase();
    const requestOptions = {
        url: 'https://api.polygon.io/v3/reference/tickers/' + ticker + '?apiKey=3YOEatP_dFTRx1HcJezrQvLaWi6iEGKB',
        method: 'GET',
        json: {
            ticker,
            price,
            units
        },
    };
    request(requestOptions, (err, response, body) => {
        if (err) {
            return console.log(err);
        } else if (response.body.status == "NOT_FOUND") {
            return res.status(404).json({ error: "TICKER NOT FOUND" })
        } else {
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
                                oldPrice = + savedUser.stocks[i].price;
                                oldUnits = + savedUser.stocks[i].units;
                                flag = + 1;
                            }
                        }

                    }
                    var EnteredUnits = + units;
                    var EnteredPrice = + price;
                    let newPrice = ((oldUnits * oldPrice) + (EnteredUnits * EnteredPrice));
                    newPrice = newPrice / ((oldUnits) + (EnteredUnits));
                    let newUnits = (oldUnits) + (EnteredUnits);
                    if (flag == 0) {
                        Portfolio.updateOne({ userId: req.user },
                            {
                                $push: {
                                    stocks: {
                                        ticker,
                                        price: newPrice,
                                        units: newUnits
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
                            { $set: { "stocks.$.units": newUnits, "stocks.$.price": newPrice } })
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
        }
    });


})

router.post('/sellStock', requireLogin, (req, res) => {
    let { ticker, price, units } = req.body;
    ticker = ticker.toUpperCase();

    const requestOptions = {
        url: 'https://api.polygon.io/v3/reference/tickers/' + ticker + '?apiKey=3YOEatP_dFTRx1HcJezrQvLaWi6iEGKB',
        method: 'GET',
        json: {
            ticker,
            price,
            units
        },
    };
    request(requestOptions, (err, response, body) => {
        if (err) {
            return console.log(err);
        } else if (response.body.status == "NOT_FOUND") {
            return res.status(404).json({ error: "TICKER NOT FOUND" })
        } else {
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
                                oldPrice = + savedUser.stocks[i].price;
                                oldUnits = + savedUser.stocks[i].units;
                                flag = + 1;
                            }
                        }

                    }
                    var EnteredUnits = + units;
                    var EnteredPrice = + price;
                    let newUnits = (oldUnits) - (EnteredUnits);


                    if (flag == 0) {
                        return res.status(422).json({ error: "Currently don't have this stock in portfolio" })
                    } else {
                        if (newUnits < 0) {
                            return res.status(422).json({ error: "Can't sell more that what you hold" })
                        }
                        if (newUnits > 0) {
                            Portfolio.updateOne({ userId: req.user, "stocks.ticker": ticker },
                                { $set: { "stocks.$.units": newUnits } })
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
        }

    });


})


module.exports = router
