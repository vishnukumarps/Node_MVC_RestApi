const Realm = require("realm");
const app = new Realm.App({ id: "hope-xggeh" });

async function auth(req, res, next) {
    console.log(req.headers);
    var userId= req.headers.userid;
    console.log("userId", userId);
    var currentUser = await app.currentUser;
    console.log("currentUser", currentUser.id);
    if (currentUser.id==userId) {
        console.log(currentUser.profile);
        console.log(currentUser.identities);
        console.log(currentUser.state);
        console.log("user is authenticated");
        next();
    }
    else {
        
        console.log("user is not authenticated");
        res.send("user is not authenticated");
    }
  
}

module.exports = {
    auth
}