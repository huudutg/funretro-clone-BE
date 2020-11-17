const express = require("express");
const app = express();
const cookePaser = require("cookie-parser");
var cors = require("cors");
const mongoose = require("mongoose");
require('dotenv/config');
app.use(cookePaser());
var bodyParser = require('body-parser');
const jwt = require("jsonwebtoken");

app.use(cors({ credentials: true, origin: true }));
app.use(bodyParser.json())

app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);
app.set('trust proxy', 1)
app.use(function (req, res, next) {
    res.header("Set-Cookie", "SameSite=None;Secure");
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Origin", req.headers.origin);
    // res.header("Access-Control-Allow-Origin", "https://funretro-7aa52.web.app");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header(
        "Access-Control-Allow-Headers",
        "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept"
    );
    const token = req.cookies.token;
    // console.log('req.cookies', req)
    if (!token) {

    }
    else {
        jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
            if (err) res.sendStatus(403);
            req.user = user;
            console.log('user', user)


        })
    }
    next();

});
mongoose.connect(process.env.ATLAS_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true

}, () => console.log('Connected to DB'));
app.use(express.static("public"));

require("./middlewares/routes.mdw")(app);
console.log("running on port ", 3300);
app.listen(process.env.PORT || 3300);