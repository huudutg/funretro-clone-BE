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
router.get("/:id", async (req, res) => {
    const id = req.params.id;
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
    console.log('body', body)
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
    console.log('body', body)
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
                    res.send({ id: data._id, token })
                })
                .catch(err => {
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

router.post("/login", async (req, res) => {
    const body = req.body;
    console.log('body', body)
    if (body) {
        try {
            await User.findOne({ email: body.email })
                .then(data => {
                    console.log('data', data)
                    const rs = bcrypt.compareSync(body.password, data.password);
                    if (rs) {
                        const token = jwt.sign({ id: data._id }, process.env.SECRET_KEY)
                        res.send({ id: data._id, token })
                    }
                })
                .catch(err => {
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
router.post("/update/:id", async (req, res) => {
    const id = req.params.id;
    const body = req.body;
    console.log('body', body)
    if (body) {
        try {
            await User.findOne({ email: body.email })
                .then(async (data) => {
                    console.log('data', data)
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
