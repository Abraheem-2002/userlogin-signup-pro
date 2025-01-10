const { sign, verify } = require("jsonwebtoken");
const cookie = require('cookie-parser');
require('dotenv').config();

const createToken = (user) => {
    const accessToken = sign({ user }, process.env.TOKEN_SCREET, {
        expiresIn: "10h"
    });
    return accessToken;
}

const validetoken = (req, res, next) => {
    const token = req?.headers?.authorization?.split(' ')[1] || '';
    if (!token) {
        return res.json({
            message: "Rejected Request",
            state: 0,
            status: 'error',
            reject: 1,
        });
    }

    try {
        verify(token, process.env.TOKEN_SCREET, (err, decodedToken) => {
            if (err) {
                console.log(err);
                return res.json({
                    message: "Error please contact us",
                    state: 0,
                    status: 'error',
                });
            }
            if (decodedToken) {
                req.userdata = decodedToken.user; // Attach user data to the request object
                res.setHeader('Authorization', `Bearer ${token}`);
                next();
            }
        });
    } catch (err) {
        console.log(err);
        return res.json({ error: err });
    }
}

module.exports = {
    createToken,
    validetoken,
}