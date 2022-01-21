const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types;

const transactionSchema = new mongoose.Schema({
    transactions: [
        {
            ticker: {
                type: String,
                required: true
            },
            price: {
                type: String,
                required: true
            },
            units: {
                type: String,
                required: true
            },
            order: {
                type: Number,
                required: true
            },
            orderType: {
                type: String,
                required: true
            }
        }
    ],
    userId: {
        type: ObjectId,
        ref: "User"
    },
    oldest: {
        type: Number,
        required: true
    },
    latest: {
        type: Number,
        required: true
    },
    full:{
        type: Boolean,
        required: true
    }

})

mongoose.model("Transaction", transactionSchema);
