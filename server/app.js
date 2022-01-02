const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = 5000;
const {MONGOURI} = require('./keys');


mongoose.connect(MONGOURI);
mongoose.connection.on('connected',()=>{
    console.log("connected to mongo");
})
mongoose.connection.on('error',(err)=>{
    console.log("error faced while connecting to mongo: ", err);
})
//app.use(customMiddleware);        will use middelware for all the routes

app.get('/', (req,res)=>{
    res.send("hello world");
})

app.listen(PORT, ()=>{
    console.log("server is running on ", PORT);
})