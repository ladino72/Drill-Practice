const { Router } = require('express');
const router = Router();
const { check} = require('express-validator');
const auth =require("../../middleware/auth")

const { getUser,createUser, deleteUser } = require('../controllers/users.controller');

router.route('/')
    .get(auth,getUser) //this route is now protected!
    .post([check("name","Name is required").not().isEmpty(),
        check('email', 'Please include a valid email').isEmail(),
        check(
        'password',
        'Please enter a password with 6 or more characters'
        ).isLength({ min: 6 }),],createUser);

router.route('/:id')
    .delete(deleteUser);

module.exports = router;

