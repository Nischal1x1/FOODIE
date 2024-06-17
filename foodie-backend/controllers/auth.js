const bcrypt = require("bcryptjs")
const SignUp = require('../models/signupmodal')
const jwt = require('jsonwebtoken')
const util = require('util')
const { send } = require("process")



const jwtSecret = "fskdbf374h2jn{}jdiw()sdhsfhjsb??djskjdsk1212nkdfkdn[]nskdksn[}nfdhjdks231"
function generateOtp() {
    return Math.floor(1000 + Math.random() * 9000)
}
const createUser = async (req, res) => {
    try {

        const { name, email, password, mobilenumber } = req.body;
        const otpRegistration = generateOtp();
        const otpForgetPassword = generateOtp();
        const oldUser = await SignUp.findOne({ email: email, isOtpRegistrationVerified: true });

        if (oldUser) {
            return res.status(409).send({ success: false, message: "User already exists" });
        }

        const encryptedPassword = await bcrypt.hash(password, 10);


        await SignUp.create({
            name: name,
            mobilenumber: mobilenumber,
            email: email,
            password: encryptedPassword,
            otpRegistration: otpRegistration,
            isOtpRegistrationVerified: true
        });


        // await client.messages.create({
        //     body: `Your OTP is  ${otpRegistration}`,
        //     from: '+12075693951',
        //     to: '+977' + req.body.mobilenumber
        // });

        // Send success response
        return res.status(200).send({ success: true, message: 'User Created' });
    } catch (error) {
        // Handle errors and send error response
        console.error(error);
        return res.status(500).send({ success: false, message: 'Failed to create user' });
    }
};

const verifyUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const registeredUser = await SignUp.findOne({ email: email, isOtpRegistrationVerified: true })
        await SignUp.deleteMany({ isOtpRegistrationVerified: false })
        console.log(registeredUser)
        if (!registeredUser) {
            return res.status(409).send({ success: false, message: 'Not a registered User' })
        }

        if (await bcrypt.compare(password, registeredUser.password)) {
            const token = jwt.sign({ email: registeredUser.email }, jwtSecret,  )
            return res.status(200).send({ success: true, data: { token, registeredUser } });
        } else {
            return res.status(403).send({ success: false, message: "Incorrect email or password." });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send({ success: false, message: "Failed to process" });
    }
}




//Middleware Functions

const Protection = async (req, res, next) => {
    try {
        const testToken = req.headers.authorization;
        let token;

        if (testToken && testToken.startsWith('Bearer')) {
            token = testToken.split(' ')[1];

        }
        console.log(token)

        if (!token) {
            return res.status(403).send({ success: false, message: 'Not Logged In' });
        }

        const decodedToken = await util.promisify(jwt.verify)(token, jwtSecret)

        const user = await SignUp.findOne({ email: decodedToken.email });
        console.log(user.email)

        if (!user) {
            return res.status(404).send("User not found");
        }

        req.user = user;
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).send({ success: false, message: 'Token has expired' });
        }
        console.error(error);
        return res.status(500).send({ success: false, message: "Server Failure" });
    }
}



const Restriction = async (req, res, next) => {
    try {


        if (req.user.role !== 'admin') {
            return res.status(401).send({ success: false, message: 'Restricted property' })
        }
    } catch (error) {
        return res.status(500).send({ success: false, message: "Server Failure" })

    }

    next()

}
module.exports = { createUser, verifyUser, Protection, Restriction }

