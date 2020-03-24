const jwt = require('jsonwebtoken')

module.exports = {
    auth: (req, res, next) => {
        if (req.method !== 'OPTIONS') {
            jwt.verify(req.token, 'uniqueKey', (err, decode) => {
                if (err) {
                    console.log(err)
                    return res.status(401).json({
                        message: "User Not Authorized"
                    })
                }
                req.user = decode // hasil terjemahan token
                console.log(req.user)
                next()
            })
        } else {
            next()
        }
    }
}