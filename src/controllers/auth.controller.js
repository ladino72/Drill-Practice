
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { validationResult } = require('express-validator');


const authCtrl = {};

const User = require('../models/User');

// @route    POST api/auth
// @desc     Authenticate user & get token
// @access   Public

authCtrl.authUser = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });
  
        if (!user) {
          return res
            .status(400)
            .json({ errors: [{ msg: 'Invalid Credentials' }] });
        }
  
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res
            .status(400)
            .json({ errors: [{ msg: 'Invalid Credentials' }] });
        }

          const payload = {
            user: {
              id: user.id
            }
          };
    
          jwt.sign(
            payload,
            config.get('jwtSecret'),
            { expiresIn: '5 days' },   //{ expiresIn: 360000 }
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


module.exports = authCtrl;