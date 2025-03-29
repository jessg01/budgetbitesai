const User = require('../models/user.model')
const express = require('express')
const router = express.Router()
const {userSignup, userLogin} = require('../controllers/user.controller')

router.post('/signup', userSignup);
router.post('/login', userLogin);

module.exports = router;