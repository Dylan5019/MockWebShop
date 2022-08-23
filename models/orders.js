const { text } = require('express');
const mongoose = require('mongoose');


const subSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    quantity: {
        type: Number,
        required: true
    },
     productID: {
        type: Number,
        required: false
    },
    review: {
        type: Number,
        required: true
    }
})



const orderSchema = new mongoose.Schema({
    products: [subSchema],
    date: {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true
    }

})





const Order = mongoose.model('Order', orderSchema);

module.exports = Order;