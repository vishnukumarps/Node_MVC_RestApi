const Realm = require("realm");
const app = new Realm.App({ id: "tasktracker-yemzw" });


async function signup(req, res, next) {
    try {
        const { email, password, name } = req.body
        if (email && password) {
            await app.emailPasswordAuth.registerUser(
                {
                    email: email,
                    password: password,
                });
            var out = await checkEmailConfirmed(req);
            if (out.status) {
                res.status(200).json({
                    message: "User created successfully",

                });
            }
            else {
                res.status(400).send({
                    message: out.msg
                });
            }
        }
    } catch (error) {
        res.status(400).send({ error });
        next(error);
    }
}

async function resendConfirmationEmail(req, res, next) {
    try {
        const { email } = req.body;
        if (email) {
            // var x= await app.emailPasswordAuth.resendConfirmationEmail({ email });
            var x = await app.emailPasswordAuth.retryCustomConfirmation({ email })
            res.send("email sent");
        }
    } catch (error) {
        console.log(error.message);
        next(error.message);
    }
}

async function checkEmailConfirmed(req) {
    try {
        if (req.body.email && req.body.password) {
            const credentials = Realm.Credentials.emailPassword(
                req.body.email,
                req.body.password
            );
            const user = await app.logIn(credentials);
            return { status: true, msg: "user confirmed" }
        }
    } catch (error) {
        console.log(error);
        if (error.message === "confirmation required") {
            return { status: false, msg: "confirmation required" }
        }
        if (error === "name already in use") {
            return { status: false, msg: "name already in use" }
        }
        console.log(error.message);
        next(error);
    }
}


async function sendPasswordResetEmail(req, res, next) {
    try {
        const email = req.body.email;
        // The new password to use
        const password = req.body.password;
        // Additional arguments for the reset function
        const args = [{requestId:"726ba503cf864e4097fe17537"}];
        await app.emailPasswordAuth.callResetPasswordFunction(
            { email, password },
            args
        );
        res.send("email sent");
    } catch (error) {
        next(error.message);
        res.send(error);
    }
}

async function resendPasswordResetEmail(req, res, next) {
    try {
        const email = req.body.email;
        // Additional arguments for the reset function
        const args = [];
        await app.emailPasswordAuth.callResetPasswordFunction(
            { email },
            args
        );
        res.send("email sent");
    } catch (error) {
        next(error.message);
        res.send(error);
    }
}
module.exports = {
    signup,
    resendConfirmationEmail,
    // signin,
    // confirmUser,
    sendPasswordResetEmail,
     resendPasswordResetEmail,
    // resetPassword,
    // forgotPassword,
    // changePassword
}