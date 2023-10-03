let methods = {};
const express = require('express');
const bodyParser = require('body-parser');
const app = express.Router();
const pool = require('../lib/_dbaccess');
const DB = pool.pool;
const cors = require('cors');
var jwt = require('jsonwebtoken');

var bcrypt = require('bcrypt');
var salt = bcrypt.genSaltSync(10);

app.use(cors());
app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

function authToken(rawToken) {
    let data = {
        status : false,
        data : null
    }
    const token = rawToken && rawToken.split(' ')[1];
    // console.log(rawToken.split(" "))
    if (token == null) {
        console.log("token kosong")
    } else {
        try {
            var verify = jwt.verify(token, process.env.jwt_token);
            data.status = true
            data.data = verify
        } catch (error) {
            const ww = JSON.stringify(error)
            data.data = JSON.parse(ww)
        }
        
        // console.log(verify);

    }
    return data;
}


function login(username, password) {
    let dataresult = {
        username: "",
        roleno: "",
        customer_id: "",
        branch_id: "",
        is_active: false,
        status: false
    }
    console.log(username, password)
    return new Promise((resolve) => {
        DB.query("SELECT * FROM users WHERE username=" + "'" + username + "'",
            (error, results) => {
                // console.log(error, results)
                if (error) {
                    dataresult.status = false;
                    dataresult.message = error.detail
                } else {
                    console.log(results.rows.length);
                    if (results.rows.length == 1) {
                        console.log(results);
                        if (bcrypt.compareSync(password, dataresult.username = results['rows'][0]['password'])) {
                            dataresult.username = results['rows'][0]['username'];
                            dataresult.roleno = results['rows'][0]['roleno'];
                            dataresult.customer_id = results['rows'][0]['customer_id'];
                            dataresult.branch_id = results['rows'][0]['branch_id'];
                            dataresult.status = true;
                            dataresult.is_active = results['rows'][0]['is_active'];
                        }else{
                            dataresult.message = "Password Salah !"
                        }
                    } else {
                        dataresult.message = "user_not_found";
                    }
                }
                resolve(dataresult)
            }
        )
    })
}

// function login(username, password) {
//     let dataresult = {
//         username: "",
//         roleno: "",
//         customer_id: "",
//         branch_id: "",
//         is_active: false,
//         status: false
//     }

//     return new Promise((resolve) => {
//         DB.query("SELECT * FROM users WHERE username=" + "'" + username + "'",
//             (error, results) => {
//                 if (error) {
//                     dataresult.status = false;
//                     dataresult.message = error.detail
//                     resolve(dataresult)
//                 }
//                 console.log(results.rows)
//                 if (results.rows.length < 1 || results.rows.length > 1) {
//                     dataresult.message = "user_not_found";
//                     resolve(dataresult)
//                 }
//                 if (!bcrypt.compareSync(password, dataresult.username = results['rows'][0]['password'])) {
//                     dataresult.message = "Password Salah !"
//                     resolve(dataresult)
//                 }

//                 dataresult.username = results['rows'][0]['username'];
//                 dataresult.roleno = results['rows'][0]['roleno'];
//                 dataresult.customer_id = results['rows'][0]['customer_id'];
//                 dataresult.branch_id = results['rows'][0]['branch_id'];
//                 dataresult.status = true;
//                 dataresult.is_active = results['rows'][0]['is_active'];
//                 resolve(dataresult)
//             })
//     })
// }

module.exports = {
    login,
    authToken
}