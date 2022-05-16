const express = require('express');
const mongoose = require('mongoose');
const app = express();
const ejs = require('ejs');

app.set('view engine', 'ejs');

mongoose.connect('mongodb://localhost:27017/MyForm');

var db = mongoose.connection;

const detailSchema = {
    name: String,
    age: String,
    city: String,
    phone: String
}

const Data = mongoose.model('details', detailSchema);

app.get('/', (req, res) => {
    Data.find({}, function (err, data) {
        res.render('index', {
            dataList: data
        })
    })
})


app.listen(4000, function () {
    console.log('server is running at port 4000');
})