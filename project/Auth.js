const express = require('express');
const bodyParser = require('body-parser');
const app = express.Router();
const cors = require('cors');
var jwt = require('jsonwebtoken');
var auth = require('../lib/_auth')

var bcrypt = require('bcrypt');
var salt = bcrypt.genSaltSync(10);

app.use(cors());
app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)


app.get('/test-auth', (req, res) => {
    res.send({
        message: 'auth file is working good'
    })
})


app.post('/login', (req, res) => {
    let data = {
        "message": "",
        "status": false,
        "data": [],
        "response_code": 200
    }

    if (req.body.username && req.body.password) {
        auth.login(req.body.username, req.body.password).then(async function (result) {
            if (result.status) {
                console.log(result)
                if (result.is_active) {
                    let new_token = {
                        username: req.body.username,
                        roleno: result.roleno,
                        customer_id: result.customer_id,
                        branch_id: result.branch_id
                      }
                    let token_jwt = jwt.sign(new_token, process.env.jwt_token, {
                        expiresIn: process.env.tokenLife
                    });
                    let refreshToken = jwt.sign(new_token, process.env.jwt_token, {
                        expiresIn: process.env.refreshTokenLife
                    });
    
                    jwt.verify(token_jwt, process.env.jwt_token, function (err, decoded) {
                        if (!err) {
                            console.log("--------------------------------")
                            console.log(decoded)
                            console.log("--------------------------------")
                            data['data'] = {
                                token: token_jwt,
                                refreshToken: refreshToken,
                                data: result,
                                exp: decoded['exp']
                            };
                            //auth.create_token(data['data'], result['data']['employeeID']);
                            data['message'] = result['message'];
                            data['status'] = result['status'];
                        } else {
                            data['message'] = err;
                            data['status'] = false;
                        }
                        res.send(data)
                    });
                } else {
                    res.send({
                        error: "user anda tidak aktif"
                    })
                }
            } else {
                data.message = result.message;
                data.response_code = 418
                res.send(data)
            }
        })
    }
})

module.exports = app