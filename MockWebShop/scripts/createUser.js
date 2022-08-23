const mongoose = require('mongoose');
const User = require('./../models/users');



module.exports = {
    User: function createUser(username, password) {


        // Connecting To Mongoose
        mongoose.connect('mongodb://localhost:27017/webshopApp', { usenewUrlParser: true, useUnifiedTopology: true })
            .then(() => {
                //console.log(`Connection Open`);
            })
            .catch((err) => {
                console.log(`OH NO ERROR`);
                console.log(err);
            });





        const p = new User({
            username: username,
            password: password
        })

        p.save().then(p => {

        }).catch(e => {

        })



    }
}
