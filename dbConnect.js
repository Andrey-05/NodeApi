const mysql = require('mysql')

const conn = mysql.createPool({
    'user': 'root',
    'host': 'localhost',
    'password': '',
    'database': 'db_ApiNode',
    'port': '3306'
})

exports.pool = conn