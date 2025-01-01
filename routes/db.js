var mysql = require("mysql");
var util = require("util");

var conn = mysql.createConnection({
    "host":"btizxcn9rilveyavgecw-mysql.services.clever-cloud.com",
    "user":"ub81x7kkmvsbchxi",
    "password":"ub81x7kkmvsbchxi",
    "database":"btizxcn9rilveyavgecw",
    // "port":"3306"

});

var exe = util.promisify(conn.query).bind(conn);

module.exports = exe;
