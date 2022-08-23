const express = require('express');
const router = express.Router();
const mongoose = require(`mongoose`);
const generateOrder = require('./../scripts/createOrder');


const Product = require('./../models/product');
const { db } = require('./../models/product');


mongoose.connect('mongodb://localhost:27017/webshopApp', { usenewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log(`Connection Open`);
    })
    .catch((err) => {
        console.log(`OH NO ERROR`);
        console.log(err);
    });


// Rendering the Deafult Home Page
router.post('/', async (req, res) => {
    if (req.session.loggedIn) {
        if (req.session.loggedIn == true) {

            let shoppingCart = req.session.shoppingCart;

            let products = [];




            for (let i = 1; i < shoppingCart.length; i++) {

                const product = await Product.findOne({ productID: shoppingCart[i].productID }).catch();

                //console.log(product.quantity);

                if (product.quantity >= shoppingCart[i].quantity) {


                    const product = await Product.findOneAndUpdate({ productID: shoppingCart[i].productID }, { $inc: { quantity: -(shoppingCart[i].quantity) } }, { new: true }).catch();
                    //console.log(product.productID + ":" + product.quantity);

                    //Create Order
                    products.push({
                        name: product.name,
                        price: product.price,
                        productID: product.productID,
                        quantity: shoppingCart[i].quantity,
                        review: 0
                    })

                    req.session.shoppingCart = [{
                        productID: -1,
                        quantity: -1
                    }]


                } else {


                    // res.send("Shoping Cart Quantity was Greater then Stock, Updated Cart to be equal to Stock");
                    shoppingCart[i].quantity = product.quantity;
                    res.redirect('/checkoutError');
                }

            }

            //Debug
            //console.log(products);

            
            generateOrder.Order(products, req.session.currentUser);

            res.redirect('/shoppingCart');

        } else {
            res.redirect('/login');
        }
    } else {
        res.redirect('/login');
    }
})


module.exports = router;

