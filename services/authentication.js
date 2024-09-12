const jwt = require("jsonwebtoken")
const { idText } = require("typescript")
const secret = '123'

function createTokenForUser(user){
    const userPayload = {
        fullname: user.fullname,
        id: user._id,
        email : user.email,
        profileImageURL : user.profileImageURL,
        role : user.role

    }
    const userToken = jwt.sign(userPayload, secret)
    return userToken
}

function validateToken(token){
    const verifiedPayload = jwt.verify(token, secret)
    return verifiedPayload
}

module.exports ={
    createTokenForUser,
    validateToken
}