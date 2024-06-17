const mongoose = require('mongoose')

const signupSchema = mongoose.Schema(
    {
        name: {
            type: String,

        },
        mobilenumber: {
            type: Number,
            required: [true, 'Please enter the number']
        },
        email: {
            type: String,
            required: [true, 'Please enter the email'],
            unique: true


        },
        password: {
            type: String,
            required: [true, 'Please enter the password']

        },
        role: {
            type: String,
            enum: ['admin', 'user'],
            default: 'user'
        },

        otpRegistration: {
            type: Number,

        },
        isOtpRegistrationVerified: {
            type: Boolean
        }

    },
    {
        timestamps: true
    }

)

const SignUp = mongoose.model('SignUp', signupSchema);
module.exports = SignUp;