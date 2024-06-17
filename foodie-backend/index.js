const authRouter = require('./routes/auth')
const fooditemRouter = require('./routes/fooditem')

const express = require('express');
const mongoose = require('mongoose');
const SignUp = require('./models/signupmodal');
const ForgetPassword = require('./models/forgetpassword');
const bcrypt = require("bcryptjs")
const twilio = require('twilio')


const app = express()
app.use(express.json())
app.use([authRouter, fooditemRouter])




// const mongoURI = "mongodb+srv://nischal3158:Nischal3158@cluster0.fh9b2z2.mongodb.net/Foodie?retryWrites=true&w=majority&appName=Cluster0"






app.post('/otpverify', async (req, res) => {
    try {
        const { email, otp, type } = req.body;

        let userVerify;
        if (type === 'registration') {
            userVerify = await SignUp.findOne({ email: email, otpRegistration: otp });
        } else if (type === 'forgetpassword') {
            userVerify = await ForgetPassword.findOne({ email: email, otpForgetPassword: otp });
        } else {
            return res.send({ success: false, message: "Invalid OTP type" });
        }

        if (userVerify) {

            if (type === 'registration') {
                await SignUp.updateOne({ _id: userVerify._id }, { $set: { isOtpRegistrationVerified: true } });
            } else if (type === 'forgetpassword') {
                await ForgetPassword.updateOne({ _id: userVerify._id }, { $set: { isOtpForgetPasswordVerified: true } });
            }

            return res.send({ success: true, message: "OTP verification successful" });
        } else {

            return res.send({ success: false, message: "Incorrect OTP" });
        }
    } catch (error) {
        console.error(error);
        return res.send({ success: false, message: "Failed to verify OTP" });
    }
});


app.post('/forgetpassword', async (req, res) => {
    try {
        const otpForgetPassword = generateOtp();
        const registeredUser = await SignUp.findOne({ email: req.body.email })

        if (!registeredUser) {
            return res.send({ success: false, message: 'User is not registered' })
        }


        await ForgetPassword.create({
            email: req.body.email,
            otpForgetPassword: otpForgetPassword,
            isOtpForgetPasswordVerified: false
        });
        await client.messages.create({
            body: `Your OTP is  ${otpForgetPassword}`,
            from: '+12075693951',
            to: '+977' + registeredUser.mobilenumber
        });

        return res.send({ success: true, message: 'User Verified' });
    } catch (error) {
        console.error(error);
        return res.send({ success: false, message: 'Failed to create user' });
    }
});


app.put('/forgetpassword', async (req, res) => {
    try {
        const { email, newPassword } = req.body;
        const encryptedPassword = await bcrypt.hash(newPassword, 10);
        const passwordChangedUser = await ForgetPassword.findOne({ email: email, isOtpForgetPasswordVerified: true })
        await ForgetPassword.deleteMany({ isOtpForgetPasswordVerified: false })
        if (passwordChangedUser) {
            const result = await SignUp.updateOne({ email: email }, { $set: { password: encryptedPassword } })

            if (result.modifiedCount > 0) {
                return res.send({ success: true, message: "Verified Password Changed" });
            }
        }
        return res.send({ success: false, message: 'Not verified Password Change' })


    }
    catch { res.send({ success: false, message: "Server Error" }); }
})


// app.post('/login', async (req, res) => {
//     try {
//         const { email, password } = req.body;
//         const registeredUser = await SignUp.findOne({ email: email, isOtpRegistrationVerified: true })
//         await SignUp.deleteMany({ isOtpRegistrationVerified: false })
//         console.log(registeredUser)
//         if (!registeredUser) {

//             return res.send({ success: false, message: 'Not a registered User' })
//         }


//         if (await bcrypt.compare(password, registeredUser.password)) {
//             const token = jwt.sign({ email: registeredUser.email }, jwtSecret)
//             return res.send({ success: true, data: token });
//         } else {
//             return res.send({ success: false, message: "Incorrect credentials" });
//         }
//     } catch (error) {
//         console.error(error);
//         res.send({ success: false, message: "Failed to process" });
//     }
// })



mongoose.connect(mongoURI).then(() => {
    console.log("Connected to the database")
    app.listen(3000, () => {
        console.log(`Node is listening`)
    })

}).catch((err) => {
    console.log('Error connecting to the database')
})

