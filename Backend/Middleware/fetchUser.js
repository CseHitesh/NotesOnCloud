// var jwt = require('jsonwebtoken');
// const JWT_SECRET = "THISISMYSECRETCODE"
// const fetchuser = async (req, res, next) => {
//     // Get the user form the jwt token and add id to the req object
//     const token = req.header('auth-token');
//     if (!token) {
//         res.status(401).send({ error: "please authenticate using a valid token" })
//     }

//     try {

//         const data = jwt.verify(token, JWT_SECRET);
//         req.user = data.user;
//         console.log(data);
//         next();

//     } catch (error) {
//         res.status(401).send({ error: "please authenticate using a valid token" })
//     }
// }
// module.exports = fetchuser;

var jwt = require('jsonwebtoken');
const JWT_SECRET = "THISISMYSECRETCODE"

const fetchuser = (req, res, next) => {
    // Get the user from the jwt token and add id to req object
    const token = req.header('auth-token');
    // console.log(token);
    if (!token) {
        res.status(401).send({ error: "Please authenticate using a valid token" })
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.User = data.User;
        // console.log(data);
        next();
    } catch (error) {
        res.status(401).send({ error: "Please authenticate using a valid token" })
    }

}


module.exports = fetchuser;