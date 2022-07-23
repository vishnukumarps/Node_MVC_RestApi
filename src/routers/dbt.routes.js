const express = require('express');
const router = express.Router();
const {dbtController} = require('../controllers');

router.post('/callback',   dbtController.callbackExample);
module.exports = router;