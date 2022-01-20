const express = require('express');
const router = express.Router();

const request = require('request');
const mongoose = require('mongoose');
const Portfolio = mongoose.model("Portfolio");
const Transaction = mongoose.model("Transaction");
const requireLogin = require('../middleware/requireLogin')

router.get('/userTransactions', requireLogin, (req, res) => {
    Transaction.findOne({ userId: req.user })
        .then(savedUser => {
            if (savedUser) {
                console.log("found the user")
                var t1,t2,t3,t4,t5;
                var oldest = savedUser.oldest;
                var size = + 0;
                for (let i in savedUser.transactions) {
                    size = size + 1;
                    if (savedUser.transactions[i].order == oldest) {
                       t1 = savedUser.transactions[i];
                    }
                    if (savedUser.transactions[i].order == (oldest+1)%5) {
                        t2 = savedUser.transactions[i];
                     }
                     if (savedUser.transactions[i].order == (oldest+2)%5) {
                        t3 = savedUser.transactions[i];
                     }
                     if (savedUser.transactions[i].order == (oldest+3)%5) {
                        t4 = savedUser.transactions[i];
                     }
                     if (savedUser.transactions[i].order == (oldest+4)%5) {
                        t5 = savedUser.transactions[i];
                     }
                }
                var transactions;
                if(size == 1){
                     transactions = [t1];
                }
                else if(size == 2){
                     transactions = [t2,t1];
                }
                else if(size == 3){
                    transactions = [t3,t2,t1];
                }
                else if(size == 4){
                     transactions = [t4,t3,t2,t1];
                }
                else if(size == 5){
                     transactions = [t5,t4,t3,t2,t1];
                }
                res.json({transactions })
            } else {      
                var transactions = [];      
                res.json({ transactions })
            }
        }).catch(err => {
            return console.log(err);
        })
})

router.get('/userProfile', requireLogin, (req, res) => {
    Portfolio.findOne({ userId: req.user })
        .then(savedUser => {
            if (savedUser) {

                console.log("found the user")

                var totalStocks = + 0, investedAmount = + 0, currentAmount = + 0, pal = + 0;
                for (let i in savedUser.stocks) {

                    console.log("i :" + savedUser.stocks[i])
                    totalStocks = totalStocks + 1;
                    console.log(totalStocks)
                    investedAmount = investedAmount + parseFloat(savedUser.stocks[i].price) * parseFloat(savedUser.stocks[i].units)
                    console.log(investedAmount)
                    currentAmount = currentAmount + parseFloat(savedUser.stocks[i].marketPrice) * parseFloat(savedUser.stocks[i].units)
                    console.log(currentAmount)
                    pal = (currentAmount - investedAmount)
                    console.log(pal)
                }


                var data = [
                    {
                        investedAmount,
                        currentAmount,
                        totalStocks,
                        pal
                    }
                ]
                console.log(data)
                res.json({ data })
            } else {
                var data = [
                    {
                        investedAmount: 0,
                        currentAmount: 0,
                        totalStocks: 0,
                        pal: 0
                    }
                ]
                res.json({ data })
            }
        }).catch(err => {
            return console.log(err);
        })
})

router.get('/allUserStocks', requireLogin, (req, res) => {
    Portfolio.findOne({ userId: req.user })
        .then(savedUser => {
            if (savedUser) {
                console.log("found the user")
                console.log("savedUser.stocks")
                res.json({ savedUser })
            } else {
                var savedUser = {
                    stocks: []
                }
                res.json({ savedUser })
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

        ////ADDING TRANSACTIONS

        Transaction.findOne({ userId: req.user })
            .then(savedUser => {
                if (savedUser) {
                    if (!savedUser.full) {    //not full, just add at latest+1 order
                        var latest = (savedUser.latest)
                        var isFull = false;
                        if(latest == 3) {  //after the entry of this transaction, all 5 enteries will be there(full)
                            isFull = true;
                        }
                        Transaction.updateOne({ userId: req.user },
                            {
                                $push: {
                                    transactions: {
                                        ticker,
                                        price,
                                        units,
                                        order: (latest) + 1,
                                        orderType: "BUY"
                                    }
                                },
                                $set: {
                                    latest: latest + 1,
                                    full: isFull
                                  }

                            },
                            { upsert: true }
                        ).then(result => {
                            console.log("transaction added")
                        })
                        .catch(err => {
                            console.log("error while adding transaction")
                        })
                    } else {    //replace the transaction which has order == oldest then change oldest = (oldest+1)%5
                       var oldest = savedUser.oldest;
                       oldest = (oldest + 1) %5;
                        Transaction.updateOne({ userId: req.user, "transactions.order": savedUser.oldest },
                            {
                                $set: {
                                    "transactions.$.units": units,
                                    "transactions.$.price": price,
                                    "transactions.$.ticker": ticker,
                                    "oldest": oldest,
                                    "transactions.$.orderType":"BUY"
                                }
                            }).then(result => {
                                console.log("transaction added")
                            })
                            .catch(err => {
                                console.log("error while adding transaction")
                            })
                    }
                } else {  //not a saved user, so create one

                    Transaction.updateOne({ userId: req.user },
                        {
                            $push: {
                                transactions: {
                                    ticker,
                                    price,
                                    units,
                                    order: 0,
                                    orderType: "BUY"
                                }
                            },
                            $set: {
                                latest: 0,
                                full: false,
                                oldest:0
                              }

                        },
                        { upsert: true }
                    ).then(result => {
                        console.log("transaction added for new user")
                    })
                    .catch(err => {
                        console.log("error while adding transaction")
                    })

                }
            })




        Portfolio.findOne({ userId: req.user })
            .then(savedUser => {

                if (savedUser) {
                    console.log("saved user")
                    for (let i in savedUser.stocks) {
                        if (savedUser.stocks[i].ticker == ticker) {
                            oldPrice = + parseFloat(savedUser.stocks[i].price);
                            oldUnits = + parseFloat(savedUser.stocks[i].units);
                            flag = + 1;
                        }
                    }

                }
                var EnteredUnits = + parseFloat(units);

                var EnteredPrice = + parseFloat(price);
                console.log("enterd Price :" + EnteredPrice)
                console.log("entered units :" + EnteredUnits)
                console.log("old units :" + oldUnits)

                let newPrice = ((oldUnits * oldPrice) + (EnteredUnits * EnteredPrice));
                newPrice = newPrice / ((oldUnits) + (EnteredUnits));
                let newUnits = (oldUnits) + (EnteredUnits);
                console.log("new units :" + newUnits)
                console.log("new price :" + newPrice)
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

                    ////// ADDING transaction
                    Transaction.findOne({ userId: req.user })
                    .then(savedUser => {
                        if (savedUser) {
                            if (!savedUser.full) {    //not full, just add at latest+1 order
                                var latest = (savedUser.latest)
                                var isFull = false;
                                if(latest == 3) {  //after the entry of this transaction, all 5 enteries will be there(full)
                                    isFull = true;
                                }
                                Transaction.updateOne({ userId: req.user },
                                    {
                                        $push: {
                                            transactions: {
                                                ticker,
                                                price,
                                                units,
                                                order: (latest) + 1,
                                                orderType: "SELL"
                                            }
                                        },
                                        $set: {
                                            latest: latest + 1,
                                            full: isFull
                                          }
        
                                    },
                                    { upsert: true }
                                ).then(result => {
                                    console.log("transaction added")
                                })
                                .catch(err => {
                                    console.log("error while adding transaction")
                                })
                            } else {    //replace the transaction which has order == oldest then change oldest = (oldest+1)%5
                               var oldest = savedUser.oldest;
                               oldest = (oldest + 1) %5;
                                Transaction.updateOne({ userId: req.user, "transactions.order": savedUser.oldest },
                                    {
                                        $set: {
                                            "transactions.$.units": units,
                                            "transactions.$.price": price,
                                            "transactions.$.ticker": ticker,
                                            "oldest": oldest,
                                            "transactions.$.orderType": "SELL"
                                        }
                                    }).then(result => {
                                        console.log("transaction added")
                                    })
                                    .catch(err => {
                                        console.log("error while adding transaction")
                                    })
                            }
                        } else {  //not a saved user, so create one
        
                            Transaction.updateOne({ userId: req.user },
                                {
                                    $push: {
                                        transactions: {
                                            ticker,
                                            price,
                                            units,
                                            order: 0,
                                            orderType: "SELL"
                                        }
                                    },
                                    $set: {
                                        latest: 0,
                                        full: false,
                                        oldest:0
                                      }
        
                                },
                                { upsert: true }
                            ).then(result => {
                                console.log("transaction added for new user")
                            })
                            .catch(err => {
                                console.log("error while adding transaction")
                            })
        
                        }
                    })

                    if (newUnits > 0) {
                        Portfolio.updateOne({ userId: req.user, "stocks.ticker": ticker },
                            {
                                $set: {
                                    "stocks.$.units": (newUnits.toFixed(2)).toString(10),
                                    "stocks.$.marketPrice": (currentPrice.toFixed(2)).toString(10)
                                }
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
