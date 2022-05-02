
const Realm = require("realm");

//const app = new Realm.App({ id: "" });//codeaffactions@gmail.com
// const app = new Realm.App({ id: "vishnutest-hnzpv" });// vishnukumar5417@gmail.com
const app = new Realm.App({ id: "" });// vishnukumar5417@gmail.com
//const app = new Realm.App({ id: "" });// Dedicated to spave-dev


const jwt_decode = require('jwt-decode');
const res = require("express/lib/response");
const jwt = require('jsonwebtoken')
async function anonymousLogin(req, res, next) {
    // Create an anonymous credential

    const credentials = Realm.Credentials.anonymous();
    try {
        const user = await app.logIn(credentials);
        var x = user.accessToken;
        var userObj = {
            id: user.id,
            identities: user.identities,
            state: user.state,
            refreshToken: user.refreshToken,
            accessToken: user.accessToken,
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
        var x = await app.emailPasswordAuth.registerUser(
            {
                email: req.body.email,
                password: req.body.password
            }
        )
        console.log("signup", x);
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
        // user.
        const user = await app.logIn(credentials);
        // var x= await user.functions.test1("testt")
        // res.send(x);
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
        const anonymousUser = await app.allUsers[req.body.userId];
        //var anonymousUser = await app.currentUser; cmmeted on friday
        var anonymousObj = {
            id: anonymousUser.id,
            email: anonymousUser.profile.email,
            identities: anonymousUser.identities,
            state: anonymousUser.state,
            refreshToken: anonymousUser.refreshToken,
            accessToken: anonymousUser.accessToken
        }
        // res.send(anonymousObj);
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
            refreshToken: officialUser.refreshToken,
            accessToken: officialUser.accessToken,

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

async function logoutUser(request, res, next) {
    try {
        var allUsers = await app.allUsers;
        const currentUser = await app.allUsers[request.body.userId];
        console.log("Current User" + currentUser);
        var userObj = {}
        if (currentUser) {
            if (currentUser.state == "LoggedIn") {
                await app.currentUser.logOut();
                console.log("Successfully logged out!");
                userObj.state = currentUser.state;
                res.send(userObj);
            }
        }
        res.send(request.body.userId + "  user is not logged in");


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

async function resetPassword(req, res, next) {
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
        //app.emailPasswordAuth.confirmUser();
        res.send("Password reset successfully");
    } catch (error) {
        console.log(error.message);
        res.send(error.message);
    }
}

async function chanagePassword(req, res, next) {
    try {
        const email = req.body.email;
        // The new password to use
        const password = req.body.password;
        // Additional arguments for the reset function
        const args = [];

        await app.emailPasswordAuth.callResetPasswordFunction(
            { email, password },
            args
        );

        // await app.emailPasswordAuth.ccallResetPasswordFunction(
        //     "myUsername", 
        //     "newPassword",
        //     ["Security Question Answer 1", "Security Question Answer 2", "securityCode:0510"]
        //      );

        res.send("Successfully changed password!");
    } catch (err) {
        console.error("Failed to change password", err.message);
        res.send("failed to change password" + err.message);
    }
}


async function customJwt(req, res, next) {
    // Create a custom jwt credential


    const jwt2 = jwt.sign(
        { _id: 'abc123', sub: "fb2fadce-e68e-4bc1-bee8-0a7b4d7c8597", aud: "fb2fadce-e68e-4bc1-bee8-0a7b4d7c8597", name: "test", email: "test@gmail.com", },
        'fb2fadce-e68e-4bc1-bee8-0a7b4d7c8597',
        { expiresIn: '7 days' }

    );

    console.log(jwt2);
    const credentials = Realm.Credentials.jwt(jwt2);
    console.log(credentials);
    try {
        const user = await app.logIn(credentials);
        console.log(user)
        //user.customData();
        var outObj = {
            id: user.id,
            email: user.profile.email,
            identities: user.identities,
            state: user.state,
            refreshToken: user.refreshToken,
            authtoken: user.authtoken
        }

        console.log("Successfully logged in!", user.id);
        res.send(user);
    } catch (err) {
        console.error("Failed to log in", err.message);
    }
}

async function confirmUser(req, res, next) {
    //res.send(req.query.token);
    // console.log(req);
    try {
        console.log("confirmUser");
        var resetDetails = {
            token: req.query.token,
            tokenId: req.query.tokenId,

        }
        console.log(resetDetails);

        var result = await app.emailPasswordAuth.confirmUser(
            resetDetails
        );
        console.log(result);
        res.send("User confirmed successfully");
    } catch (error) {

    }
}

async function linkAccounts(user, email, password) {
    const emailPasswordUserCredentials = Realm.Credentials.emailPassword(
        email,
        password
    );
    const linkedAccount = await user.linkCredentials(
        emailPasswordUserCredentials
    );
    return linkedAccount;
}



async function linkAccounts(request, res, next) {

    try {
        var req = request;
        var allUsers = await app.allUsers;
        console.log(allUsers);
        email = request.body.email;
        password = request.body.password;

        const currentUser = await app.allUsers[request.body.userId];
        var obj = {
            id: currentUser.id,
            token: currentUser.authtoken,
            re: currentUser.refreshToken
        }

        console.log(obj);
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
        await currentUser.linkCredentials(
            emailPasswordUserCredentials
        );
        res.send(currentUser.refreshToken);
    } catch (error) {
        res.send(error.message);
    }

}

async function testApi(req, res, next) {
    console.log("testApi");
    res.send("testApi");
}

async function signupUser(request, response, next) {
    try {
        var userObject = {};
        //Convert anonymous user to normal user
        if (request.body.hasOwnProperty('email') && request.body.hasOwnProperty('password') && request.body.hasOwnProperty('userId')) {
            const anonymousUser = await app.allUsers[request.body.userId];
            await app.emailPasswordAuth.registerUser(
                {
                    email: request.body.email,
                    password: request.body.password
                }
            );
            const emailPasswordUserCredentials = Realm.Credentials.emailPassword(
                request.body.email,
                request.body.password
            );
            const officialUser = await anonymousUser.linkCredentials(
                emailPasswordUserCredentials
            );
            userId = officialUser.id;

            request.body.userId = userId;
            userObject["userId"] = userId;
            userObject["refreshToken"] = officialUser.refreshToken;
            userObject["accessToken"] = officialUser.accessToken;
            userObject["email"] = request.body.email;
            userObject["identities"] = officialUser.identities;
            userObject["state"] = officialUser.state;
            userObject["message"] = officialUser.profile.email + " is successfully registered"


        }
        // Normal user SignUp
        if (request.body.hasOwnProperty('email') && request.body.hasOwnProperty('password') && !request.body.hasOwnProperty('userId')) {

            await app.emailPasswordAuth.registerUser(
                {
                    email: request.body.email,
                    password: request.body.password
                }
            )
            // Create an email/password credential
            const credentials = Realm.Credentials.emailPassword(
                request.body.email,
                request.body.password
            );
            const user = await app.logIn(credentials);

            userId = user.id;
            request.body.email = request.body.userName;
            request.body.userId = userId;
            userObject["userId"] = userId;
            userObject["refreshToken"] = user.refreshToken;
            userObject["accessToken"] = user.accessToken;
            userObject["email"] = request.body.email;
            userObject["identities"] = user.identities;
            userObject["state"] = user.state;
            userObject["message"] = user.profile.email + " is successfully registered"
            console.log("Successfully logged in!", user.id);



        }
        // Anonymous user SignUp
        if (!request.body.hasOwnProperty('email') && !request.body.hasOwnProperty('password') && !request.body.hasOwnProperty('userId')) {
            const credentials = Realm.Credentials.anonymous();
            const user = await app.logIn(credentials);

            userId = user.id;
            request.body.userId = user.id;

            userObject["userId"] = userId;
            userObject["refreshToken"] = user.refreshToken;
            userObject["accessToken"] = user.accessToken;
            userObject["identities"] = user.identities;
            userObject["state"] = user.state;


        }
    } catch (error) {
        response.send(error.message);
    }

    response.send(userObject);
}

async function emailTest2(req, res, next) {
    var nodeoutlook = require('nodejs-nodemailer-outlook')
    nodeoutlook.sendEmail({
        auth: {
            user: "vishnukumar.ps@outlook.com",
            pass: "thriller1!"
        },
        from: 'vishnukumar.ps@outlook.com',
        to: 'vishnukumar5417@gmail.com',
        subject: 'Hey you, awesome!',
        html: '<b>This is bold text</b>',
        text: 'This is text version!',
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
}

async function emailTest(req, res, next) {
    try {
        var x = await app.emailPasswordAuth.registerUser(
            {
                email: req.body.email,
                password: req.body.password
            }
        )
        console.log("signup", x);
        // Create an email/password credential
        const credentials = Realm.Credentials.emailPassword(
            req.body.email,
            req.body.password
        );
        const user2 = await app.logIn(credentials);
        args = [];
        email = req.body.email;
        password = req.body.password;
        // user.

        //await app.emailPasswordAuth.callRese({ email, password }, args);

        //var x= await user.functions.sendEmail(req.body.to, req.body.msg);
        console.log(x);
    } catch (error) {
        next(error.message);
    }
}

async function gmailTest(req, res, next) {
    try {
        to = req.body.to;
        var nodemailer = require('nodemailer');
        var smtpTransport = require('nodemailer-smtp-transport');

        var transporter = nodemailer.createTransport(smtpTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            auth: {
                user: 'codeaffections@gmail.com',
                pass: 'T!ME2WiN'
            }
        }));

        var mailOptions = {
            from: 'codeaffections@gmail.com',
            to: to,
            subject: 'Sending Email using Node.js[nodemailer]',
            text: 'That was easy!'
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    } catch (error) {
        console.log(error.message);
        next(error);
    }
}


async function gmailTest33(req, res, next) {
    try {
        var requestObj = require('request');
        var options = {
            'method': 'POST',
            'url': 'https://spave-dev.livegivesave.com/v2/notification/confirmationMail',
            'headers': {
                'Content-Type': 'application/json',
                'requestId': '626ba503cf864e4097fe1753',
            },
            body: JSON.stringify({
                token: "7427d741b5adfdfc2341cdb1fc59f655f529e0d6f4a519d9fdc02ebe2d929f8249204deed2eef0827826a8d0934ed4a71fd1f14a667df1a674c0f96649b36964",
                tokenId: "626ba503cf864e4097fe1753",
                email: "vishnukumar5417@gmail.com",
                firstName: "vishnukumar",
            })

        };

        data = new Promise((resolve, reject) => {
            requestObj(options, function (error, response) {
                output = response.body;
                console.log("out", output);
                next(output);
            });

        });




    } catch (error) {
        console.log(error.message);
        next('hai');
    }

}

async function gmailTest3(req, res, next) {
    try {
        var axios = require('axios');
        var data = JSON.stringify({
            token: "7427d741b5adfdfc2341cdb1fc59f655f529e0d6f4a519d9fdc02ebe2d929f8249204deed2eef0827826a8d0934ed4a71fd1f14a667df1a674c0f96649b36964",
            tokenId: "626ba503cf864e4097fe1753",
            email: "codeaffections@gmail.com",
            firstName: "vishnukumar",
        });

        var config = {
            method: 'post',
            url: 'https://spave-dev.livegivesave.com/v2/notification/confirmationMail',
            headers: {
                'Content-Type': 'application/json',
                'requestId': '626ba503cf864e4097fe1753',
            },
            data: data
        };

     
            var x=await axios(config);
        
            if(x.status==200){
              res.send(x.data);
            }
            else{
                res.status(4000).send({
                    message: "error"
                });
            }
        
    } catch (error) {
        console.log(error.message);
        next('hai');
    }
}

async function callAPI(req, res, next) {
    try {



        var x = await app.emailPasswordAuth.registerUser(
            {
                email: req.body.email,
                password: req.body.password
            }
        )
        console.log("signup", x);
        // Create an email/password credential
        const credentials = Realm.Credentials.emailPassword(
            req.body.email,
            req.body.password
        );
        const user = await app.logIn(credentials);
        // const credentials = Realm.Credentials.emailPassword(
        //     req.body.email,
        //     req.body.password
        // );
        // // user.
        // const user = await app.logIn(credentials);
        // var x= await user.functions.callAPI("token","tokenId","useranme","msg");

    } catch (error) {
        console.log(error.message);
        next(error);
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
    resetPassword,
    customJwt,
    confirmUser,
    linkAccounts,
    testApi,
    signupUser,
    logoutUser,
    chanagePassword,
    emailTest,
    gmailTest,
    gmailTest3,
    callAPI

};