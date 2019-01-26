const router = require('express').Router();
const User = require('../models/user');
const passport = require('passport');
const jwt = require('jsonwebtoken');

router.post('/register', (req, res, next) => {
    const { username, email, password} = req.body;
    let newUser = new User({
        username,
        email,
        password
    });

    User.addUser(newUser, (err, user) => {
        if(err) {
            res.json({ success: false, msg: 'Failed To Register User'});
        }
        else {
            res.json({ success: true, msg: 'User Registered Successfully' });
        }
    });
});

router.post('/authenticate', (req, res, next) => {
    res.send('Authenticate');
});

router.get('/profile', (req, res, next) => {
    res.send('Profile');
});

module.exports = router;