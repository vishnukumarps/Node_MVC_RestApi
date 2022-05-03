const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const auth = require('../middleware/auth');


router.post('/signup1',  userController.signup);
router.post('/resendConfirmationEmail1',  userController.resendConfirmationEmail);
router.post('/sendPasswordResetEmail',  userController.sendPasswordResetEmail);

module.exports = router;