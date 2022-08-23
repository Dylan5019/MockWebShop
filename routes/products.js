const express = require('express');
const router = express.Router();


const Order = require("./../models/orders");
const Product = require('./../models/product');
const { db } = require('./../models/product');


router.get('/', async (req, res) => {

    if (req.session.loggedIn) {
        if (req.session.loggedIn == true) {


            const products = await Product.find({});
            const orders = await Order.find({'products.reviews': {$gt : 0}});
            

            if (req.session.shoppingCart) {

            } else {
                req.session.shoppingCart = [{
                    productID: -1,
                    quantity: -1
                }]

            }

            res.render('products/index', { products, orders });


        } else {
            res.redirect('/login');
        }
    } else {
        res.redirect('/login');
    }


})



//Post Request for Products
router.post('/', async (req, res) => {


    if (req.session.loggedIn) {
        if (req.session.loggedIn == true) {


            if (req.session.shoppingCart) {

                let shoppingCart = req.session.shoppingCart;
                let objectIndex = shoppingCart.findIndex((object) => object.productID == req.body.productID); //Get Index of Product if It Exist in the Shoping Cart Already
                // If the item exist, then update quanity by 1
                if (objectIndex != -1) {

                    shoppingCart[objectIndex].quantity = shoppingCart[objectIndex].quantity + 1;

                }
                // If Shopping cart doesn't exist add new product to the cart
                else {
                    shoppingCart.push({
                        productID: req.body.productID,
                        quantity: 1
                    });


                }
                // Update the Session and Save
                req.session.shoppingCart = shoppingCart;
                req.session.save();
                res.redirect('/products');
                //console.log(req.session.shoppingCart)
            }


        } else {
            res.redirect('/login');
        }
    } else {
        res.redirect('/login');
    }

    // Check if Session exist

})




module.exports = router;