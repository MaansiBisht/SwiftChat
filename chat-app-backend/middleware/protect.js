const jwt = require("jsonwebtoken");

async function protect(req) {
    return new Promise((resolve, reject) => {
        const token = req.cookies?.authToken;
        if (token) {
            jwt.verify(token, process.env.JWTPRIVATEKEY, (err, decoded) => {
                if (err) {
                    reject(new Error("Invalid token"));
                } else {
                    resolve(decoded);
                }
            });
        }
        else {
            reject(new Error("No token provided"));
        }
    });
}
module.exports = protect;