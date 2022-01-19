const express = require('express');
const mongoose = require('mongoose');
const app = express();
var cors = require('cors')
const PORT = 5000;
const {MONGOURI} = require('./keys');


app.use(cors())

mongoose.connect(MONGOURI);
mongoose.connection.on('connected',()=>{
    console.log("connected to mongo");
})
mongoose.connection.on('error',(err)=>{
    console.log("error faced while connecting to mongo: ", err);
})
//app.use(customMiddleware);        will use middelware for all the present routes

require('./models/user')
require('./models/portfolio')
require('./models/transaction')
app.use(express.json());


app.use(require('./routes/auth'))
app.use(require('./routes/portfolio'))


app.listen(PORT, ()=>{
    console.log("server is running on ", PORT);
})