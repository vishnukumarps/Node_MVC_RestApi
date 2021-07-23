const express = require('express');
const router = express.Router();
const bookControllers = require('../controllers/book.controller');


router.get('/get', bookControllers.get);
router.post('/post', bookControllers.post);
module.exports = router;