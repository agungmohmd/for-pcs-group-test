const axios = require('axios');

function getExtAPI(res, link){
    axios.get(link).then(resp => {
        return resp
    }).catch(err => res.send(err))
}

module.exports = {
    getExtAPI
}