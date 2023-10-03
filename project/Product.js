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
            cb(null, 'media/products/');
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
// const {
//     query
// } = require('express');
// const e = require('express');

app.use(cors());
app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true
    })
)

app.get('/test-products', (req, res) => {
    res.send({
        message: 'Product File is Working Good'
    })
});

app.post('/test-uploads', uploads.single('image'), (req, res) => {
    console.log(req.file == null)
    const {
        filename,
        mimetype,
        size
    } = req.file;
    console.log(req.file == null)
    // const filepath = req.file.path;
    let filepath = '/api/product/product-image/' + filename
    console.log(req.file)
    console.log("url nya", filepath)
    res.json({
        success: true,
        filename
    })
})


// app.post('/test-array-upload', uploads.array('image', 10), (req, res) => {
//     // console.log(req.body);
//     // console.log("filenya", req.body.images);
//     // console.log(req.file);
//     console.log(req.files)
//     res.send("success")
// })

app.get('/product-image/:filename', (req, res) => {
    const {
        filename
    } = req.params;
    const dirname = path.resolve();
    const fullfilepath = path.join(dirname, 'media/products/' + filename);
    // console.log(fullfilepath)
    return res.sendFile(fullfilepath);
})

app.post('/products', uploads.single('image'), (req, res) => {
    let dd = auth.authToken(req.headers['authorization']);
    if (dd.status) {
        if (dd.data.roleno == 2) {
            if (req.file != null) {
                const {
                    filename,
                    mimetype,
                    size
                } = req.file;
                console.log(req.file == null)
                // const filepath = req.file.path;
                const filepath = '/api/product/product-image/' + filename
                let data = {
                    productcode: req.body.product_code,
                    productname: req.body.productname,
                    product_category: req.body.prodcat_id,
                    batch: req.body.batch,
                    desc: req.body.description,
                    created_by: dd.data.username,
                    created_on: req.body.created_on,
                    current_stock: req.body.current_stock,
                    modal: req.body.modal,
                    sell_price: req.body.sellprice
                }
                let query = `INSERT INTO products
                (productname, batch, createdby, created_on, edited_by, edited_on, current_stock, has_sold, is_active, product_code, prodcat_id, description, modal, sellprice, img_url)
                VALUES('${data.productname}', '${data.batch}', '${data.created_by}', '${data.created_on}', null, null, '${data.current_stock}', '0', 'true', 
                    '${data.productcode}', '${data.product_category}', '${data.desc}', '${data.modal}','${data.sell_price}', '${filepath}')`;
                console.log(query)
                DB.query(query, (dberr, dbres) => {
                    if (dberr) {
                        res.send({
                            error: dberr.detail
                        })
                    } else {
                        res.send(
                            respx.send('Success', true, dbres.rows, 200)
                        )
                    }
                })
            } else {
                res.send(
                    respx.send('Please input the image also', false, [], 200)
                )
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

app.get('/products', (req, res) => {
    if (req.headers['authorization']) {
        let dd = auth.authToken(req.headers['authorization']);
        console.log("ada headers auth")
        if (dd.status && dd.data.roleno == 2) {
            if (req.query.productid) {
                DB.query(`select * from products where productid = '${req.query.productid}'`, (err, dbres) => {
                    console.log("masuk query role no 2 dan ada productid")
                    if (err) {
                        res.send({
                            error: err.detail
                        })
                    } else {
                        res.send(
                            respx.send('Success', true, dbres.rows, 200)
                        )
                    }
                })
            } else {
                DB.query(`select * from products`, (err, dbres) => {
                    console.log("masuk query role no 2 dan ga ada productid")
                    if (err) {
                        res.send({
                            error: err.detail
                        })
                    } else {
                        res.send(
                            respx.send('Success', true, dbres.rows, 200)
                        )

                    }
                })
            }
        } else {
            let query = `select productid, productname, current_stock, has_sold, product_code, prodcat_id, description, sellprice, img_url from products`;
            if(req.query.title === undefined || req.query.title !== ""){
                query += ` where lower(productname) like '%${req.query.title.toLowerCase()}%'`
            }
            console.log("ada token selain kondisi no 2 dan sukses auth")
            if (req.query.productid) {
                query += ` where productid = '${req.query.productid}'`
                DB.query(query, (dberr, dbres) => {
                    if (dberr) {
                        res.send({
                            error: dberr.detail
                        })
                    } else {
                        res.send(
                            respx.send('Success', true, dbres.rows, 200)
                        )
                    }
                })
            } else {
                DB.query(query, (dberr, dbres) => {
                    if (dberr) {
                        res.send({
                            error: dberr.detail
                        })
                    } else {
                        res.send(
                            respx.send('Success', true, dbres.rows, 200)
                        )
                    }

                })
            }
        }
    } else {
        console.log("gada token")
        let query = `select productid, productname, current_stock, has_sold, product_code, prodcat_id, description, sellprice, img_url from products`;
        if(req.query.title === undefined || req.query.title !== ""){
            query += ` where lower(productname) like '%${req.query.title.toLowerCase()}%'`
        }
        if (req.query.productid) {
            query += ` where productid = '${req.query.productid}'`
            DB.query(query, (dberr, dbres) => {
                console.log(query)
                if (dberr) {
                    res.send({
                        error: dberr.detail
                    })
                } else {
                    res.send(
                        respx.send('Success', true, dbres.rows, 200)
                    )
                }
            })
        } else {
            console.log(query)
            DB.query(query, (dberr, dbres) => {
                if (dberr) {
                    res.send({
                        error: dberr.detail
                    })
                } else {
                    res.send(
                        respx.send('Success', true, dbres.rows, 200)
                    )
                }

            })
        }
    }
    // let dd = auth.authToken(req.headers['authorization']);
    // if (dd.status) {
    //     if (dd.data.roleno == 2) {
    //         if (req.query.productid) {
    //             DB.query(`select * from products where productid = '${req.query.productid}'`, (err, dbres) => {
    //                 if (err) {
    //                     res.send({
    //                         error: err.detail
    //                     })
    //                 } else {
    //                     res.send(
    //                         respx.send('Success', true, dbres.rows, 200)
    //                     )
    //                 }
    //             })
    //         } else {
    //             DB.query(`select * from products`, (err, dbres) => {
    //                 if (err) {
    //                     res.send({
    //                         error: err.detail
    //                     })
    //                 } else {
    //                     res.send(
    //                         respx.send('Success', true, dbres.rows, 200)
    //                     )

    //                 }
    //             })
    //         }
    //     } else if (dd.data.roleno == 3) {
    //         let query = `select productid, productname, current_stock, has_sold, product_code, prodcat_id, description, sellprice`;
    //         if (req.query.productid) {
    //             query += ` where productid = '${req.query.productid}'`
    //             DB.query(query, (dberr, dbres) => {
    //                 if (dberr) {
    //                     res.send({
    //                         error: dberr.detail
    //                     })
    //                 } else {
    //                     res.send(
    //                         respx.send('Success', true, dbres.rows, 200)
    //                     )
    //                 }
    //             })
    //         } else {
    //             DB.query(query, (dberr, dbres) => {
    //                 if (dberr) {
    //                     res.send({
    //                         error: dberr.detail
    //                     })
    //                 } else {
    //                     res.send(
    //                         respx.send('Success', true, dbres.rows, 200)
    //                     )
    //                 }

    //             })
    //         }
    //     } else {
    //         let query = `select productid, productname, current_stock, has_sold, product_code, prodcat_id, description, sellprice`;
    //         if (req.query.productid) {
    //             query += ` where productid = '${req.query.productid}'`
    //             DB.query(query, (dberr, dbres) => {
    //                 if (dberr) {
    //                     res.send({
    //                         error: dberr.detail
    //                     })
    //                 } else {
    //                     res.send(
    //                         respx.send('Success', true, dbres.rows, 200)
    //                     )
    //                 }
    //             })
    //         } else {
    //             DB.query(query, (dberr, dbres) => {
    //                 if (dberr) {
    //                     res.send({
    //                         error: dberr.detail
    //                     })
    //                 } else {
    //                     res.send(
    //                         respx.send('Success', true, dbres.rows, 200)
    //                     )
    //                 }

    //             })
    //         }
    //     }
    // } else {
    //     let query = `select productid, productname, current_stock, has_sold, product_code, prodcat_id, description, sellprice`;
    //     if (req.query.productid) {
    //         query += ` where productid = '${req.query.productid}'`
    //         DB.query(query, (dberr, dbres) => {
    //             if (dberr) {
    //                 res.send({
    //                     error: dberr.detail
    //                 })
    //             } else {
    //                 res.send(
    //                     respx.send('Success', true, dbres.rows, 200)
    //                 )
    //             }
    //         })
    //     } else {
    //         DB.query(query, (dberr, dbres) => {
    //             if (dberr) {
    //                 res.send({
    //                     error: dberr.detail
    //                 })
    //             } else {
    //                 res.send(
    //                     respx.send('Success', true, dbres.rows, 200)
    //                 )
    //             }

    //         })
    //     }
    // }
})

app.post('/product_categories', (req, res) => {
    let dd = auth.authToken(req.headers['authorization']);
    if (dd.status) {
        if (dd.data.roleno == 2) {
            DB.query(`INSERT INTO public.prod_category (cat_name) VALUES('${req.body.category_name}')`, (dberr, dbres) => {
                if (dberr) {
                    res.send({
                        error: dberr.detail
                    })
                } else {
                    res.send(
                        respx.send('Success', true, dbres.rows, 200)
                    )
                }
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
})

app.get('/product_categories', (req, res) => {
    if (req.query.catid) {
        DB.query(`select * from prod_category where catid = '${req.query.catid}'`, (dberr, dbres) => {
            if (dberr) {
                res.send({
                    error: dberr.detail
                })
            } else {
                res.send(
                    respx.send('Success', true, dbres.rows, 200)
                )
            }
        })
    } else {
        DB.query(`select * from prod_category`, (dberr, dbres) => {
            if (dberr) {
                res.send({
                    error: dberr.detail
                })
            } else {
                res.send(
                    respx.send('Success', true, dbres.rows, 200)
                )
            }
        })
    }
})

app.post('/edit-qty/:prodid', (req, res) => {
    let dd = auth.authToken(req.headers['authorization']);
    if (dd.status) {
        if (dd.data.roleno === '2') {
            console.log(req.params)
            let body = req.body
            DB.query(`select * from products where productid = '${req.params.prodid}'`, (dberr, dbres) => {
                if (dberr) {
                    res.send(
                        respx.send('There is some error with database', false, [], 400)
                    )
                } else {
                    let data = dbres.rows[0]
                    if (data.current_stock == body.qty) {
                        res.send(
                            respx.send('The quantity is the same, nothing is changed', false, [], 400)
                        )
                    } else if (body.qty == null) {
                        res.send(
                            respx.send('Please Input the new qty of the product', false, [], 400)
                        )
                    } else {
                        let isIncrease = Boolean
                        let diff
                        if (body.qty > data.current_stock) {
                            isIncrease = true
                        } else {
                            isIncrease = false
                        }
                        if (isIncrease) {
                            diff = data.current_stock - body.qty
                        } else {
                            diff = body.qty - data.current_stock
                        }
                        let currentdate = new Date();
                        var isoDateTime = new Date(currentdate.getTime() - (currentdate.getTimezoneOffset() * 60000)).toISOString().replace("T", " ").replace("Z", "").slice(0, -4);
                        DB.query(`INSERT INTO public.stock_update_history
                        (productid, isincrease, howmany, refference, description, created_on, created_by)
                        VALUES('${req.params.prodid}', ${isIncrease}, ${diff}, '${body.refference}', '${body.desc}', '${isoDateTime}', '${dd.data.username}') `, (instErr, instRes) => {
                            if (instErr) {
                                res.send(
                                    respx.send("Error on creating history, no data is changed", false, [], 400)
                                )
                            } else {
                                DB.query(`update products set current_stock = ${body.qty} where productid = ${req.params.prodid}`, (uperr, upres) => {
                                    if (uperr) {
                                        res.send(
                                            respx.send("Update history is inserted but failed updating current product stock", false, [], 400)
                                        )
                                    } else {
                                        res.send(
                                            respx.send(`The product ${data.product_code}'s stock has been updated`, true, [], 200)
                                        )
                                    }
                                })
                            }
                        })
                    }
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

module.exports = app;