const express = require("express");
const router = express.Router();
const Board = require('../../model/board.model')

const me = {
    uid: "5fa17c5c27f43f5b441ca560",
    name: "Retropestive thang 11 ne",
    context: "day la bang de nhin lai nhung thu ma ta da dat duoc trong thoi gian qua",
    Item: [
        [{
            content: "String",
            like: 3,
        },
        {
            content: "haha",
            like: 4,
        }],
        [{
            content: "String",
            like: 3,
        },
        {
            content: "haha",
            like: 4,
        }],
        [{
            content: "String",
            like: 3,
        },
        {
            content: "haha",
            like: 4,
        }],
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
// router.get("/", async (req, res) => {
//     try {
//         await Board.find()
//             .then(data => {
//                 res.send(data)
//             })
//             .catch(err => {
//                 console.log('errrrr', err)
//             })
//     } catch (error) {
//         res.send(error)
//     }


// });
router.get("/getByUid/:id", async (req, res) => {
    const id = req.params.id;
    console.log('id', id)
    try {
        await Board.find({ uid: id })
            .then(data => {
                res.send(data)
            })
            .catch(err => {
                console.log('errrrr222', err)
            })
    } catch (error) {
        res.send(error)
    }


});
router.get("/:id", async (req, res) => {
    const id = req.params.id;
    console.log('typeof(id', typeof (id))
    try {
        await Board.findById(id)
            .then(data => {

                res.send(data)
            })
            .catch(err => {
                console.log('errrrr11212111', err)
            })
    } catch (error) {
        res.send(error)
    }


});

router.post("/createBoard", async (req, res) => {
    const body = req.body;
    console.log('board', body)

    if (body) {
        try {
            const board = new Board({
                ...body
            })
            const result = await board.save()
                .then(data => {
                    res.send(data)
                })
                .catch(err => {
                    console.log('errrrr1', err)
                })
        } catch (error) {
            res.send(error)
        }

    }
    else {
        res.sendStatus(500);

    }
});

router.post("/", async (req, res) => {
    const body = me;
    console.log('board', body)

    if (body) {
        try {
            const board = new Board({
                ...body
            })
            const result = await board.save()
                .then(data => {
                    res.send(data)
                })
                .catch(err => {
                    console.log('errrrr2', err)
                })
        } catch (error) {
            res.send(error)
        }

    }
    else {
        res.sendStatus(500);

    }
});


router.post("/edit/:id", async (req, res) => {
    const body = req.body;
    const id = req.params.id;
    console.log('body', body)
    if (body) {
        try {
            await Board.findByIdAndUpdate(id,
                { $set: { ...body } })
        } catch (error) {
            res.send(error)
        }

    }
    else {
        res.sendStatus(500);

    }
});

router.post("/delete/:id", async (req, res) => {
    const id = req.params.id;
    if (id) {
        try {
            const res = await Board.findByIdAndDelete(id)
            res.sendStatus(200);
        } catch (error) {
            res.send(error)
        }

    }
    else {
        res.sendStatus(500);

    }
});

module.exports = router;
