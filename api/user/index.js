const express = require('express');
const User = require('../../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const middleware = require('./middleware');

//Get currently authenticated User
router.get('/', middleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(401).json({
      msg: 'error in user-auth api'
    });
  }
});

//Register a User
router.post('/signUp', async (req, res) => {
  try {
    // hashing the password
    const password = await bcrypt.hash(req.body.password, 10);
    const newUser = { ...req.body, password };
    // Creating the User object
    const result = await User.create(newUser);


    // returning the token
    jwt.sign(
      {
        user: {
          id: result._id
        }
      },
      process.env.JWT_SECRET,
      { expiresIn: 3600000 },
      (err, token) => {
        if (err) throw err;
        console.log(token);
        res.json({ token });
      }
    );
  } catch (err) {
    res.status(400).end(err.errmsg);
  }
});

//Authenticate User
router.post('/logIn', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ errmsg: 'Invalid Credentials' });
    }
    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      return res.status(400).json({ errmsg: 'Invalid Credentials' });
    }

    jwt.sign(
      {
        user: {
          id: user.id
        }
      },
      process.env.JWT_SECRET,
      { expiresIn: 3600000 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    res.status(400).end('error in user-login api');
  }
});


module.exports = router;
