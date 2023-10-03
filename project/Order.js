const express = require('express');
const bodyParser = require('body-parser');
const app = express.Router();
const cors = require('cors');
const DB = require('../lib/_dbaccess').pool;
const auth = require('../middleware/reqAuth');
const axios = require('axios');
const path = require('path');
const extAPI = require('../middleware/axiosReq');

var respx = require('../helper/respFormat');
var async = require('async');

var multer = require('multer');
var uploads = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'media/receipt/');
        },
        filename: function (req, file, cb) {
            let name = file.originalname.replace(/\s+/g, '-')
            cb(
                null,
                new Date().valueOf() +
                '_' +
                name
            );
        }
    })
})

let nodeDate = require('date-and-time');
const {
    query
} = require('express');
const e = require('express');

app.use(cors());
app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true
    })
)

// app.post('/test-order', (req, res) => {
//     let query = `INSERT INTO public.stashes
//                 (username, productid, product_code, price, qty)
//                 VALUES('${req.body.username}', '${req.body.productid}', '${req.body.product_code}', ${req.body.price}, ${req.body.qty})
//                 returning username`
//                 console.log(query)
//                 DB.query(query, (dberr, dbres) => {
//                     if (dberr) {
//                         res.send(
//                             respx.send('There is some error', false, dberr, 400)
//                         )
//                     } else {
//                         res.send(
//                             respx.send('Success', true, dbres, 200)
//                         )
//                     }
//                 })
//     // res.send({
//     //     message: 'Order File is Working Good'
//     // })
// });

app.post('/test-uploads', uploads.single('image'), (req, res) => {
    console.log(req.file == null)
    const {
        filename,
        mimetype,
        size
    } = req.file;
    console.log(req.file == null)
    const filepath = req.file.path;
    console.log(req.file)
    console.log("url nya : ", filepath)
    res.json({
        success: true,
        filename
    })
})

app.get('/stash', (req, res) => {
    let dd = auth.authToken(req.headers['authorization']);
    if (dd.status) {
        if (dd.data.roleno == 3) {
            DB.query(`select s.*, p.productname, p.description, p.img_url from stashes s 
                      left join products p on s.product_code = p.product_code where username = '${dd.data.username}'`, (dberr, dbres) => {
                
                if (dberr) {
                    res.send(
                        respx.send('Error on db', false, [], 400)
                    )
                } else {
                    res.send(   
                        respx.send('Success', true, dbres.rows, 200)
                    )
                }
            })
        } else {
            res.send(
                respx.send('You cant access this', false, [], 400)
            )
        }
    } else {
        res.send(
            respx.send('You cant access this', false, [], 400)
        )
    }
})

app.post('/stash', (req, res) => {
    let dd = auth.authToken(req.headers['authorization']);
    if (dd.status) {
        if (dd.data.roleno == 3) {
            let lists = req.body
            async.each(lists, function (list, callback) {
                let query = `INSERT INTO public.stashes
                (username, productid, product_code, price, qty)
                VALUES('${dd.data.username}', '${list.productid}', '${list.product_code}', ${list.price}, ${list.qty});
                `
                // console.log(query)
                DB.query(query, (dberr, dbres) => {
                    if (dberr) {
                        console.log(dberr)
                    } else {
                        console.log(dbres)
                    }
                })
                callback()
            }, function (err) {
                if (err) {
                    res.send(
                        respx.send('There is some unknown error, please call our support', false, [], 400)
                    )
                } else {
                    res.send(
                        respx.send('Stash add success', true, [], 200)
                    )
                }
            })
        } else {
            res.send(
                respx.send('You cant access this', false, [], 400)
            )
        }
    } else {
        res.send(
            respx.send('You cant access this', false, [], 400)
        )
    }
})

app.put('/stash/:id', (req, res) => {
    let dd = auth.authToken(req.headers['authorization']);
    if (dd.status) {
        if (dd.data.roleno == 3) {
            const data = req.body
            const productId = req.params.id

            DB.query(`update stashes set qty = ${data.qty} where username = '${dd.data.username}' and productid = ${productId}`, (dberr, dbres) => {
                if (dberr) {
                    res.send(
                        respx.send('Error on db', false, [], 400)
                    )
                } else {
                    res.send(
                        respx.send('Success', true, dbres.rows, 200)
                    )
                }
            })
        } else {
            res.send(
                respx.send('You cant access this', false, [], 400)
            )
        }
    } else {
        res.send(
            respx.send('You cant access this', false, [], 400)
        )
    }
})

app.delete('/stash/:id', (req, res) => {
    //delete the stash 
    //call the req.params.id
    let dd = auth.authToken(req.headers['authorization']);
    if (dd.status) {
        if (dd.data.roleno == 3) {
            let query = `delete from stashes where username = '${dd.data.username}' and productid = '${req.params.id}'`;
            DB.query(query, (dberr, dbres) => {
                if (dberr) {
                    res.send(
                        respx.send('Delete the stash failed', false, [], 400)
                    )
                } else {
                    res.send(
                        respx.send('Delete the stash success', true, [], 204)
                    )
                }
            })
        } else {
            res.send(
                respx.send('You cant access this', false, [], 400)
            )
        }
    } else {
        res.send(
            respx.send('You cant access this', false, [], 400)
        )
    }
})

app.post('/order', (req, res) => {
    let dd = auth.authToken(req.headers['authorization']);
    if (dd.status) {
        if (dd.data.roleno == 3) {
            DB.query(`INSERT INTO public.orders
            (ordering_username, sending_address, ordered_at, paid_confirmation_date, total_price, receipt_img)
            VALUES('${dd.data.username}', '${req.body.sending_address}', '${req.body.ordered_at}', null, '${req.body.total_price}', null) returning orderid`, (dberr, dbres) => {
                if (dberr) {
                    // console.log("error when post the order")
                    // console.log(dberr)
                    res.send(
                        respx.send(dberr.detail, false, [], 400)
                    )
                } else {
                    let details = req.body.detail;
                    console.log(details)
                    let orderids = dbres.rows[0].orderid
                    console.log(req.body);
                    async.each(details, function (detail, callback) {
                        let detailno = orderids + '-' + details.indexOf(detail)
                        

                        DB.query(`select * from products where productid = '${detail.productid}'`, (err, resp) => {
                            if (err) {
                                console.log("error selecting product")
                            } else {
                                let product_detail = resp.rows[0]
                                let total_price = detail.qty * product_detail.sellprice;
                                // console.log("the product detail is : ", product_detail)
                                let query_for_detail = `INSERT INTO public.order_details (orderid, orderdetail_id, productid, qty, price_each, price, modal)
                                    VALUES('${orderids}', '${detailno}', '${detail.productid}', ${detail.qty}, ${product_detail.sellprice}, ${total_price}, ${product_detail.modal * detail.qty})`;
                                    console.log(query_for_detail)
                                DB.query(query_for_detail, (dterr, dtres) => {
                                    if (dterr) {
                                        console.log("Error inserting details")
                                    } else {
                                        // console.log(dtres)
                                    }
                                })
                            }
                        })
                        callback()
                    }, function (errs) {
                        if (errs) {
                            res.send(
                                respx.send('There is some error creating the order detail, pls contact our support', false, [], 400)
                            )
                        } else {
                            res.send(
                                respx.send('Success', true, {orderid : orderids}, 200)
                            )
                        }
                    })
                }
            })
        } else {
            res.send(
                respx.send('You cant access this', false, [], 401)
            )
        }
    } else {
        res.send(
            respx.send('You cant access this', false, [], 401)
        )
    }
})

app.get('/order', (req, res) => {
    let dd = auth.authToken(req.headers['authorization']);
    if (dd.status) {
        let data
        if (dd.data.roleno == 2) {
            DB.query(`select o.*, a.awbno, a.courier from orders o
            left join awblists a on o.orderid::varchar = a.orderid`, (dberr, dbres) => {
                if (dberr) {
                    res.send(
                        respx.send('There is some error', false, [], 400)
                    )
                } else {
                    res.send(
                        respx.send('Success', true, dbres.rows, 200)
                    )
                }
            })
        } else if (dd.data.roleno == 3) {
            DB.query(`select o.*, a.awbno, a.courier from orders o
            left join awblists a on o.orderid::varchar = a.orderid where ordering_username = '${dd.data.username}'`, (dberr, dbres) => {
                if (dberr) {
                    res.send(
                        respx.send('There is some error', false, [], 400)
                    )
                } else {
                    res.send(
                        respx.send('Success', true, dbres.rows, 200)
                    )
                }
            })
        } else {
            res.send(
                respx.send('You cant access this', false, [], 401)
            )
        }
    } else {
        res.send(
            respx.send('You cant access this', false, [], 401)
        )
    }
})

app.get('/order-detail/:orderid', (req, res) => {
    let dd = auth.authToken(req.headers['authorization']);
    if (dd.status) {
        if (req.params.orderid == null) {
            res.send(
                respx.send('Please enter the orderid', false, [], 401)
            )
        } else {
            if (dd.data.roleno == 2) {
                DB.query(`select od.* , p.productname , p.product_code from order_details od
                inner join products p on od.productid = p.productid::varchar where orderid = '${req.params.orderid}'`, (dberr, dbres) => {
                    if (dberr) {
                        res.send(
                            respx.send('There is some error or data not found', false, [], 400)
                        )
                    } else {
                        res.send(
                            respx.send('Success', true, dbres.rows, 200)
                        )
                    }
                })
            } else if (dd.data.roleno == 3) {
                let query = `select od.orderid, od.orderdetail_id, od.productid, od.qty, od.price_each, od.price, p.productname , p.product_code from order_details od
                inner join products p on od.productid = p.productid::varchar where orderid = '${req.params.orderid}'`
                DB.query(query, (dberr, dbres) => {
                    console.log(query)
                    if (dberr) {
                        res.send(
                            respx.send('There is some error or data not found', false, [], 400)
                        )
                    } else {
                        res.send(
                            respx.send('Success', true, dbres.rows, 200)
                        )
                    }
                })
            } else {
                res.send(
                    respx.send('You cant access this', false, [], 401)
                )
            }
        }
    } else {
        res.send(
            respx.send('You cant access this', false, [], 401)
        )
    }
})

app.post('/user-confirm-payment', uploads.single('image'), (req, res) => {
    let dd = auth.authToken(req.headers['authorization']);
    if (dd.status) {
        if (dd.data.roleno == 3) {
            if (req.file != null) {
                DB.query(`select * from orders where orderid = ${req.body.orderid}`, (dberr, dbres) => {
                    if (dberr) {
                        res.send(
                            respx.send(dberr.detail, false, [], 400)
                        )
                    } else {
                        let data = dbres.rows
                        if (data.length == 0) {
                            res.send(
                                respx.send("There is no order from you with that id", false, [], 400)
                            )
                        } else {
                            const {
                                filename,
                                mimetype,
                                size
                            } = req.file;
                            const filepath = '/api/order/receipt-image/' + filename;
                            DB.query(`update orders set ispaid_confirm = true, receipt_img = '${filepath}' where orderid = ${req.body.orderid}`, (aprverr, aprvres) => {
                                if (aprverr) {
                                    res.send(
                                        respx.send(aprverr.detail)
                                    )
                                } else {
                                    res.send(
                                        respx.send(`user has approved the order with id = ${req.body.orderid}`, true, [], 200)
                                    )
                                }
                            })
                        }
                    }
                })
            } else {
                res.send(
                    respx.send('Please upload the receipt image', false, [], 401)
                )
            }
        } else {
            res.send(
                respx.send('You cant access this', false, [], 401)
            )
        }
    } else {
        res.send(
            respx.send('You cant access this', false, [], 401)
        )
    }
})

app.get('/receipt-image/:imagename', (req, res) => {
    const { imagename } = req.params;
    const dirname = path.resolve();
    const fullfilepath = path.join(dirname, 'media/receipt/' + imagename);
    // console.log(fullfilepath)
    return res.sendFile(fullfilepath);
})

app.post('/admin-confirm-payment', (req, res) => {
    let dd = auth.authToken(req.headers['authorization']);
    if (dd.status) {
        if (dd.data.roleno == 2) {
            if (req.body.confirmation == true) {
                DB.query(`update orders set is_approved = true where orderid = '${req.body.orderid}'`, (dberr, dbres) => {
                    if (dberr) {
                        res.send(
                            respx.send(dberr.detail, false, [], 401)
                        )
                    } else {
                        res.send(
                            respx.send("Success", true, [], 200)
                        )
                    }
                })
            } else if (req.body.confirmation == false) {
                DB.query(`update orders set ispaid_confirm = false, receipt_img = null where orderid = ${req.body.orderid}`, (dberr, dbres) => {
                    if (dberr) {
                        res.send(
                            respx.send(dberr.detail, false, [], 401)
                        )
                    } else {
                        res.send(
                            respx.send("Success", true, [], 200)
                        )
                    }
                })
            } else {
                res.send(
                    respx.send('please input confirmation', false, [], 200)
                )
            }
        } else {
            res.send(
                respx.send('You cant access this', false, [], 401)
            )
        }
    } else {
        res.send(
            respx.send('You cant access this', false, [], 401)
        )
    }
})

app.delete('/order/:id', (req, res) => {
    //should it be make?
})

app.post('/insert-awb', (req, res) => {
    let dd = auth.authToken(req.headers['authorization']);
    if (dd.data.roleno === '2') {
        let query = `INSERT INTO public.awblists
        (courier, awbno, orderid)
        VALUES('${req.body.courier}', '${req.body.awbno}', '${req.body.orderid}')`
        DB.query(query, (dberr, dbres) => {
            if (dberr) {
                res.send(
                    respx.send('Error when inserting, check your data or the order awb have been inserted', false, [], 400)
                )
            } else {
                res.send(
                    respx.send("Success", true, [], 200)
                )
            }
        })
    } else {
        res.send(
            respx.send('You cant access this', false, [], 400)
        )
    }
})

app.put('/edit-awb', (req, res)=> {
    let dd = auth.authToken(req.headers['authorization']);
    if (dd.data.roleno === 2) {
        // let query = `INSERT INTO public.awblists
        // (courier, awbno, orderid)
        // VALUES('${req.body.courier}', '${req.body.awbno}', '${req.body.orderid}')`
        let query = `UPDATE public.awblists
        SET courier='${req.body.courier}', awbno='${req.body.awbno}'
        WHERE awbno='' AND orderid=''`
        DB.query(query, (dberr, dbres) => {
            if (dberr) {
                res.send(
                    respx.send('Error when updating, check your data or the order awb have been inserted', false, [], 400)
                )
            } else {
                res.send(
                    respx.send("Success", true, [], 200)
                )
            }
        })
    } else {
        res.send(
            respx.send('You cant access this', false, [], 400)
        )
    }
})
module.exports = app;