const FoodItem = require('../models/fooditemmodal')


const addItem = async (req, res) => {
    try {

        const { foodname, price, description, sides } = req.body;

        await FoodItem.create({
            foodname,
            price,
            description,
            sides
        })

        res.status(200).send({ success: true, message: 'FoodItem Created' })
    } catch (e) {
        res.status(500).send({ success: true, message: 'Server Crashed' })
    }

}

const getItem = async (req, res) => {
    try {
        const { foodname } = req.body;
        const mainItem = await FoodItem.findOne({ foodname: foodname })
        console.log(mainItem)

        if (mainItem) {
            return res.status(200).send({ success: true, message: 'Food Item Found', data: mainItem })

        } else {
            return res.status(400).send({ success: false, message: 'Food Item Not Found' })
        }



    } catch (error) {
        return res.status(500).send({ success: false, message: 'Server failed', error: e })
    }
}

const deleteItem = async (req, res) => {
    try {

        await FoodItem.findByIdAndDelete(req.params.id)
        res.status(204).send({success: true, data:null})

        
    } catch (error) {
        res.status(500).send({ success: false, message: 'Server failed', error: e })
    }

}

const updateItem = async (req, res) => {
  try {
    
  } catch (error) {
    
  }

};



module.exports = { addItem, getItem , deleteItem, updateItem}