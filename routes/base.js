const express = require('express');
const router = express.Router();

// Rendering the Deafult Home Page
router.get('/', (req, res) => {
    if (req.session.loggedIn) {
        if (req.session.loggedIn == true) {


            res.redirect('/login');


        } else {
            res.redirect('/login');
        }
    } else {
        res.redirect('/login');
    }
})


module.exports = router;