const express = require('express');
const router = express.Router();
const bookControllers = require('../controllers/book.controller');
const auth=require('../middleware/auth');


router.get('/get', bookControllers.get);
router.post('/post',auth.auth, bookControllers.post);
module.exports = router;
