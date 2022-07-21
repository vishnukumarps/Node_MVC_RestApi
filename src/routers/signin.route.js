const express = require('express');
const router = express.Router();
const signInController = require('../controllers/signin.controller');
const auth = require('../middleware/auth');

router.post('/anonymousLogin', signInController.anonymousLogin);
router.post('/logout', signInController.logout);
router.post('/logoutUser', signInController.logoutUser);
router.post('/signup', signInController.signup);
router.post('/signupUser', signInController.signupUser);
router.post('/login', signInController.login);
router.post('/anonymousToOfficial', signInController.anonymousToOfficial);
router.get('/logedInUser', signInController.logedInUser);
router.post('/resetPassword', signInController.resetPassword);
router.post('/sendResetPasswordEmail', signInController.sendResetPasswordEmail);
router.post('/customJwt', signInController.customJwt);
router.get('/confirmUser', signInController.confirmUser);
router.post('/linkAccounts', signInController.linkAccounts);
router.post('/testApi', auth.authAdmin1,auth.authAdmin2,signInController.testApi);
router.post('/chanagePassword', signInController.chanagePassword);
router.post('/emailTest', signInController.emailTest);
router.post('/gmailTest', signInController.gmailTest);
router.post('/gmailTest3', signInController.gmailTest3);
router.post('/callAPI', signInController.callAPI);
router.post('/getAllusers', signInController.getAllusers);


module.exports = router;