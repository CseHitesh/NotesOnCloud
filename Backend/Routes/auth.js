const express = require('express');
const router = express.Router();
const user = require('../Models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fetchuser = require('../Middleware/fetchUser')

const JWT_SECRET = "THISISMYSECRETCODE"

//Route 1:  create a user using :POST-> "/api/auth/createuser" , No login required
router.post('/createuser',

    //checking vladation using react validator 
    [body('email', "enter a valid email").isEmail(),
    // password must be at least 5 chars long
    body('name', "Name should be minimun 5 length").isLength({ min: 5 }),
    body('password', "password must be minimum 8 length").isLength({ min: 8 })],
    async (req, res) => {





        //If there is any error then return Bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {




            const User = await user.findOne({ email: req.body.email });

            //check if the user(email) is already exist then throw an error 
            if (User != null) {
                return res.status(400).json({ error: "Sorry a user with this email already exists" })
            }



            //encripting user normal password into hased secure password
            const salt = await bcrypt.genSalt(10);
            const myPlaintextPassword = req.body.password;
            const securePassword = await bcrypt.hash(myPlaintextPassword, salt)


            //putting all the data inthe Mondog Db 
            user.create({
                name: req.body.name,
                email: req.body.email,
                password: securePassword
            })


            const data = {
                User: {
                    id: user.id
                }
            }

         
            //we assign jwt signed token to the user using jsonwebtoken packaege of nodejs or rect
            const authToken = jwt.sign(data, JWT_SECRET);

            res.json({ authToken })
            //if any error occure then our app will not crash it will handeld in the catch block 
        } catch (error) {
            console.log(error);
            res.json({
                "message": "Please enter a unique email",
                "email": req.body.email,
                "name": req.body.name,
                "password": req.body.password,

            })

        }

    }



);


//Route 2: login a already created user  using Post-> "/api/auth/login"
router.post('/login',

    //checking vladation using react validator 
    [body('email', "enter a valid email").isEmail(),
    // password must be at least 5 chars long

    body('password', "password can not be blank").exists()],
    async (req, res) => {

        const loginStatus = false;
        //If there is any error then return Bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {

            let User = await user.findOne({ email: req.body.email });
            //check if the user(email) is already exist then throw an error 

            if (!User) {
                return res.status(400).json({ message: "invalid informatino try again" });
            }
            let userEnterdPassword = req.body.password;
            // let dbpassword = userexist.password;
            // console.log(userEnterdPassword + dbpassword);

            const compare = await bcrypt.compare(userEnterdPassword, User.password);

            if (!compare) {
                return res.status(400).json({ message: "invalid informatino try again" });
            }
            const data = {
                User: {
                    id: User.id
                }
            }
            //we assign jwt signed token to the user using jsonwebtoken packaege of nodejs or rect
            const authToken = jwt.sign(data, JWT_SECRET);

            res.json({ authToken, loginStatus: true })
            // //if any error occure then our app will not crash it will handeld in the catch block 
        } catch (error) {
            console.log(error);
            res.json({
                "message": "invlid details or wrong information"
            })
        }
    }
);

//Route 3: getting information of already created user  using Post-> "/api/auth/getuser" login required

router.post('/getuser', fetchuser, async (req, res) => {

    try {

        let userId = await req.User.id;
        let userDetails = await user.findById(userId).select("-password");
        res.send(userDetails)
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal server error")
    }
}
);
module.exports = router