const jwt = require('jsonwebtoken');


module.exports = (req, res, next) => {
    try {

        let token = req.header('x-token')
        if (typeof token =="undefined") {
            res.status(400).send("Token Not Found")
        }
        token = token.split(" ")[1]

      
        req.token = token
        next()


    } catch (err) {
        console.error(err)
        res.status(500).send("Server Error in Middleware")
    }
}
