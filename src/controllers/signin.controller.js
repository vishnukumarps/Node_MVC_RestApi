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
        await app.currentUser.logOut();
    } catch (err) {
        console.error("Failed to log out", err.message);
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

    }
    catch (err) {
        console.log(err.message)
    }
}

module.exports = {
    login,
    logout,
    signup
};