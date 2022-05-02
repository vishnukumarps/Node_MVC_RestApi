
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
       return{error:error}
    }
};//end of snippet

