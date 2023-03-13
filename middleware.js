const jwt = require('jsonwebtoken');


module.exports = (req, res, next) => {
    try {

        let token = req.header('x-token')
        if (!token) {
            res.status(400).send("Token Not Found")
        }

        let decode = jwt.verify(token, "jwtSecret");
        req.user = decode.user
        next()


    } catch (err) {
        console.error(err)
        res.status(500).send("Server Error in Middleware")
    }
}