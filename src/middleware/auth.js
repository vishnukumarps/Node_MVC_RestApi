const Realm = require("realm");
const app = new Realm.App({ id: "application-0-cjmsl" });
const jwt_decode = require('jwt-decode');

async function auth(req, res, next) {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        var decoded = jwt_decode(token);
        console.log("decoded", decoded.sub);
        var userId = decoded.sub;

        var currentUser = await app.currentUser;
        console.log("currentUser", currentUser.id);
        if (currentUser.id == userId) {
            console.log("user is authenticated");
            next();
        }
        else {
            console.log("user is not authenticated");
            res.send("user is not authenticated");
        }
    } catch (error) {
        console.log(error);
        res.send(error.meassage);
    }

}

async function authAdmin1(req, res, next) {
    console.log("authAdmin1");
    if(true){
        next();
    }
}

async function authAdmin2(req, res, next) {
    console.log("authAdmin2");
    if(true){
        next();
    }
}
module.exports = {
    auth,
    authAdmin1,
    authAdmin2
}