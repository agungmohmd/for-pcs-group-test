const express = require('express');
const bodyParser = require('body-parser');
const app = express.Router();
const cors = require('cors');
const DB = require('../lib/_dbaccess').pool;
const auth = require('../middleware/reqAuth');
const axios = require('axios');

const extAPI = require('../middleware/axiosReq');

var respx = require('../helper/respFormat');

var async = require('async');

let nodeDate = require('date-and-time');
const {
    query
} = require('express');

app.use(cors());
app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true
    })
)

app.get('/test-sms-campaign', (req, res) => {
    res.send({
        message: 'SMS Campaign File is Working Good'
    })
});

// app.post('/test-approval', (req, res) => {
//     var data = 'guid=kl1jd545002920b10000012tvnDEMOOPXMLP&errorcode=5';
//     let arr = data.split('&');
//     let obj = [];
//     arr.forEach(function (i, v) {
//         let arr2 = i.split('=');
//         obj.push({
//             [arr2[0]]: arr2[1]
//         });
//     });

//     var currentdate = new Date();
//     var datetime = currentdate.getDate() + "/" +
//         (currentdate.getMonth() + 1) + "/" +
//         currentdate.getFullYear() + " " +
//         currentdate.getHours() + ":" +
//         currentdate.getMinutes() + ":" +
//         currentdate.getSeconds();

//     // var newdatetime = currentdate.today() + " " + currentdate.timeNow
//     let now = nodeDate.format(new Date(), 'DD-MM-YYYY hh:mm:ss');
//     console.log(now);

//     // console.log(urlString)
//     // axios.post(urlString, {})
//     //     .then(res => {
//     //         console.log(res.data)
//     //         //update the campaign transacts based on campaigns and phone number here
//     //     })
// })



app.post('/campaign', (req, res) => {
    let dd = auth.authToken(req.headers['authorization']);
    // dd.status ? console.log("betul") : console.log("salah")

    if (dd.status) {

        if (dd.data.roleno == 3) {

            let phone = req.body.phone.split(',');

            function checkForDuplicatePhone(phoneList) {
                return new Set(phoneList).size !== phoneList.length
            }
            var check = checkForDuplicatePhone(phone)
            // console.log(check)
            if (check) {
                res.send(
                    respx.send('Duplicate phone number exist in the list', false, [], 409)
                )
                return false
            }
            if (req.body.campaign_name.length === 0) {
                res.send(
                    respx.send('Campaign Name Tidak Boleh Kosong!', false, [], 403)
                )
                return false
            }
            // else if (req.body.campaignid.length === 0) {
            //     res.send(
            //         respx.send('Campaign ID Tidak Boleh Kosong!', false, [], 403)
            //     )
            //     return false
            // } 
            else if (req.body.message.length === 0) {
                res.send(
                    respx.send('Message Tidak Boleh Kosong!', false, [], 403)
                )
                return false
            }

            let reg = /^0/;
            DB.query('select * from campaigns', (erx, rex) => {
                let count = rex.rowCount + 1;
                let cmpid = "CMPN" + count;
                console.log(rex.rowCount, count, cmpid)
                let queries = `insert into campaigns(campaignid, campaign_name, created_by, created_on, customer_id, branch_id, message, scheduled_on, is_scheduled) values($1, $2, $3, $4, $5, $6, $7, $8, $9)`;
                DB.query(queries,
                    [cmpid, req.body.campaign_name, dd.data.username, req.body.created_on, dd.data.customer_id, dd.data.branch_id, req.body.message, req.body.scheduled_on, req.body.is_scheduled], (error, results) => {
                        console.log(queries)
                        if (error) {
                            res.send({
                                error: error.detail
                            })
                            throw error
                        }


                        let queryplus = '';
                        phone.forEach(e => {
                            let singlePhone = e //.replace(reg, "62");
                            queryplus += `('${cmpid}','${singlePhone.trim()}'),`
                        });


                        DB.query(`INSERT into campaign_transacts (campaignid, phone_number) values ${queryplus.substring(0, queryplus.length - 1)}`, (error, results) => {
                            if (error) {
                                res.send({
                                    error: error
                                })
                                throw error
                            }
                            res.send(
                                respx.send('Campaigns added, waiting for approval', true, [], 200)
                            )
                        })
                    })
            })
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

    //call role checking here

    //do save campaign to campaigns table

    //do save campaign to campaign_transacts table
});

app.get('/campaign', (req, res) => {
    let dd = auth.authToken(req.headers['authorization']);

    if (dd.status) {
        if (dd.data.roleno == 2) {
            if (dd.data.username == 'adminlottemart') {
                console.log("You are admin mart")
                if (req.query.campaignid) {
                    DB.query(`select * from campaigns where created_by like 'Mart%' and campaignid = '${req.query.campaignid}' and customer_id = '${dd.data.customer_id}'`, (error, results) => {
                        if (error) {
                            res.send({
                                error: error.detail
                            })
                        }
                        // console.log(results)
                        res.send(
                            respx.send('Success', true, results.rows, 200)
                        )
                    })
                } else {
                    console.log("You are admin mart without campaignid")
                    DB.query(`select * from campaigns where created_by like 'Mart%' or created_by = 'lottemartindonesia@gmail.com' and customer_id = '${dd.data.customer_id}'  order by created_on asc`, (error, results) => {
                        if (error) {
                            res.send({
                                error: error.detail
                            })
                        }
                        // console.log(results)
                        res.send(
                            respx.send('Success', true, results.rows, 200)
                        )
                    })
                }
            } else if (dd.data.username == 'adminlottegrosir') {
                console.log("you are admin grosir")
                if (req.query.campaignid) {
                    let query = `select * from campaigns where created_by like 'Grosir%' and campaignid = '${req.query.campaignid}' and customer_id = '${dd.data.customer_id}'`;
                    console.log(query)
                    DB.query(query, (error, results) => {
                        if (error) {
                            res.send({
                                error: error.detail
                            })
                        }
                        // console.log(results)
                        res.send(
                            respx.send('Success', true, results.rows, 200)
                        )
                    })
                } else {
                    console.log("You are admin grosir without campaignid")
                    let query = `select * from campaigns where created_by like 'Grosir%' or created_by = 'lottegrosir@gmail.com' and customer_id = '${dd.data.customer_id}' order by created_on asc`;
                    console.log(query)
                    DB.query(query, (error, results) => {
                        if (error) {
                            res.send({
                                error: error.detail
                            })
                        }
                        // console.log(results)
                        res.send(
                            respx.send('Success', true, results.rows, 200)
                        )
                    })
                }
            } else {
                console.log("You are admin of nothing")
                res.send(
                    respx.send('admin not recognized for a while, contact the superuser')
                )
            }

        } else if (dd.data.roleno == 3) {
            let query = `select * from campaigns where created_by = '${dd.data.username}' order by created_on asc`
            console.log(query)
            DB.query(query, (error, results) => {
                if (error) {
                    res.send({
                        error: error.detail
                    })
                }
                // console.log(results)
                res.send(
                    respx.send('Success', true, results.rows, 200)
                )
            })
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
});

app.post('/dlr-url', (req, res) => {
    console.log(req.body);
    console.log(req.query)
})

app.post('/campaign-approval', (req, res) => {
    let dd = auth.authToken(req.headers['authorization']);

    if (dd.status) {
        if (dd.data.roleno == 2) {
            // do check if the campaign is already approved/rejected
            let query = `select * from campaigns where campaignid = '${req.body.campaignid}' and approval is not null`
            DB.query(query, (erw, resw) => {
                if (erw) {
                    res.send({
                        error: erw.detail
                    })
                    throw error
                }
                // console.log(results.rows.length)
                if (resw.rows.length > 0) {
                    res.send(
                        respx.send('The campaign is already approved or rejected, you can create new campaign to re assign this', false, [], 403)
                    )
                    throw error
                } else {
                    let isapproved
                    if (req.body.isapproved) {
                        isapproved = '1';
                        DB.query(`update campaigns set approval = '${isapproved}', approved_on = '${req.body.approved_on}', approved_by = '${dd.data.username}' where campaignid = '${req.body.campaignid}'`, (error, results) => {
                            if (error) {
                                res.send({
                                    error: error.detail
                                })
                                throw error
                            }
                            DB.query(`select * from campaigns where campaignid = '${req.body.campaignid}'`, (err, rex) => {
                                if (err) {
                                    res.send({
                                        error: err.detail
                                    })
                                    throw error
                                }
                                let cmpid = rex.rows[0].campaignid
                                console.log(rex.rows[0].created_by)
    
                                // schdl = rex.rows[0].scheduled_on.replace("Z", " ").replace("T", "").slice(0, -4)
                                if (rex.rows[0].is_scheduled) {
                                    let scheduleDate = rex.rows[0].scheduled_on;
                                    let isoDate = new Date(scheduleDate.getTime() - (scheduleDate.getTimezoneOffset() * 60000)).toISOString().replace("T", " ").replace("Z", "").slice(0, -4);
                                    let queryInsert = `insert into tasks (campaignid, scheduled_on) values ('${cmpid}', '${isoDate}')`
                                    DB.query(queryInsert, (ers, ress) => {
                                        console.log(queryInsert)
                                        if (ers) {
                                            res.send({
                                                error: ers.detail
                                            })
                                            throw error
                                        }
                                        res.send(
                                            respx.send(`The campaign with id ${req.body.campaignid} has been updated`, true, [], 200)
                                        )
                                    })
                                } else {
                                    let currentdate = new Date();
                                    var isoDateTime = new Date(currentdate.getTime() - (currentdate.getTimezoneOffset() * 60000)).toISOString().replace("T", " ").replace("Z", "").slice(0, -4);
                                    let senderid;
                                    switch (true) {
                                        case /^Mart/.test(rex.rows[0].created_by):
                                            senderid = 'LOTTEMART'
                                            break;
                                        case /^Grosir/.test(rex.rows[0].created_by):
                                            senderid = 'LOTTEGROSIR'
                                            break;
                                        case rex.rows[0].created_by == "lottegrosir@gmail.com":
                                            senderid = 'LOTTEGROSIR'
                                            break
                                        case rex.rows[0].created_by == "lottemartindonesia@gmail.com":
                                            senderid = "LOTTEMART"
                                            break
                                        default:
                                            senderid = "LOTTEINDONESIA"
                                            break;
                                    }
                                    DB.query(`update campaign_transacts set trysend_at = '${isoDateTime}' where campaignid = '${cmpid}'`, (serr, sres) => {
                                        if (serr) {
                                            res.send({
                                                error: serr.detail
                                            })
                                            throw error;
                                        }
                                        let qewry = `select ct.phone_number, c.message from campaign_transacts ct
                                        inner join campaigns c on ct.campaignid = c.campaignid 
                                        where ct.campaignid = '${cmpid}'`;
                                        DB.query(qewry, (perr, pres) => {
                                            console.log(qewry)
                                            if (perr) {
                                                res.send({
                                                    error: perr.detail
                                                })
                                                throw error
                                            }
                                            let message = pres.rows[0].message;
                                            let phones = pres.rows.map(i => i.phone_number)
                                            async.each(phones, function (phone, callback) {
                                                console.log(senderid)
                                                axios.post(`http://www.myvaluefirst.com/smpp/sendsms?username=${process.env.smssenderid}&password=${process.env.smssenderpswd}&to=${phone}&from=${senderid}&text=${message}&dlr-mask=19&category=Bulk`, {})
                                                    .then(rev => {
                                                        let data = rev.data;
                                                        let arr = data.split('&');
                                                        let obj = [];
                                                        arr.forEach(function (i, v) {
                                                            let arr2 = i.split('=');
                                                            obj.push({
                                                                [arr2[0]]: arr2[1]
                                                            });
                                                        });
                                                        let now = nodeDate.format(new Date(), 'YYYY-MM-DD hh:mm:ss');
                                                        let queryStr = `update campaign_transacts set guid = '${obj[0].guid}', errcode = '${obj[1].errorcode}', is_delivered = true, delivered_at = '${now}' where campaignid = '${cmpid}' and phone_number = '${phone}'`;
                                                        DB.query(queryStr, (uerr, ures) => {
                                                            console.log(queryStr)
                                                        })
                                                    })
                                                callback()
                                            }, function (errv) {
                                                if (errv) {
                                                    res.send(
                                                        respx.send(`Theres some error on blasting sms to campaign ${req.body.campaignid}, you can try it later or call our support`, false, [], 200)
                                                    )
                                                } else {
                                                    res.send(
                                                        respx.send(`The campaign with id ${req.body.campaignid} has been updated`, true, [], 200)
                                                    )
                                                }
                                            });
                                        })
                                    })
                                }
                                console.log(rex.rows[0].campaignid)
                            })
                        })
                    } else {
                        isapproved = '0';
                        DB.query(`update campaigns set approval = '${isapproved}', approved_on = '${req.body.approved_on}', approved_by = '${dd.data.username}' where campaignid = '${req.body.campaignid}'`, (rerr, rres) => {
                            if (rerr) {
                                res.send({
                                    error : rerr.detail
                                })
                            } else {
                                res.send(
                                    respx.send(`Campaign with id ${req.body.campaignid} has been rejected`, true, [], 200)
                                )
                            }
                        })
                    }
                    
                }
            })
        } else {
            res.send(
                respx.send('Anda tidak punya hak akses', false, [], 403)
            )
        }
    } else {
        res.send(
            respx.send('Anda tidak punya hak akses', false, [], 403)
        )
    }
})

app.get('/sms-report', (req, res) => {
    let dd = auth.authToken(req.headers['authorization']);

    if (dd.status) {
        if (dd.data.roleno == 2) {
            DB.query(`select ct.id, ct.campaignid , ct.phone_number , c.message, c.created_by, ct.trysend_at , ct.trysend_at , ct.is_delivered , ct.delivered_at, ct.guid , ct.errcode from campaign_transacts ct
            inner join campaigns c on ct.campaignid = c.campaignid 
            where ct.campaignid = '${req.query.campaignid}'`, (error, results) => {
                if (error) {
                    res.send({
                        error: error.detail
                    })
                    throw error
                }

                res.send(
                    respx.send('Success', true, results.rows, 200)
                )

            })
        } else {
            res.send(
                respx.send('Anda tidak punya hak akses', false, [], 403)
            )
        }
    } else {
        res.send(
            respx.send('Anda tidak punya hak akses', false, [], 403)
        )
    }
})

module.exports = app;