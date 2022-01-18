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
            type:String,
            required:true
        },
        units:{
            type:String,
            required:true
        },
        marketPrice:{
            type:String,
            required:true
        }

    }],
    userId:{
        type:ObjectId,
        ref:"User"
    },
    totalStocks:{
        type:String,
        required:false
    },
    investedAmount:{
        type:String,
        required:false
    },
    currentAmount:{
        type:String,
        required:false
    },
    pal:{
        type:String,
        required:false
    }
    

})

mongoose.model("Portfolio", portfolioSchema);
