const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Portfolio = mongoose.model("Portfolio");
const requireLogin = require('../middleware/requireLogin')

router.post('/addStock', requireLogin, (req, res) => {
    const { ticker, price, units } = req.body;
    if (!ticker || !price || !units) {
        return res.status(422).json({ error: "please add all the fields" })
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
                        console.log(flag);
                        console.log(typeof (flag));
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
})



module.exports = router
