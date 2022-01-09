const mongoose = require('mongoose')
const {ObjectId,Decimal128} = mongoose.Schema.Types;


const subSchema = new mongoose.Schema({
    ticker:{
        type:String,
        required:true
    },
    Price:{
        type:Decimal128,
        required:true
    },
    units:{
        type:Decimal128,
        required:true
    }
})

const portfolioSchema = new mongoose.Schema({
    stocks:[{
        ticker:{
            type:String,
            required:true
        },
        price:{
            type:Decimal128,
            required:true
        },
        units:{
            type:Decimal128,
            required:true
        }
    }],
    userId:{
        type:ObjectId,
        ref:"User"
    }
})

mongoose.model("Portfolio", portfolioSchema);
