const Realm = require("realm");
const app = new Realm.App({ id: "application-0-cjmsl" });
const jwt_decode = require('jwt-decode');

async function auth(req, res, next) {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        var decoded = jwt_decode(token);
        console.log("decoded", decoded.sub);
        var userId = decoded.sub;

        const loggedInUserAll = await app.allUsers;
        console.log('allUsers',loggedInUserAll);
        const loggedInUser = await app.allUsers[userId];
        
        if (loggedInUser != undefined && loggedInUser.id == userId) {
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

module.exports = {
    auth
}