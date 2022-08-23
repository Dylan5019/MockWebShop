const express = require('express');
const app = express();
const path = require('path');

//const generateData = require('./scripts/seeds');
const { faker } = require('@faker-js/faker');
const session = require('express-session');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//Requiring Routes
const baseRoute = require("./routes/base");
const homeRoute = require("./routes/home");
const genRoute = require("./routes/generator");
const productsRoute = require("./routes/products");
const shoppingCartRoute = require("./routes/shoppingCart");
const checkoutRoute = require("./routes/checkout");
const checkoutErrorRoute = require("./routes/checkoutError");
const loginRoute = require("./routes/login");
const registerRoute = require("./routes/register");
const loginErrorRoute = require("./routes/loginError");
const registerErrorRoute = require("./routes/registerError");
const logoutRoute = require("./routes/logout");
const ordersRoute = require("./routes/orders");
const emptyCartRoute = require("./routes/emptyCart");


//Used for Session Store
const MongoStore = require('connect-mongo')(session);

// Setting Up View Engine and Views Folder
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//CSS File
app.use(express.static(__dirname + '/public'));

//Connecting to mongoose
const connection = mongoose.createConnection('mongodb://localhost:27017/webshopApp', { useNewUrlParser: true, useUnifiedTopology: true });


// Set Up App Request Parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



//Session Store
const sessionStore = new MongoStore({
    mongooseConnection: connection,
    collection: 'sessions'
});

app.use(session({
    secret: 'some secret',
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
        maxAge: 1000 * 60 * 10 //Equals to 5 Minutes ((1000ms = 1 Second) * 60  = (60 Seconds/1 Min) * 10 = (10 Minutes))
    }
}));

// Route for base page
app.use('/', baseRoute);

// Route for Login Page
app.use('/login', loginRoute);

// Route for Logout
app.use('/logout', logoutRoute);

// Route for Register Page
app.use('/register', registerRoute);

// Route for Home Page
app.use('/home', homeRoute);

// Route for Generator Page
app.use('/generator', genRoute);


// Route for Products Page
app.use('/products', productsRoute);


// Route for Shopping Cart Page
app.use('/shoppingCart', shoppingCartRoute);

// Route for Shopping Cart Page
app.use('/emptyCart', emptyCartRoute);

// Route for Checkout  Process
app.use('/checkout', checkoutRoute);

// Route for Checkout Error Page
app.use('/checkoutError', checkoutErrorRoute);


// Route for Login Error  Page
app.use('/loginError', loginErrorRoute);

// Route for Register Error  Page
app.use('/registerError', registerErrorRoute);

// Route for Orders  Page
app.use('/orders', ordersRoute);


// Confirming App is Running
app.listen(8080, () => {
    console.log("APP IS LISTENING ON PORT 3000");
})


