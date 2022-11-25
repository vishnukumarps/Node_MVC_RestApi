const express = require('express');
const router = express.Router();
const signInController = require('../controllers/signin.controller');
const auth=require('../middleware/auth');

router.post('/anonymousLogin', signInController.anonymousLogin);
router.post('/logout', signInController.logout);
router.post('/signup', signInController.signup);
router.post('/login', signInController.login);
router.post('/anonymousToOfficial', signInController.anonymousToOfficial);
router.get('/logedInUser', signInController.logedInUser);
router.post('/resetPassword', signInController.resetPassword);
router.post('/sendResetPasswordEmail', signInController.sendResetPasswordEmail);
router.post('/customJwt', signInController.customJwt);
router.get('/confirmUser', signInController.confirmUser);
router.post('/linkAccounts', signInController.linkAccounts);
router.post('/test', auth.auth,signInController.test); //localhost/signin/test
module.exports = router;