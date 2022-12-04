const jwt = require('jsonwebtoken')


const userExtractor = ( request, response, next) => {
    if(request.token){
    const token = (request.token)
    const decodedToken = jwt.verify(token, process.env.SECRET)
    request.user = decodedToken.username
    next()}else{
        next()
    }

}

module.exports = { userExtractor }