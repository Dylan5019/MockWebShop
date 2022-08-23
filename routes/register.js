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
router.get('/', (req, res) => {
    res.render('register.ejs');
})


router.post('/', async (req, res) => {
    const parsedBody = (req.body);
    const user = await User.exists({ username: parsedBody.username }).catch();


    if (user == null) {
        console.log("User Made")
        generateUser.User(req.body.username, req.body.password);

        if (req.session.loggedIn) {

        } else {
            req.session.loggedIn = true;
        }

        res.redirect('/home');
    } else {
        res.redirect('/registerError');
    }







})

module.exports = router;