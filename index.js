const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const pool = require('./lib/_dbaccess');
const DB = pool.pool;
const app = express();
const port = 5000;
const axios = require('axios');
const cron = require('node-cron');

//include routing for every project
const Auth = require('./project/Auth')
const User = require('./project/User')
const Product = require('./project/Product')
const Order = require('./project/Order')

var bcrypt = require('bcrypt');
var salt = bcrypt.genSaltSync(10);
var async = require('async');
var nodeDate = require('date-and-time');
var moment = require('moment');
// moment().format();

app.use(cors());
app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

//use routing for project
app.use('/api/auth', Auth);
app.use('/api/user', User);
app.use('/api/product', Product);
app.use('/api/order', Order)


app.get('/', (req, res) => {
    res.json({
        info: 'sms dashboard api is running'
    })
})

//start listen, always place it under
app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})
//end listen