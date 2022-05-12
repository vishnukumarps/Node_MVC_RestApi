
exports = async ({ token, tokenId, username }) => {
    try {
        console.log(tokenId)
        var userObj = {
            msg: "hai2",
            token: token,
            tokenId: tokenId,
            username: username
        }
        var axiosObj = require('axios');
        var data = JSON.stringify({
            token: token,
            tokenId: tokenId,
            email: username,
            firstName: username + "from realm"
        });
        var config = {
            method: 'post',
            url: 'https://spave-dev.livegivesave.com/v2/notification/confirmationMail',
            headers: {
                'Content-Type': 'application/json',
                'requestId': '626ba503cf864e4097fe1753'
            },
            data: data
        };
        let response = await axiosObj(config);
        if (response.status == 200) {
            return (response.data);
        }
        else {
            return ({
                message: "error"
            });
        }
    } catch (error) {
        return { error: error }
    }
};//end of snippet








// reset password
exports = async ({ token, tokenId, username, password }, args) => {
    try {
        var axiosObj = require('axios');
        var data = JSON.stringify({
            token: token,
            tokenId: tokenId,
            email: username,
            reauestId: args[0].requestId,
        });
        var config = {
            method: 'post',
            url: 'newURL',
            headers: {
                'Content-Type': 'application/json',
            },
            data: data
        };
        let response = await axiosObj(config);
        return { status: 'email has sent' };
    } catch (error) {
        return { error: error.message }
    }
};



/// confirmation email
exports = async ({ token, tokenId, username }) => {
    console.log(tokenId)
    var axiosObj = require('axios');
    var data = JSON.stringify({
        token: token,
        tokenId: tokenId,
        email: username,
        firstName: username + "from realm"
    });
    var config = {
        method: 'post',
        url: 'https://spave-dev.livegivesave.com/v2/notification/confirmationMail',
        headers: {
            'Content-Type': 'application/json',
        },
        data: data
    };
    let response = await axiosObj(config);
    if (response.status == 200) {
        return (response.data);
    }
    else {
        return ({
            message: "error"
        });
    }
};//end of snippet







exports = async ({ token, tokenId, username, password }, arg) => {
    var userObj = {
        msg: "password reset " + username,
        token: token,
        tokenId: tokenId,
        username: username,
        password: password,
        requestId: arg[0].requestId,
        method: arg[1].method
    }
    const cluster = context.services.get("mongodb-atlas");
    const users = cluster.db("tracker").collection("passwordReset");
    var x = users.insertOne({
        ...userObj
    });

    if (arg[1].method == "CHANGEPASSWORD") {
        return { status: 'success' };
    }
    if (arg[1].method == "RESETPASSWORD") {
        // email send code
        return { status: 'pending' }
    }



    var axiosObj = require('axios');
    var data = JSON.stringify({
        token: token,
        tokenId: tokenId,
        email: username,
        firstName: username + "from realm"
    });
    var config = {
        method: 'post',
        url: 'https://spave-dev.livegivesave.com/v2/notification/confirmationMail',
        headers: {
            'Content-Type': 'application/json',
            'requestId': '626ba503cf864e4097fe1753'
        },
        data: data
    };
    let response = await axiosObj(config);

};
