const res = require("express/lib/response");
const Realm = require("realm");

const app = new Realm.App({ id: "hope-xggeh" });

async function login(req, res, next) {
    // Create an anonymous credential
    const credentials = Realm.Credentials.anonymous();
    try {
        const user = await app.logIn(credentials);
        console.log("Successfully logged in!", user.id);
        //await app.currentUser.logOut();


        res.send(user.id);
    } catch (err) {
        console.error("Failed to log in", err.message);
    }
}

async function test(user) {
    const emailPasswordUserCredentials = Realm.Credentials.emailPassword(
        "vishnukumar5417@gmail.com",
        "Vishnu@1234"
    );
    const linkedAccount = await user.linkCredentials(
        emailPasswordUserCredentials
    );
}

async function logout(req, res, next) {
    try {
        var currentUser = await app.currentUser;
        await app.currentUser.logOut();
        console.log("Successfully logged out!");
        res.send(currentUser.id+" logged out successfully");
    } catch (err) {
        console.error("Failed to log out", err.message);
        res.send("failed to log out" + err.message);
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
        console.log("Successfully logged in!", user.id);
        res.send(user.id);
    }
    catch (err) {
        console.log(err.message)
    }
}

async function loginWithEmail(req, res, next) {
    const credentials = Realm.Credentials.emailPassword(
        req.body.email,
        req.body.password
    );

    const user = await app.logIn(credentials);
    console.log("Successfully logged in!", user.id);
    res.send(user.id);
}
async function anonymousUserLink(req, res, next) {

    try {
       // var currentAnonymousUser = await app.currentUser.
     //   console.log(currentAnonymousUser.id);
        const anonymousUser = await app.logIn(Realm.Credentials.anonymous());
        console.log("Successfully logged in!", anonymousUser.id);
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

        const officialUser= await anonymousUser.linkCredentials(
          emailPasswordUserCredentials   
        );
        console.log("Successfully logged in!", officialUser.id);
     
    } catch (err) {
        console.log(err.message)
        res.send(err.message);
    }


    // try {
    //     const user = await app.currentUser.linkCredentials(
    //         Realm.Credentials.anonymous()
    //     );
    //     console.log("Successfully logged in!", user.id);
    //     res.send(user.id);
    // } catch (err) {
    //     console.error("Failed to log in", err.message);
    // }
}

module.exports = {
    login,
    logout,
    signup,
    loginWithEmail,
    anonymousUserLink,

};