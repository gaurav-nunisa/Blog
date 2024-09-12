const {validateToken} = require("../services/authentication")

function checkForAuthenticationCookie(cookieName){

    return (req, res, next) => {

        const tokenCookieName = req.cookies[cookieName];
        if(!tokenCookieName){
            return next()
        }
        try {
            const userPayload = validateToken(tokenCookieName)
            console.log("userPayLoad is ", userPayload)
            req.user = userPayload
        } catch (error) {
            
        }
        return next()
    }

}
module.exports = {
    checkForAuthenticationCookie
}