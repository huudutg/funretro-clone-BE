const express = require("express");
const router = express.Router();
const Board = require('../../model/board.model')

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
const me2 = {
    "uid": "123",
    "name": "Juro Huynh",
    "context": "day la bang de nhin lai nhung thu ma ta da dat duoc trong thoi gian qua",
    "actionItems": [
        {
            "contain": "String",
            "like": "3",
        }
    ],
    "toImprove": [
        {
            "contain": "String",
            "like": "3",
        }
    ],
    "wentWell": [
        {
            "contain": "String",
            "like": "3",
        }
    ]

}
router.get("/", async (req, res) => {
    try {
        await Board.find()
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
        await Board.find({ id })
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
            const board = new Board({
                ...body
            })
            console.log('board', board)
            const result = await board.save()
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
