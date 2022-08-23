const mongoose = require('mongoose');
const Product = require('./../models/product');

// Requiring Faker
const { faker } = require('@faker-js/faker');


module.exports = {
    data: function generateData() {


        // Connecting To Mongoose
        mongoose.connect('mongodb://localhost:27017/webshopApp', { usenewUrlParser: true, useUnifiedTopology: true })
            .then(() => {
                //console.log(`Connection Open`);
            })
            .catch((err) => {
                console.log(`OH NO ERROR`);
                console.log(err);
            });




        for (let i = 0; i < 20; i++) {
            const p = new Product({
                name: faker.commerce.productName(),
                price: faker.commerce.price(),
                description: faker.lorem.paragraph(),
                productID: String(i),
                productURL: faker.image.image(),
                quantity: Math.floor(Math.random() * 10) + 1
            })

            p.save().then(p => {

            }).catch(e => {

            })
        }


    }
}
