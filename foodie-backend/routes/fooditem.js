const Router = require('express')
const { addItem, getItem, deleteItem, updateItem } = require('../controllers/fooditem')
const { Restriction, Protection } = require('../controllers/auth')

const fooditemRouter = Router()

//admin
fooditemRouter.post('/fooditem/',Protection, Restriction, addItem)
fooditemRouter.delete('/fooditem/:id',Protection, Restriction, deleteItem )
fooditemRouter.patch('fooditem/:id', Protection, Restriction, updateItem )

//user
fooditemRouter.get('/fooditem',Protection, getItem )
module.exports = fooditemRouter
