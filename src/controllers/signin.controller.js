
const Realm = require("realm");

//const app = new Realm.App({ id: "hope-xggeh" });//codeaffactions@gmail.com
const app = new Realm.App({ id: "application-0-cjmsl" });// vishnukumar5417@gmail.com
const jwt_decode = require('jwt-decode');
const res = require("express/lib/response");

async function anonymousLogin(req, res, next) {
    // Create an anonymous credential
    const credentials = Realm.Credentials.anonymous();
    try {
        const user = await app.logIn(credentials);
        var userObj = {
            id: user.id,
            identities: user.identities,
            state: user.state,
            refreshToken: user.refreshToken
        }
        console.log("Successfully logged in!", user.id);
        console.dir(userObj);
        res.send(userObj);
    } catch (err) {
        console.error("Failed to log in", err.message);
        res.send("failed to log in" + err.message);
    }
}

async function signup(req, res, next) {

    try {
        await app.emailPasswordAuth.registerUser(
            {
                email: req.body.email,
                password: req.body.password
            }
        )
        // Create an email/password credential
        const credentials = Realm.Credentials.emailPassword(
            req.body.email,
            req.body.password
        );
        const user = await app.logIn(credentials);
        userObj = {
            id: user.id,
            email: user.profile.email,
            identities: user.identities,
            state: user.state,
            msg: user.profile.email + " is successfully registered"
        }
        console.log("Successfully logged in!", user.id);
        console.dir(userObj);
        res.send(userObj);
    }
    catch (err) {
        console.log(err.message)
        res.send(err.message);
    }
}

async function logedInUser(req, res, next) {
    var logedInUser = await app.currentUser;
    var resultObj = {
        id: logedInUser.id,
        email: logedInUser.profile.email,
        identities: logedInUser.identities,
        state: logedInUser.state
    }
    console.log("Current User" + resultObj);
    res.send(resultObj);
}

async function login(req, res, next) {
    try {
        const credentials = Realm.Credentials.emailPassword(
            req.body.email,
            req.body.password
        );
        const user = await app.logIn(credentials);
        var token = user.refreshToken;
        var decoded = jwt_decode(token);
        console.log("decoded", decoded.sub);
        console.log(token);
        console.log("Successfully logged in!", user.id);
        var userObj = {
            id: user.id,
            email: user.profile.email,
            identities: user.identities,
            state: user.state,
            token: token,
            decoded: decoded,
            msg: user.profile.email + " is successfully logged in"
        }
        user.id
        console.dir(userObj);
        res.send(userObj);
    } catch (error) {
        console.log(error.message);
        res.send(error.message);
    }
}
async function anonymousToOfficial(req, res, next) {

    try {
        var anonymousUser = await app.currentUser;
        var anonymousObj = {
            id: anonymousUser.id,
            email: anonymousUser.profile.email,
            identities: anonymousUser.identities,
            state: anonymousUser.state,
            refreshToken: anonymousUser.refreshToken
        }
        console.log("Current Anonymoususer" + anonymousObj);
        // const anonymousUser = await app.logIn(Realm.Credentials.anonymous());
        // console.log("Successfully logged in!", anonymousUser.id);
        await app.emailPasswordAuth.registerUser(
            {
                email: req.body.email,
                password: req.body.password
            }
        );
        const emailPasswordUserCredentials = Realm.Credentials.emailPassword(
            req.body.email,
            req.body.password
        );
        const officialUser = await anonymousUser.linkCredentials(
            emailPasswordUserCredentials
        );

        var officialUserObj = {
            id: officialUser.id,
            email: officialUser.profile.email,
            identities: officialUser.identities,
            state: officialUser.state,
            refreshToken: officialUser.refreshToken
        }
        console.log("Successfully logged in!", officialUser.id);

        finalObj = {
            anonymousUser: anonymousObj,
            officialUser: officialUserObj
        }
        console.dir(finalObj);
        res.send(finalObj);

    } catch (err) {
        console.log(err.message)
        res.send(err.message);
    }
}

async function logout(req, res, next) {
    try {
        var currentUser = await app.currentUser;
        var userObj = {
            id: currentUser.id,
            email: currentUser.profile.email,
            identities: currentUser.identities,
            state: currentUser.state,
            msg: currentUser.id + " is successfully logged out"
        }
        await app.currentUser.logOut();

        console.log("Successfully logged out!");
        userObj.state = currentUser.state;
        res.send(userObj);
    } catch (err) {
        console.error("Failed to log out", err.message);
        res.send("failed to log out" + err.message);
    }
}

async function sendResetPasswordEmail(req, res, next) {
    // The user's email address
    try {
        var result = await app.emailPasswordAuth.sendResetPasswordEmail(req.body.email);
        console.log(result);
        res.send("Password reset email sent");
    } catch (error) {
        console.log(error.message);
        res.send(error.message);
    }


    // try {
    //     const email = req.body.email;
    //     // The new password to use
    //     const password = req.body.password;
    //     // Additional arguments for the reset function
    //     const args = [];
    //     await app.emailPasswordAuth.callResetPasswordFunction(
    //         { email, password },
    //         args
    //     );
    //     console.log("Successfully reset password!");
    //     res.send("Successfully reset password!");

    // } catch (error) {
    //     console.log(error.message);
    //     res.send(error.message);
    // }
}

async function  resetPassword(req, res, next) {
    try {
        var resetDetails = {
            token: req.body.token,
            tokenId: req.body.tokenId,
            password: req.body.newPassword
        }
        console.log(resetDetails);

        var result = await app.emailPasswordAuth.resetPassword(
            resetDetails
        );
        res.send("Password reset successfully");
    } catch (error) {
        console.log(error.message);
        res.send(error.message);
    }
}


module.exports = {
    anonymousLogin,
    signup,
    login,
    anonymousToOfficial,
    logedInUser,
    logout,
    sendResetPasswordEmail,
    resetPassword
};