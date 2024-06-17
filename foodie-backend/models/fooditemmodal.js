const mongoose = require('mongoose')

const fooditemSchema = mongoose.Schema(
    {
        foodname: {
            type: String,
           
        },
        price:{
            type:String,
        },
        desciption:{
            type: String,
          
        },
        sides:{
            type:Object,
        }

    },
    {
        timestamps: true
    }
    
)

const FoodItem = mongoose.model('FoodItem', fooditemSchema);
module.exports = FoodItem;