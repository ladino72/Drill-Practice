const { Router } = require('express');
const router = Router();
const { check} = require('express-validator');

const { authUser } = require('../controllers/auth.controller');

router.route('/')
    .post([check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()],authUser);

module.exports = router;