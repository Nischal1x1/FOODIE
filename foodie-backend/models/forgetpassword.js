const mongoose = require('mongoose')

const forgetpasswordSchema = mongoose.Schema(
    {
        mobilenumber: {
            type: Number,
           
        },
        email:{
            type: String,
            required : [true, 'Please enter the email']
        },
        
        otpForgetPassword:{
            type: Number,
            
        },
        isOtpForgetPasswordVerified:{
            type:Boolean
        }

    },
    {
        timestamps: true
    }
    
)

const ForgetPassword = mongoose.model('ForgetPassword', forgetpasswordSchema);
module.exports = ForgetPassword;