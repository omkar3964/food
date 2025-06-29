import jwt from 'jsonwebtoken'
import _default from 'validator'

const authMiddleware = (req, res, next) => {
    const { token } = req.headers
    // console.log(token)
    try {
        if (!token) {
            return res.status(401).json({ success: false, message: "Not authorized user Login again." })
        }

        const token_decode = jwt.verify(token, process.env.JWT_SECRET)
        req.body = req.body || {}; 
        req.body.userId = token_decode.id
        next()
    }catch (error) {
        res.status(401).json({ success: false, message: `Invalid token: ${error}` })
    }
}
export default authMiddleware

