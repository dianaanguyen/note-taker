const router = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

router.get('/', (req,res) => {
    // get all the notes from DB
    res.json(`GOT YOUR ${req.method} REQUEST`);
});

router.post('/', (req,res) => {
    // add a note to the DB
    res.json(`GOT YOUR ${req.method} REQUEST`);
});

module.exports = router;