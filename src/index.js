const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
const route = require('./routes/route');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


mongoose.set('strictQuery', true)

mongoose.connect("mongodb://localhost:27017/small_commercial_webapp",
    { useNewUrlParser: true })
    .then(()=> console.log("MongoDB connected succesfully"))
    .catch((err)=> console.log(err))

    app.use('/', route);

app.listen(3000, ()=>{console.log("App running on port", 3000)});