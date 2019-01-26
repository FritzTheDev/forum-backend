const router = require('express').Router();

router.post('/register', (req, res, next) => {
    res.send('Register');
});

router.post('/authenticate', (req, res, next) => {
    res.send('Authenticate');
});

router.get('/profile', (req, res, next) => {
    res.send('Profile');
});

module.exports = router;