const express = require('express');
var mysql = require('mysql');
const config = require('../config').get(process.env.NODE_ENV);


var pool = mysql.createPool(
    config.CONNECTION_STRINGS.local
);

let connection = () => {
    return new Promise((resolve, reject) => {
        pool.getConnection(function (err, conn) {
            if (err) {
                console.log('MySQL connection error:', err.stack);
                reject(err);
            }
            else {
                console.log('Connected to MySQL...', conn.threadId);
                resolve(conn);
            }
        })
    })
}

module.exports = { connection: connection };