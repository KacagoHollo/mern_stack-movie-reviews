const router = require('express').Router();
const User = require('../model/user')

router.post('/authenticate', async (req, res) => {

    res.sendStatus(200);
    /* 
    Receive Google code -> get google token -> get googleId
    googleID exists ? send jwt token : create user and send jwt token
     */
});

module.exports = router;