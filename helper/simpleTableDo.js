const pool = require('../lib/_dbaccess');
const DB = pool.pool;

function select(tablename, whereClause = null) {
    let query
    if (whereClause == null) {
        query = `select * from ${tablename}`
    } else {
        query = `select * from ${tablename} where ${whereClause}`
    }

    DB.query(query, (err, res) => {
        if (err) {
            return err;
        } else {
            return res.rows;
        }
    })
}

function insert(table, column = Array, values = Array) {
    if (column.length != values.length) {
        return Error
    } else {
        let query = ``
    }
}