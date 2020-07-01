const express = require ('express')

const hotel = require('./hotel')
const user= require('./user')
const transaction = require('./transaction')
const owner = require('./owner')

const Router = express.Router();

Router.use('/hotel', hotel)
Router.use('/user',user)
Router.use('/transaction',transaction)
Router.use('/owner',owner)




module.exports = Router // export Route