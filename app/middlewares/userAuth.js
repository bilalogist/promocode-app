const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {

    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];
    try {

        const data = jwt.verify(token, process.env.SECRET_KEY);
        if (data)
            next();

    }
    catch (err) {
        const message = err.message === "jwt expired" ? "Token has expired" : "Invalid token";
        return apiResponse(res, true, message, null, "UNAUTHORIZED")
    }



}