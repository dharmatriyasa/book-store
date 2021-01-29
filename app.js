const express = require('express');

const app = express();

app.use( '/home', (req, res, next) => {
    console.log('Hello there is Home Page!');
    res.send("<h1>Hello there is Home Page!</h1>")
});

app.use('/', (req, res, next) => {
    console.log('Hello there!');
    res.send("<h1>Hello from my express.js </h1>");
});

app.listen(3000);