const express = require("express");
const router = express.Router();
const Board = require('../../model/board.model')
const Pusher = require("pusher");

const pusher = new Pusher({
    appId: "1102819",
    key: "fc572aa65b3feee3d449",
    secret: "21760c5e9270f5515475",
    cluster: "ap1",
    useTLS: true
});
router.post("/test", async (req, res) => {
    const body = req.body;
    if (body) {
        try {
            pusher.trigger("fun", "retro", {
                name: "Du",
                data: body
            });
        } catch (error) {
            console.log('error', error)
            res.send(error)
        }

    }
    else {
        res.sendStatus(500);

    }
});


router.get("/getByUid", async (req, res) => {
    const id = req.user.id;
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
    const id = req.user.id;
    body.uid = id
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
    delete body._id
    const id = req.params.id;
    if (body) {
        try {

            Board.findByIdAndUpdate(id,
                { $set: { ...body } })
                .then(data => {
                    if (body.name || body.conte) {
                        pusher.trigger("fun", 'title', body);

                    }
                    else {
                        pusher.trigger("fun", 'id', body.Item);

                    }
                    res.sendStatus(200)
                })

                .catch(err => {
                    console.log('errrrr444', err)
                })
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
