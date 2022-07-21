const Realm = require("realm");
// const app = new Realm.App({ id: "tasktracker-yemzw" });
const app = new Realm.App({ id: "passwordresetapp-ylqjh" });


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
        var method = req.body.method;
        const args = [{ requestId: "726ba503cf864e4097fe17537" }, { method: method }];
        await app.emailPasswordAuth.callResetPasswordFunction(
            { email, password },
            args
        );
        res.send("ok");
    }
    catch (error) {
        next(error.message);
        res.send(error.message);
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
        console.log(error.message);
        next(error.message);
        res.send(error);
    }
}

async function sendTestEmail(req, res, next) {
    var nodeoutlook = require('nodejs-nodemailer-outlook')
    console.log(req.body.message);
    nodeoutlook.sendEmail({
        auth: {
            user: "vishnukumar.ps@outlook.com",
            pass: "thriller1!"
        },
        from: 'vishnukumar.ps@outlook.com',
        to: req.body.toAddress,
        subject: req.body.subject,
        html: `<b>${req.body.message}</b>`,
        text: req.body.message,
        //replyTo: 'receiverXXX@gmail.com',
        // attachments: [
        //                     {
        //                         filename: 'text1.txt',
        //                         content: 'hello world!'
        //                     },
        //                     {   // binary buffer as an attachment
        //                         filename: 'text2.txt',
        //                         content: new Buffer('hello world!','utf-8')
        //                     },
        //                     {   // file on disk as an attachment
        //                         filename: 'text3.txt',
        //                         path: '/path/to/file.txt' // stream this file
        //                     },
        //                     {   // filename and content type is derived from path
        //                         path: '/path/to/file.txt'
        //                     },
        //                     {   // stream as an attachment
        //                         filename: 'text4.txt',
        //                         content: fs.createReadStream('file.txt')
        //                     },
        //                     {   // define custom content type for the attachment
        //                         filename: 'text.bin',
        //                         content: 'hello world!',
        //                         contentType: 'text/plain'
        //                     },
        //                     {   // use URL as an attachment
        //                         filename: 'license.txt',
        //                         path: 'https://raw.github.com/nodemailer/nodemailer/master/LICENSE'
        //                     },
        //                     {   // encoded string as an attachment
        //                         filename: 'text1.txt',
        //                         content: 'aGVsbG8gd29ybGQh',
        //                         encoding: 'base64'
        //                     },
        //                     {   // data uri as an attachment
        //                         path: 'data:text/plain;base64,aGVsbG8gd29ybGQ='
        //                     },
        //                     {
        //                         // use pregenerated MIME node
        //                         raw: 'Content-Type: text/plain\r\n' +
        //                              'Content-Disposition: attachment;\r\n' +
        //                              '\r\n' +
        //                              'Hello world!'
        //                     }
        //                 ],
        onError: (e) => console.log(e),
        onSuccess: (i) => console.log(i)
    }


    );

    res.send("email sent");
}


async function resetPasswordByTokenAndTokenIdNewPassword(req, res, next) {
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

async function logout(request, res, next) {
    try {
        const currentUser1 = await app.allUsers[request.body.userId]
        console.log("Current User" + currentUser1);
        var userObj = {}
        if (currentUser1) {
            if (currentUser1.state == "LoggedIn") {
                //await app.currentUser.logOut();
                currentUser1.logOut();
                console.log("Successfully logged out!");
                userObj.state = currentUser1.state;
                res.send(userObj);
            }
        }
        else {
            res.send(request.body.userId + "  user is not logged in");
        }
    } catch (err) {
        console.error("Failed to log out", err.message);
        res.send("failed to log out" + err.message);
    }
}

async function login(req, res, next) {
    try {
        const credentials = Realm.Credentials.emailPassword(
            req.body.email,
            req.body.password
        );

        const user = await app.logIn(credentials);
        var token = user.refreshToken;

        console.log(token);
        console.log("Successfully logged in!", user.id);
        var userObj = {
            id: user.id,
            email: user.profile.email,
            identities: user.identities,
            state: user.state,
            refreshtoken: token,
            accessToken: user.accessToken,
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

async function sms(req, res, next) {

    var userName = "hostel123";
    var userPassword = "1234567";
    var msgRecepient = "7736177715";
    var msgText = "This is a demo msg please ignore!";
    var url2 = "http://198.24.149.4/API/pushsms.aspx?loginID=" + userName + "&password=" + userPassword + "&mobile=" + msgRecepient + "&text=" + msgText + "&senderid=CHPSMS&route_id=2&Unicode=0";

    var axiosObj = require('axios');
    console.log("datat")
    var config = {
        method: 'get',
        url: url2,
        headers: {
            'Content-Type': 'application/json',
        },
    };
    let response = await axiosObj(config);
    console.log(response);
    res.send(response)

}
module.exports = {
    signup,
    sms,
    resendConfirmationEmail,
    // signin,
    // confirmUser,
    sendPasswordResetEmail,
    resendPasswordResetEmail,
    // resetPassword,
    // forgotPassword,
    // changePassword
    sendTestEmail,
    resetPasswordByTokenAndTokenIdNewPassword,
    login,
    logout
}