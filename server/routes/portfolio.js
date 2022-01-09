const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Portfolio = mongoose.model("Portfolio");
const requireLogin = require('../middleware/requireLogin')

router.post('/addStock',requireLogin, (req, res) => {
    const { ticker, price, units } = req.body;
    if (!ticker || !price || !units) {
        return res.status(422).json({ error: "please add all the fields" })
    }

    var oldPrice = 0 ,oldUnits = 0;
    Portfolio.findOne({ userId: req.user })
    .then(savedUser=>{
        if(savedUser){
            for(let i in savedUser.stocks){
                console.log("i :" +  savedUser.stocks[i])
                if(i.ticker == ticker){
                    oldPrice = savedUser.stocks[i].price;
                    oldUnits = savedUser.stocks[i].units;
                }
            }
            console.log("oldUnits :" + oldUnits);
            console.log("oldPrice :" + oldPrice);
        }
    })

    let newPrice = (oldUnits*oldPrice + price*units)/(oldUnits + units);
    let newUnits = oldUnits + units;
    console.log("new unit :" + newUnits );
    console.log("new price :" + newPrice);

})



module.exports = router


