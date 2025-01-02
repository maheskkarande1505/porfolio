var mysql = require("mysql");
var util = require("util");

var conn = mysql.createConnection({
    "host":"btizxcn9rilveyavgecw-mysql.services.clever-cloud.com",
    "user":"ub81x7kkmvsbchxi",
    "password":"NZfFXFJxQk8G7pSWRjA4",
    "database":"btizxcn9rilveyavgecw",

});

var exe = util.promisify(conn.query).bind(conn);

module.exports = exe;
