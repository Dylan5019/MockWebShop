const express = require('express');
const router = express.Router();
const mongoose = require(`mongoose`);
const generateUser = require('./../scripts/createUser');


const User = require('./../models/users');
const { db } = require('./../models/users');


mongoose.connect('mongodb://localhost:27017/webshopApp', { usenewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        //console.log(`Connection Open`);
    })
    .catch((err) => {
        console.log(`OH NO ERROR`);
        console.log(err);
    });



// Rendering the Deafult Home Page
router.get('/', async (req, res) => {
    res.render('login.ejs');

})


router.post('/', async (req, res) => {

    const user = await User.exists({ username: req.body.username }).catch();


    if (user == null) {
        res.redirect('/loginError');
    } else {

        if (req.session.loggedIn) {

        } else {
            req.session.loggedIn = true;
            req.session.currentUser = req.body.username;
        }

        res.redirect('/home');
    }



})

module.exports = router;