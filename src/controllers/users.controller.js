
const { validationResult } = require('express-validator');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const normalize = require('normalize-url');
const config = require("config")

const userCtrl = {};

const User = require('../models/User');


// @route    GET api/users
// @desc     Get user by token
// @access   Private
userCtrl.getUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        res.json(user);
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send ("Server Error");
    }
};


// @route    POST api/users
// @desc     Create user by name, email and password
// @access   Public
userCtrl.createUser = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;

    try {
        let user = await User.findOne({ email });
  
        if (user) {
          return res
            .status(400)
            .json({ errors: [{ msg: 'User already exists' }] });
        }
  
        const avatar = normalize(
          gravatar.url(email, {
            s: '200',
            r: 'pg',
            d: 'mm'
          }),
          { forceHttps: true }
        );
  
        user = new User({
          name,
          email,
          avatar,
          password
        });
  
        const salt = await bcrypt.genSalt(10);
  
        user.password = await bcrypt.hash(password, salt);
  
        await user.save();

        const payload = {
            user: {
              id: user.id
            }
          };
    
          jwt.sign(
            payload,
            config.get('jwtSecret'),
            { expiresIn: '5 days' },
            (err, token) => {
              if (err) throw err;
              res.json({ token });
            }
          );
        
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
      }
};

userCtrl.deleteUser = async (req, res) => {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.json('User deleted');
}

module.exports = userCtrl;