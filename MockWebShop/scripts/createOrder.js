const mongoose = require('mongoose');
const Order = require('../models/orders');


module.exports = {
    Order: async function createOrder(products, user) {


        // Connecting To Mongoose
        mongoose.connect('mongodb://localhost:27017/webshopApp', { usenewUrlParser: true, useUnifiedTopology: true })
            .then(() => {
                //console.log(`Connection Open`);
            })
            .catch((err) => {
                console.log(`OH NO ERROR`);
                console.log(err);
            });





        const p = new Order({
            products: products,
            date: new Date(),
            user: user
        })

        p.save().then(p => {

        }).catch(e => {

        })



    }
}
