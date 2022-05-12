const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const auth = require('../middleware/auth');


router.post('/signup1',  userController.signup);
router.post('/resendPasswordResetEmail',  userController.resendPasswordResetEmail);
router.post('/sendPasswordResetEmail',  userController.sendPasswordResetEmail);
router.post('/resetPasswordByTokenAndTokenIdNewPassword',  userController.resetPasswordByTokenAndTokenIdNewPassword);
router.post('/logout',  userController.logout);
router.post('/login',  userController.login);
router.post('/sendTestEmail',  userController.sendTestEmail);

module.exports = router;