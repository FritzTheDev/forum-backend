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
    const { username, password } = req.body;
    User.getUserByUsername(username, (err, user) => {
        if (err) throw err;
        if (!user) {
            return res.json({ success: 'False', msg: 'User Not Found' });
        }

        User.comparePassword(password, user.password, (err, isMatch) => {
            if (err) throw err;
        });
        if (isMatch){
            const token = jwt.sign(user, process.env.SECRET, {
                //1 Week in seconds
                expiresIn: 604800
            });
            res.json({
                success: true,
                token: 'JWT '+ token,
                user: {
                    id: user._id,
                    username: user.username,
                    email: user.email
                }
            });
        } else {
            return res.json({ success: false, msg: 'Wrong Password'});
        }
    });

});

router.get('/profile', (req, res, next) => {
    res.send('Profile');
});

module.exports = router;