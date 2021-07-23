const express = require('express');
const router = express.Router();
const feedbackControllers = require('../controllers/feedback.controller');


router.get('feedback/getdata', feedbackControllers.get);
module.exports = router;