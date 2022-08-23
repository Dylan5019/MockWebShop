const express = require('express');
const router = express.Router();
const generateData = require('./../scripts/seeds');
let mongoose = require('mongoose');
const { redirect } = require('express/lib/response');

const connection = mongoose.createConnection('mongodb://localhost:27017/webshopApp', { useNewUrlParser: true, useUnifiedTopology: true });

router.get('/', (req, res) => {

    if (req.session.loggedIn) {
        if (req.session.loggedIn == true) {

            connection.dropCollection('products');
            generateData.data();
            res.render('generator.ejs');

        } else {
            res.redirect('/login');
        }
    } else {
        res.redirect('/login');
    }
})

module.exports = router;

