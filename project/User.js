const express = require('express');
const bodyParser = require('body-parser');
const app = express.Router();
const cors = require('cors');
const DB = require('../lib/_dbaccess').pool;
const auth = require('../middleware/reqAuth');
const axios = require('axios');

const extAPI = require('../middleware/axiosReq');

var bcrypt = require('bcrypt');
var respx = require('../helper/respFormat');
var salt = bcrypt.genSaltSync(10);
var async = require('async');

let nodeDate = require('date-and-time');

app.use(cors());
app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true
    })
)

app.get('/test-user', (req, res) => {
    res.send({
        message: 'User File is Working Good'
    })
});

// app.get('/test', (req, res) => {
//     let dd = auth.authToken(req.headers['authorization']);
//     console.log(dd)
// })

app.get('/user', (req, res) => {
    let dd = auth.authToken(req.headers['authorization']);

    if (dd.status) {
        if (dd.data.roleno == 1) {
            if (req.query.username) {
                DB.query(`select * from users where username = '${req.query.username}'`, (error, results) => {
                    if (error) {
                        res.send({
                            error: error.detail
                        })
                        throw error
                    } else {
                        res.send(
                            respx.send('Success', true, results.rows, 200)
                        )
                    }
                })
            } else {
                DB.query(`select * from users`, (error, results) => {
                    if (error) {
                        res.send({
                            error: error.detail
                        })
                        throw error
                    } else {
                        res.send(
                            respx.send('Success', true, results.rows, 200)
                        )
                    }
                })
            }
        } else {
            res.send(
                respx.send('You cant access this', false, [], 403)
            )
        }
    } else {
        res.send(
            respx.send('You cant access this', false, [], 403)
        )
    }
})

app.post('/user', (req, res) => {
    let dd = auth.authToken(req.headers['authorization']);

    if (dd.status) {
        if (dd.data.roleno == 1) {
            function hasWhiteSpace(s) {
                return s.indexOf(' ') >= 0;
            }

            let userwhitespace = hasWhiteSpace(req.body.username);
            if (userwhitespace) {
                res.send({
                    error: "Mind the whitespace for the username"
                })
                throw error
            }

            console.log(userwhitespace);
            let currentdate = new Date();
            var isoDateTime = new Date(currentdate.getTime() - (currentdate.getTimezoneOffset() * 60000)).toISOString().replace("T", " ").replace("Z", "").slice(0, -4);

            let insertData = {
                username: req.body.username,
                password: bcrypt.hashSync(req.body.password, salt),
                roleno: req.body.roleno,
                created_by: dd.data.username,
                created_on: isoDateTime
            }

            DB.query(`INSERT INTO users(username, password, roleno, created_by, created_on, customer_id, branch_id, is_active)
              VALUES ($1, $2, $3, $4, $5, $6, $7, $8);`, [insertData.username, insertData.password, insertData.roleno, insertData.created_by, insertData.created_on, 1, 1, 1],
                (error, results) => {
                    if (error) {
                        res.send({
                            error: error.detail
                        })
                        throw error
                    }
                    console.log(results)
                    // res.status(200).send({
                    //     success: `Users Added`
                    // })
                    res.send(
                        respx.send(`Username ${req.body.username} added`, true, [], 200)
                    )
                }
            );
        } else {
            res.send(
                respx.send('You cant access this', false, [], 403)
            )
        }
    } else {
        res.send(
            respx.send('You cant access this', false, [], 403)
        )
    }
})


app.post('/userregister', (req, res) => {
    function hasWhiteSpace(s) {
        return s.indexOf(' ') >= 0;
    }
    let userwhitespace = hasWhiteSpace(req.body.username);
    if (userwhitespace) {
        res.send({
            error: "Mind the whitespace for the username"
        })
        throw error
    }

    console.log(userwhitespace);
    let currentdate = new Date();
    var isoDateTime = new Date(currentdate.getTime() - (currentdate.getTimezoneOffset() * 60000)).toISOString().replace("T", " ").replace("Z", "").slice(0, -4);

    let insertData = {
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password, salt),
        roleno: 3,
        created_by: 'userregister',
        created_on: isoDateTime
    }

    DB.query(`INSERT INTO users(username, password, roleno, created_by, created_on, customer_id, branch_id, is_active)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8);`, [insertData.username, insertData.password, insertData.roleno, insertData.created_by, insertData.created_on, 1, 1, 1],
        (error, results) => {
            if (error) {
                res.send({
                    error: error.detail
                })
                throw error
            }
            console.log(results)
            // res.status(200).send({
            //     success: `Users Added`
            // })
            let queree = `insert into customers (customer_name, username) values ('${req.body.customername}', '${insertData.username}')`
            console.log(queree)
            DB.query(queree, (erx, rex) => {
                if (erx) {
                    res.send({
                        error: erx.detail
                    })
                    throw error
                }
                console.log( )
                res.send(
                    respx.send(`Username ${req.body.username} added`, true, [], 200)
                )
            })
            
        }
    );
})

module.exports = app