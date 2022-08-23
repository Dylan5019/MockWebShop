const express = require("express");
const router = express.Router();

const Order = require("./../models/orders");
const { db } = require("./../models/orders");

router.get("/", async (req, res) => {
  if (req.session.loggedIn) {
    if (req.session.loggedIn == true) {
      const orders = await Order.find({ user: req.session.currentUser });

      res.render("orders.ejs", { orders });
    } else {
      res.redirect("/login");
    }
  } else {
    res.redirect("/login");
  }
});






router.post("/", async (req, res) => {
  if (req.session.loggedIn) {
    if (req.session.loggedIn == true) {
      

    
    let orderID = req.body.orderID;
    let productID = req.body.productID;
    let userReview =  req.body.reviews;


  const order = await Order.findByIdAndUpdate(orderID);

  let newproducts = order.products;
  newproducts.find(obj => obj.productID == productID).review = userReview;
  const updatedOrder = await Order.findByIdAndUpdate(orderID, {products: newproducts}, { new: true } );
  
//console.log(updatedOrder);

 

      res.redirect("/orders");
    } else {
      res.redirect("/login");
    }
  } else {
    res.redirect("/login");
  }
});

module.exports = router;
