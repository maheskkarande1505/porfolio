var express = require("express");
var bodyparser = require("body-parser");
var upload = require("express-fileupload");
var session = require("express-session");
var user_urls = require("./routes/user_routes");
var admin_urls = require("./routes/admin_routes");
require("dotenv").config();
var app = express();

app.use(bodyparser.urlencoded({extended:true}));
app.use(upload());
app.use(express.static("public/"));
app.use(session({
    secret: "asdfdf",
    resave:true,
    saveUninitialized:true
}));

app.use("/", user_urls);
app.use("/admin", admin_urls);

app.listen(process.env.PORT || 1000);
    