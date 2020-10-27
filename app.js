const express = require("express");
const app = express();
// const cookePaser = require("cookie-parser");
var cors = require("cors");
const mongoose = require("mongoose");
require('dotenv/config');
// app.use(cookePaser());
var bodyParser = require('body-parser')
app.use(cors());
app.use(cors({ credentials: true, origin: true }));
app.use(bodyParser.json())

app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);
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