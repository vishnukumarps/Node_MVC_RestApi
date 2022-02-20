const express = require('express');
const router = express.Router();
const signInController = require('../controllers/signin.controller');


router.post('/login', signInController.login);
router.post('/logout', signInController.logout);
router.post('/signup', signInController.signup);
router.post('/loginWithEmail', signInController.loginWithEmail);
router.post('/anonymousUserLink', signInController.anonymousUserLink);

module.exports = router;