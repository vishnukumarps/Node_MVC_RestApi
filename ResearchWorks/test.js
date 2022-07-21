
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
//end of snippet




exports = async ({ token, tokenId, username, password }, arg) => {
    try {

        var userObj = {
            msg: "password reset " + username,
            token: token,
            tokenId: tokenId,
            username: username,
            password: password,
            requestId: arg[0].requestId,
            operation: arg[1].operation
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
            var firstName = arg[2].firstName;
            // email send code
            var axiosObj = require('axios');
            var data = JSON.stringify({
                token: token,
                tokenId: tokenId,
                email: username,
                firstName: firstName
            });
            var config = {
                method: 'post',
                url: 'https://spave-dev.livegivesave.com/v2/notification/resetPasswordMail',
                headers: {
                    'Content-Type': 'application/json',
                    'requestId': userObj.requestId
                },
                data: data
            };
            let response = await axiosObj(config);
            return { status: 'pending' }
        }
        return { status: 'fail' };
    } catch (error) {
        return { status: 'fail' };
    }

};
//end



exports = function (changeEvent) {

    const data = JSON.stringify(changeEvent.fullDocument);
    if (data.status === false) {
        var dataObj={
            status:false,
            message:"error",
            maiil:"Mail send"
        }
        const cluster = context.services.get("mongodb-atlas");
        const users = cluster.db("tracker").collection("passwordReset");
        var x = users.insertOne({
            ...dataObj
        });

    }
    //mail sending
};


text: 'hiii',



    onError: (e) => console.log(e),
        onSuccess: (i) => console.log(i)
});