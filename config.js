var config = {

    'default': {
        PORT: 300,
        CONNECTION_STRINGS: {
            local: {
                connectionLimit : 100,
                port     :  3306,
                host     : "127.0.0.1",
                user     : "root",
                password : "admin123",
                database : "hotel_db"
            }
        },
    }
}

exports.get = function get(env) {
    return config[env] || config.default;
}
// module.exports = config[process.env.NODE_ENV] || config['default'];
