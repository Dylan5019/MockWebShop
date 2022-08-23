const express = require('express');
const router = express.Router();

const Product = require('./../models/product');
const { db } = require('./../models/product');


router.get('/', async (req, res) => {

    if (req.session.loggedIn) {
        if (req.session.loggedIn == true) {


            
            if (req.session.shoppingCart) {

            } else {
                req.session.shoppingCart = [{
                    productID: -1,
                    quantity: -1
                }]

            }

            if (req.session.shoppingCart.length > 1) {

                let shoppingCart = req.session.shoppingCart;
                let productIDS = [];
                for (let i = 1; i < shoppingCart.length; i++) {
                    if (shoppingCart[i].quantity > 0) {
                        productIDS.push((shoppingCart[i].productID));
                    }
                }
                const products = await Product.find({ productID: { $in: [...productIDS] } }).catch();


                res.render('products/cart', { products, shoppingCart });

            } else {
                res.redirect("/emptyCart");
            }


        } else {
            res.redirect('/login');
        }
    } else {
        res.redirect('/login');
    }






})



//Post for Shopping Cart
router.post('/', async (req, res) => {

    if (req.session.loggedIn) {
        if (req.session.loggedIn == true) {

            // Check if Session exist
            if (req.session.shoppingCart) {

                let shoppingCart = req.session.shoppingCart;
                let objectIndex = shoppingCart.findIndex((object) => object.productID == req.body.productID); //Get Index of Product if It Exist in the Shoping Cart Already
                // If the item exist, then update quanity by -1
                if (objectIndex != -1) {

                    if (shoppingCart[objectIndex].quantity != 1) {
                        shoppingCart[objectIndex].quantity = shoppingCart[objectIndex].quantity - 1;
                    } else {
                        shoppingCart.splice(objectIndex, 1);
                    }
                }



                // Update the Session and Save
                req.session.shoppingCart = shoppingCart;
                req.session.save();
                res.redirect('/shoppingCart');



                //  console.log(req.session.shoppingCart)
            }


        } else {
            res.redirect('/login');
        }
    } else {
        res.redirect('/login');
    }


})


module.exports = router;