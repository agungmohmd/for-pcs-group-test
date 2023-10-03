//import db pool here
const { json } = require('body-parser');
const jwt = require('jsonwebtoken');


function read(query, token) {
    //do auth here, if passed read the query and if not return the unaccessable error
}

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

// function authenticateToken(req, res, next) {
//     // Gather the jwt access token from the request header
//     const authHeader = req.headers['authorization']
//     const token = authHeader && authHeader.split(' ')[1]
//     if (token == null) return res.sendStatus(401) // if there isn't any token

//     jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string, (err: any, user: any) => {
//       console.log(err)
//       if (err) return res.sendStatus(403)
//       req.user = user
//       next() // pass the execution off to whatever request the client intended
//     })
//   }

module.exports = {
    authToken
}