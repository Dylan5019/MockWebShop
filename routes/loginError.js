const express = require('express');
const router = express.Router();

// Rendering the Deafult Home Page
router.get('/', (req, res) => {
    res.render('userError.ejs');
})


module.exports = router;