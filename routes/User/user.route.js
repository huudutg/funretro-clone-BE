const express = require("express");
const router = express.Router();
const User = require('../../model/user.model')
const jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
require('dotenv/config');

const me = {
    uid: "124",
    name: "Retropestive thang 11 ne",
    context: "day la bang de nhin lai nhung thu ma ta da dat duoc trong thoi gian qua",
    Item: [
        [{
            contain: "String",
            like: 3,
        },
        {
            contain: "haha",
            like: 4,
        }],
        [{
            contain: "String",
            like: 3,
        },
        {
            contain: "haha",
            like: 4,
        }],
        [{
            contain: "String",
            like: 3,
        },
        {
            contain: "haha",
            like: 4,
        }],
    ]

}



router.get("/", async (req, res) => {
    try {
        await User.find()
            .then(data => {
                res.send(data)
            })
            .catch(err => {
                console.log('errrrr', err)
            })
    } catch (error) {
        res.send(error)
    }


});
router.get("/profile", async (req, res) => {

    const id = req.user.id;
    try {
        await User.findById(id)
            .then(data => {

                res.send(data)
            })
            .catch(err => {
                console.log('errrrr', err)
            })
    } catch (error) {
        res.send(error)
    }


});

router.post("/", async (req, res) => {
    const body = me;
    if (body) {
        try {
            const user = new User({
                ...body
            })
            const result = await user.save()
                .then(data => {
                    res.send(data)
                })
                .catch(err => {
                    console.log('errrrr', err)
                })
        } catch (error) {
            console.log('error', error)
            res.send(error)
        }

    }
    else {
        res.sendStatus(500);

    }
});

router.post("/register", async (req, res) => {
    const body = req.body;
    // console.log('body', body)
    if (body) {
        try {
            body.password = bcrypt.hashSync(req.body.password, 10);

            body.joindate = new Date();
            const user = new User({
                ...body
            })
            const result = await user.save()
                .then(data => {
                    const token = jwt.sign({ id: data._id }, process.env.SECRET_KEY)
                    // res.cookie("token2", token);
                    res.send(token)
                    // console.log('data', data)

                })
                .catch(err => {
                    console.log('errrrr2', err)
                })
        } catch (error) {
            console.log('error3', error)
            res.send(error)
        }

    }
    else {
        res.sendStatus(500);

    }
});

router.post("/login", async (req, res) => {
    const body = req.body;
    // console.log('body', body)
    if (body) {
        try {
            if (body.idsocial) {
                await User.findOne({ email: body.email })
                    .then(data => {
                        if (data) {
                            const token = jwt.sign({ id: data._id }, process.env.SECRET_KEY)
                            res.send(token);
                        }
                        else {
                            body.joindate = new Date();
                            body.password = bcrypt.hashSync('1', 10);

                            const user = new User({
                                ...body
                            })
                            user.save()
                                .then(data => {
                                    const token = jwt.sign({ id: data._id }, process.env.SECRET_KEY)
                                    // res.cookie("token2", token);
                                    res.send(token)
                                    // console.log('data', data)

                                })
                                .catch(err => {
                                    console.log('errrrr2', err)
                                })
                        }
                    })
                    .catch(err => {
                        console.log('errrrrlgin', err)
                    })
            }
            else {
                await User.findOne({ email: body.email })
                    .then(data => {
                        const rs = bcrypt.compareSync(body.password, data.password);
                        if (rs) {
                            const token = jwt.sign({ id: data._id }, process.env.SECRET_KEY)
                            res.send(token);
                        }
                    })
                    .catch(err => {
                        console.log('errrrrlgin', err)
                    })
            }


        } catch (error) {
            console.log('error3', error)
            res.send(error)
        }

    }
    else {
        res.sendStatus(500);

    }
});
router.post("/update", async (req, res) => {
    const id = req.user.id;
    const body = req.body;
    // console.log('body', body)
    if (body) {
        try {
            await User.findOne({ email: body.email })
                .then(async (data) => {
                    // console.log('data', data)
                    const rs = bcrypt.compareSync(body.password, data.password);
                    if (rs) {
                        delete body.password;
                        await User.findByIdAndUpdate(id,
                            { $set: { ...body } })
                        res.sendStatus(200);

                    }
                    else {
                        res.sendStatus(401);
                    }

                })
                .catch(err => {
                    res.sendStatus(400);
                    console.log('errrrr', err)
                })

        } catch (error) {
            console.log('error3', error)
            res.send(error)
        }

    }
    else {
        res.sendStatus(500);

    }
});

module.exports = router;
