const express = require('express');
const router = express.Router();

// Rendering the Deafult Home Page
router.get('/', (req, res) => {

    req.session.loggedIn = false;
    req.session.save();

    res.redirect('/login');



})


module.exports = router;