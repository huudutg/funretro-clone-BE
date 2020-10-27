const express = require("express");
const router = express.Router();
const User = require('../../model/user.model')

const me = {
    uid: "124",
    name: "Retropestive thang 11 ne",
    context: "day la bang de nhin lai nhung thu ma ta da dat duoc trong thoi gian qua",
    actionItems: [
        {
            contain: "String",
            like: 3,
        }
    ],
    toImprove: [
        {
            contain: "String",
            like: 3,
        }
    ],
    wentWell: [
        {
            contain: "String",
            like: 3,
        }
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
        await User.find({ id })
            .then(data => {

                res.send(data[0])
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
            console.log('board', board)
            const result = await user.save()
                .then(data => {
                    res.send(data)
                })
                .catch(err => {
                    console.log('errrrr', err)
                })
        } catch (error) {
            res.send(error)
        }

    }
    else {
        res.sendStatus(500);

    }
});

module.exports = router;
